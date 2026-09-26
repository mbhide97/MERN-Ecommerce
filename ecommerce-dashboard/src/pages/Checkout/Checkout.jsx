 import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaCreditCard,
  FaMoneyBillWave,
} from "react-icons/fa";

import API from "../../services/api";

import "./Checkout.css";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    cart = [],
    subtotal = 0,
    delivery = 0,
    gst = 0,
    total = 0,
  } = location.state || {};

  const [paymentMethod, setPaymentMethod] =
    useState("cod");

  const [customerName, setCustomerName] =
    useState("");

  const [customerEmail, setCustomerEmail] =
    useState("");

  const [customerPhone, setCustomerPhone] =
    useState("");

  const [shippingAddress, setShippingAddress] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // ==========================================
  // RAZORPAY PAYMENT
  // ==========================================

  const openRazorpay = async () => {
    try {
      setLoading(true);

      // ======================================
      // STEP 1: CREATE RAZORPAY ORDER
      // ======================================

      const response = await API.post(
        "/orders/razorpay",
        {
          amount: Number(total),
        }
      );

      console.log(
        "Razorpay Order:",
        response.data
      );

      const razorpayOrder =
        response.data.order;

      if (!razorpayOrder) {
        alert(
          "Razorpay order could not be created."
        );

        setLoading(false);
        return;
      }

      // ======================================
      // RAZORPAY OPTIONS
      // ======================================

      const options = {
        key: "rzp_test_TfpWyNPgmXowEf",

        amount:
          razorpayOrder.amount,

        currency:
          razorpayOrder.currency,

        name: "ShopSphere",

        description:
          "ShopSphere Order Payment",

        order_id:
          razorpayOrder.id,

        prefill: {
          name: customerName,
          email: customerEmail,
          contact: customerPhone,
        },

        theme: {
          color: "#111827",
        },

        // ====================================
        // PAYMENT SUCCESS
        // ====================================

        handler: async function (
          paymentResponse
        ) {
          try {
            console.log(
              "Payment Response:",
              paymentResponse
            );

            // ==================================
            // STEP 2: VERIFY PAYMENT
            // ==================================

            const verifyResponse =
              await API.post(
                "/orders/verify",
                {
                  razorpay_order_id:
                    paymentResponse.razorpay_order_id,

                  razorpay_payment_id:
                    paymentResponse.razorpay_payment_id,

                  razorpay_signature:
                    paymentResponse.razorpay_signature,
                }
              );

            console.log(
              "Payment Verification:",
              verifyResponse.data
            );

            if (
              !verifyResponse.data.success
            ) {
              alert(
                "Payment verification failed."
              );

              setLoading(false);
              return;
            }

            // ==================================
            // STEP 3: CREATE ORDER
            // ==================================

            const orderResponse =
              await API.post(
                "/orders",
                {
                  customerName,

                  customerEmail,

                  customerPhone,

                  shippingAddress,

                  paymentMethod:
                    "Razorpay",

                  subtotal:
                    Number(subtotal),

                  deliveryCharge:
                    Number(delivery),

                  gst:
                    Number(gst),

                  discount: 0,

                  totalAmount:
                    Number(total),

                  razorpayOrderId:
                    paymentResponse.razorpay_order_id,

                  razorpayPaymentId:
                    paymentResponse.razorpay_payment_id,

                  paymentStatus:
                    "Paid",
                }
              );

            console.log(
              "Order Created:",
              orderResponse.data
            );

            // ==================================
            // STEP 4: ORDER SUCCESS
            // ==================================

            if (
              orderResponse.data.success
            ) {
              alert(
                "Payment Successful & Order Placed 🎉"
              );

              navigate("/success", {
                state: {
                  order:
                    orderResponse.data.order,

                  paymentId:
                    paymentResponse.razorpay_payment_id,
                },
              });
            }
          } catch (error) {
            console.error(
              "Payment Verification / Order Error:",
              error
            );

            alert(
              error.response?.data?.message ||
                "Payment verification failed."
            );
          } finally {
            setLoading(false);
          }
        },

        // ====================================
        // RAZORPAY WINDOW CLOSED
        // ====================================

        modal: {
          ondismiss: function () {
            console.log(
              "Razorpay payment window closed"
            );

            setLoading(false);
          },
        },
      };

      // ======================================
      // CHECK RAZORPAY SDK
      // ======================================

      if (!window.Razorpay) {
        alert(
          "Razorpay SDK not loaded. Please refresh the page."
        );

        setLoading(false);
        return;
      }

      // ======================================
      // OPEN RAZORPAY
      // ======================================

      const razorpay =
        new window.Razorpay(options);

      // ======================================
      // PAYMENT FAILED
      // ======================================

      razorpay.on(
        "payment.failed",
        function (response) {
          console.error(
            "Payment Failed:",
            response
          );

          alert(
            response.error?.description ||
              "Payment Failed"
          );

          setLoading(false);
        }
      );

      razorpay.open();
    } catch (error) {
      console.error(
        "Razorpay Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Unable to start Razorpay payment."
      );

      setLoading(false);
    }
  };

  // ==========================================
  // PLACE ORDER
  // ==========================================

  const placeOrder = async () => {
    // ========================================
    // VALIDATION
    // ========================================

    if (!customerName.trim()) {
      alert("Please enter your name");
      return;
    }

    if (!customerEmail.trim()) {
      alert("Please enter your email");
      return;
    }

    if (!customerPhone.trim()) {
      alert(
        "Please enter your phone number"
      );
      return;
    }

    if (!shippingAddress.trim()) {
      alert(
        "Please enter your shipping address"
      );
      return;
    }

    // ========================================
    // ONLINE PAYMENT
    // ========================================

    if (paymentMethod === "online") {
      await openRazorpay();
      return;
    }

    // ========================================
    // COD ORDER
    // ========================================

    try {
      setLoading(true);

      const response = await API.post(
        "/orders",
        {
          customerName,

          customerEmail,

          customerPhone,

          shippingAddress,

          paymentMethod: "COD",

          subtotal:
            Number(subtotal),

          deliveryCharge:
            Number(delivery),

          gst:
            Number(gst),

          discount: 0,

          totalAmount:
            Number(total),

          paymentStatus:
            "Pending",
        }
      );

      console.log(
        "COD Order Response:",
        response.data
      );

      if (response.data.success) {
        alert(
          "Order Placed Successfully 🎉"
        );

        navigate("/success", {
          state: {
            order:
              response.data.order,
          },
        });
      }
    } catch (error) {
      console.error(
        "COD Order Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to place order"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="checkout-page">

      <h1 className="checkout-title">
        Checkout
      </h1>

      <div className="checkout-container">

        {/* ==================================
            LEFT SIDE
        ================================== */}

        <div className="checkout-left">

          {/* CUSTOMER DETAILS */}

          <div className="checkout-card">

            <h2>
              Customer Details
            </h2>

            <div className="form-group">

              <label>
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your full name"
                value={customerName}
                onChange={(e) =>
                  setCustomerName(
                    e.target.value
                  )
                }
              />

            </div>

            <div className="form-group">

              <label>
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={customerEmail}
                onChange={(e) =>
                  setCustomerEmail(
                    e.target.value
                  )
                }
              />

            </div>

            <div className="form-group">

              <label>
                Phone Number
              </label>

              <input
                type="tel"
                placeholder="Enter your phone number"
                value={customerPhone}
                onChange={(e) =>
                  setCustomerPhone(
                    e.target.value
                  )
                }
              />

            </div>

            <div className="form-group">

              <label>
                Shipping Address
              </label>

              <textarea
                rows="4"
                placeholder="Enter your complete address"
                value={shippingAddress}
                onChange={(e) =>
                  setShippingAddress(
                    e.target.value
                  )
                }
              />

            </div>

          </div>

          {/* ==================================
              PAYMENT METHOD
          ================================== */}

          <div className="checkout-card">

            <h2>
              Payment Method
            </h2>

            {/* COD */}

            <div
              className={`payment-option ${
                paymentMethod === "cod"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setPaymentMethod("cod")
              }
            >

              <div className="payment-icon">
                <FaMoneyBillWave />
              </div>

              <div>

                <h3>
                  Cash On Delivery
                </h3>

                <p>
                  Pay when your order arrives
                </p>

              </div>

              <input
                type="radio"
                checked={
                  paymentMethod === "cod"
                }
                onChange={() =>
                  setPaymentMethod("cod")
                }
              />

            </div>

            {/* RAZORPAY */}

            <div
              className={`payment-option ${
                paymentMethod === "online"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setPaymentMethod("online")
              }
            >

              <div className="payment-icon">
                <FaCreditCard />
              </div>

              <div>

                <h3>
                  Online Payment
                </h3>

                <p>
                  Pay securely using Razorpay
                </p>

              </div>

              <input
                type="radio"
                checked={
                  paymentMethod === "online"
                }
                onChange={() =>
                  setPaymentMethod("online")
                }
              />

            </div>

          </div>

        </div>

        {/* ==================================
            RIGHT SIDE
        ================================== */}

        <div className="checkout-right">

          <div className="checkout-summary">

            <h2>
              Order Summary
            </h2>

            <div className="summary-row">

              <span>
                Items
              </span>

              <span>
                {cart.reduce(
                  (
                    totalItems,
                    item
                  ) =>
                    totalItems +
                    Number(
                      item.quantity || 0
                    ),
                  0
                )}
              </span>

            </div>

            <div className="summary-row">

              <span>
                Subtotal
              </span>

              <span>
                ₹{subtotal}
              </span>

            </div>

            <div className="summary-row">

              <span>
                Delivery
              </span>

              <span>
                {delivery === 0
                  ? "FREE"
                  : `₹${delivery}`}
              </span>

            </div>

            <div className="summary-row">

              <span>
                GST
              </span>

              <span>
                ₹{gst}
              </span>

            </div>

            <hr />

            <div className="summary-total">

              <span>
                Total
              </span>

              <h3>
                ₹{total}
              </h3>

            </div>

            {/* PLACE ORDER */}

            <button
              className="place-order-btn"
              onClick={placeOrder}
              disabled={loading}
            >
              {loading
                ? "Processing..."
                : paymentMethod === "online"
                ? "Pay With Razorpay"
                : "Place Order"}
            </button>

            {/* BACK TO CART */}

            <button
              className="back-cart-btn"
              onClick={() =>
                navigate("/cart")
              }
              disabled={loading}
            >
              Back To Cart
            </button>

            <div className="secure-checkout">
              🔒 Secure & Safe Checkout
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Checkout;