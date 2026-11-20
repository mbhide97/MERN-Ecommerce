import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import api from "../api/axios";
import "./Checkout.css";

function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const safeCart = Array.isArray(cart) ? cart : [];

  // Customer Details
  const [customer, setCustomer] = useState(() => {
    const loadCustomer = localStorage.getItem("customer");

    try {
      return loadCustomer
        ? JSON.parse(loadCustomer)
        : {
            name: "",
            email: "",
            number: "",
            address: "",
          };
    } catch {
      return {
        name: "",
        email: "",
        number: "",
        address: "",
      };
    }
  });

   useEffect(() => {
    localStorage.setItem("customer", JSON.stringify(customer));
  }, [customer]);

  const [payment, setPayment] = useState("COD");
  const [loading, setLoading] = useState(false);

   const subtotal = safeCart.reduce((total, item) => {
    return total + Number(item.price) * Number(item.quantity);
  }, 0);

  const delivery = subtotal < 500 ? 60 : 0;
  const total = subtotal + delivery;

   if (safeCart.length === 0) {
    return (
      <div className="checkout-empty">
        <h2>Your Cart is Empty</h2>

        <button
          className="continue-shopping-btn"
          onClick={() => navigate("/products")}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

   const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");

      script.src =
        "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => resolve(!!window.Razorpay);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

   const resetCustomer = () => {
    const emptyCustomer = {
      name: "",
      email: "",
      number: "",
      address: "",
    };

    setCustomer(emptyCustomer);

    localStorage.setItem(
      "customer",
      JSON.stringify(emptyCustomer)
    );
  };

   const handleOrder = async () => {
    if (
      !customer.name?.trim() ||
      !customer.email?.trim() ||
      !customer.number?.trim() ||
      !customer.address?.trim()
    ) {
      alert("Please fill all customer details");
      return;
    }

    if (customer.number.trim().length !== 10) {
      alert("Please enter a valid 10 digit number");
      return;
    }

    if (safeCart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    try {
      setLoading(true);

      
      const orderData = {
        items: safeCart.map((item) => ({
          product: item.product || item._id || item.id,
          name: item.name,
          image: item.image,
          price: Number(item.price),
          quantity: Number(item.quantity),
        })),

        customer: {
          name: customer.name,
          email: customer.email,
          number: customer.number,
          address: customer.address,
        },

        payment,
        subtotal,
        delivery,
        total,
      };

      console.log("Order Data:", orderData);

       if (payment === "COD") {
        const response = await api.post(
          "/orders",
          orderData
        );

        const saveOrder = response.data.order;

        if (!saveOrder?._id) {
          throw new Error("Order creation failed");
        }

        clearCart();
        localStorage.removeItem("cart");
        resetCustomer();

        navigate("/success", {
          state: { order: saveOrder },
        });

        return;
      }

      
      const loaded = await loadRazorpay();

      if (!loaded) {
        throw new Error("Razorpay script failed to load");
      }

       const savedResponse = await api.post(
        "/orders",
        orderData
      );

      const saveOrder = savedResponse.data.order;

      if (!saveOrder?._id) {
        throw new Error("MongoDB order creation failed");
      }

       const razorResponse = await api.post(
        "/orders/razorpay",
        {
           total: Number(total),
        }
      );

      const razorOrder = razorResponse.data.order;

      if (!razorOrder?.id) {
        throw new Error("Razorpay order creation failed");
      }

       const options = {
        key: razorResponse.data.key,

        amount: razorOrder.amount,
        currency: razorOrder.currency,

        name: "ShopSphere",
        description: "Online Shopping Payment",

        order_id: razorOrder.id,

        prefill: {
          name: customer.name,
          email: customer.email,
          contact: customer.number,
        },

        theme: {
          color: "#9af0f3",
        },

         handler: async (paymentResponse) => {
          try {
            const verifyResponse = await api.post(
              "/orders/verify",
              paymentResponse
            );

            if (!verifyResponse.data.success) {
              throw new Error(
                "Payment verification failed"
              );
            }

             const saveResponse = await api.post(
      "/orders/save-verify",
      {
        ...orderData,
        razorpay_order_id: paymentResponse.razorpay_order_id,
        razorpay_payment_id: paymentResponse.razorpay_payment_id,
      }
    );

    if (!saveResponse.data.success) {
      throw new Error("Order saving failed");
    }

            const verifiedOrder =
              verifyResponse.data.order  ;

            clearCart();
            localStorage.removeItem("cart");

            resetCustomer();

            navigate("/success", {
              state: {
                order: verifiedOrder,
              },
            });
          } catch (error) {
            console.log(
              "Verification Error:",
              error
            );

            alert(
              error.response?.data?.msg ||
              error.message ||
              "Payment confirmation failed"
            );
          } finally {
            setLoading(false);
          }
        },
      };

       const rzp1 = new window.Razorpay(options);

      rzp1.on("payment.failed", function (response) {
        console.log("Payment Failed:", response.error);

        alert(
          response.error.description ||
          "Payment Failed"
        );

        setLoading(false);
      });

      rzp1.open();
    } catch (error) {
      console.log("Order Error:", error);

      alert(
        error.response?.data?.msg ||
        error.message ||
        "Something went wrong"
      );

      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <div className="checkout-container">
      <h1 className="checkout-title">
        Checkout
      </h1>

      <div className="checkout-layout">

       

        <div className="customer-card">
          <h2>Customer Details</h2>

          <div className="checkout-group">
            <label>Name</label>

            <input
              type="text"
              placeholder="Enter your name"
              value={customer.name}
              onChange={(e) =>
                setCustomer({
                  ...customer,
                  name: e.target.value,
                })
              }
              required
            />
          </div>

          <div className="checkout-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={customer.email}
              onChange={(e) =>
                setCustomer({
                  ...customer,
                  email: e.target.value,
                })
              }
              required
            />
          </div>

          <div className="checkout-group">
            <label>Number</label>

            <input
              type="tel"
              maxLength={10}
              placeholder="Enter your number"
              value={customer.number}
              onChange={(e) =>
                setCustomer({
                  ...customer,
                  number: e.target.value,
                })
              }
              required
            />
          </div>

          <div className="checkout-group">
            <label>Address</label>

            <textarea
              placeholder="Enter your address"
              value={customer.address}
              onChange={(e) =>
                setCustomer({
                  ...customer,
                  address: e.target.value,
                })
              }
              required
            />
          </div>

 
          <h2>Payment Method</h2>

          <label>
            <input
              type="radio"
              value="COD"
              checked={payment === "COD"}
              onChange={(e) =>
                setPayment(e.target.value)
              }
            />

            Cash on Delivery
          </label>

          <br />
          <br />

          <label>
            <input
              type="radio"
              value="ONLINE"
              checked={payment === "ONLINE"}
              onChange={(e) =>
                setPayment(e.target.value)
              }
            />

            Online Payment
          </label>
        </div>

 
        <div className="order-summary">
          <h2>Order Summary</h2>

          {safeCart.map((item) => (
            <div
              key={item._id || item.id}
              className="checkout-item"
            >
              <img
                src={item.image}
                alt={item.name}
              />

              <div className="checkout-item-info">
                <h3>{item.name}</h3>

                <p>
                  ₹{item.price} × {item.quantity}
                </p>

                <p className="item-total">
                  Item Total: ₹
                  {Number(item.price) *
                    Number(item.quantity)}
                </p>
              </div>
            </div>
          ))}

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="summary-row">
            <span>Product Delivery</span>

            <span>
              {delivery === 0
                ? "FREE"
                : `₹${delivery}`}
            </span>
          </div>

          <div className="summary-row">
            <span>Payment Method</span>

            <span>
              {payment === "COD"
                ? "COD"
                : "Online"}
            </span>
          </div>

          <div className="summary-total">
            <strong>Total</strong>
            <strong>₹{total}</strong>
          </div>

 
          <button
            className="place-order-btn"
            onClick={handleOrder}
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
