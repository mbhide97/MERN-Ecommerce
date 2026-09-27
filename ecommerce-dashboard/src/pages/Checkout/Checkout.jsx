 



// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// import API from "../../services/api";

// import "./Checkout.css";

// function Checkout() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const {
//     cart = [],
//     subtotal = 0,
//     delivery = 0,
//     gst = 0,
//     total = 0,
//   } = location.state || {};

//   const [customer, setCustomer] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//   });

//   const [paymentMethod, setPaymentMethod] = useState("razorpay");
//   const [loading, setLoading] = useState(false);

//   const orderProducts = cart
//     .filter(
//       (item) =>
//         item &&
//         item.product &&
//         (item.product._id || item.product.id)
//     )
//     .map((item) => ({
//       product: item.product._id || item.product.id,
//       quantity: Number(item.quantity) || 1,
//     }));

//   const totalItems = cart.reduce(
//     (sum, item) => sum + (Number(item.quantity) || 1),
//     0
//   );

//   const handleChange = (e) => {
//     setCustomer({
//       ...customer,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const validateForm = () => {
//     if (!customer.name.trim()) {
//       alert("Please enter your name");
//       return false;
//     }

//     if (!customer.email.trim()) {
//       alert("Please enter your email");
//       return false;
//     }

//     if (!customer.phone.trim()) {
//       alert("Please enter your phone number");
//       return false;
//     }

//     if (!customer.address.trim()) {
//       alert("Please enter your shipping address");
//       return false;
//     }

//     if (orderProducts.length === 0) {
//       alert("Your cart is empty");
//       return false;
//     }

//     return true;
//   };

//   // ==========================================
//   // CREATE ORDER AFTER PAYMENT
//   // ==========================================

//   const createFinalOrder = async (paymentData = {}) => {
//     const orderData = {
//       products: orderProducts,

//       customer,

//       // IMPORTANT:
//       // Backend Order model requires shippingAddress
//       shippingAddress: customer.address,

//       subtotal: Number(subtotal),
//       delivery: Number(delivery),
//       gst: Number(gst),
//       total: Number(total),

//       paymentMethod:
//         paymentData.paymentMethod || paymentMethod,

//       paymentStatus:
//         paymentData.paymentStatus || "Pending",

//       razorpayOrderId:
//         paymentData.razorpayOrderId || "",

//       razorpayPaymentId:
//         paymentData.razorpayPaymentId || "",

//       razorpaySignature:
//         paymentData.razorpaySignature || "",
//     };

//     console.log("📦 FINAL ORDER DATA:", orderData);

//     const response = await API.post(
//       "/orders",
//       orderData
//     );

//     console.log(
//       "✅ ORDER CREATED:",
//       response.data
//     );

//     return response.data;
//   };

//   // ==========================================
//   // RAZORPAY
//   // ==========================================

//   const openRazorpay = async () => {
//     try {
//       setLoading(true);

//       console.log("💳 Creating Razorpay order...");

//       const razorpayResponse = await API.post(
//         "/orders/razorpay",
//         {
//           amount: Number(total),
//         }
//       );

//       console.log(
//         "✅ Razorpay Order:",
//         razorpayResponse.data
//       );

//       const razorpayOrder =
//         razorpayResponse.data?.order ||
//         razorpayResponse.data;

//       const options = {
//         key: "rzp_test_TfpWyNPgmXowEf",

//         amount: razorpayOrder.amount,

//         currency: "INR",

//         name: "ShopSphere",

//         description: "ShopSphere Order",

//         order_id: razorpayOrder.id,

//         handler: async function (response) {
//           try {
//             console.log(
//               "💰 Razorpay Payment Response:",
//               response
//             );

//             // ==========================================
//             // VERIFY PAYMENT
//             // ==========================================

//             const verifyResponse =
//               await API.post(
//                 "/orders/verify",
//                 {
//                   razorpay_order_id:
//                     response.razorpay_order_id,

//                   razorpay_payment_id:
//                     response.razorpay_payment_id,

//                   razorpay_signature:
//                     response.razorpay_signature,
//                 }
//               );

//             console.log(
//               "✅ PAYMENT VERIFIED:",
//               verifyResponse.data
//             );

//             // ==========================================
//             // CREATE FINAL ORDER
//             // ==========================================

//             const orderResponse =
//               await createFinalOrder({
//                 paymentMethod: "razorpay",

//                 paymentStatus: "Paid",

//                 razorpayOrderId:
//                   response.razorpay_order_id,

//                 razorpayPaymentId:
//                   response.razorpay_payment_id,

//                 razorpaySignature:
//                   response.razorpay_signature,
//               });

//             if (orderResponse?.success !== false) {
//               alert(
//                 "Order placed successfully! 🎉"
//               );

//               navigate("/success", {
//                 state: {
//                   order: orderResponse,
//                 },
//               });
//             }
//           } catch (error) {
//             console.error(
//               "❌ Payment Verification / Order Error:",
//               error.response?.data ||
//                 error.message
//             );

//             alert(
//               error.response?.data?.message ||
//                 error.message ||
//                 "Order creation failed"
//             );
//           } finally {
//             setLoading(false);
//           }
//         },

//         prefill: {
//           name: customer.name,

//           email: customer.email,

//           contact: customer.phone,
//         },

//         theme: {
//           color: "#111827",
//         },

//         modal: {
//           ondismiss: function () {
//             console.log(
//               "❌ Razorpay payment cancelled"
//             );

//             setLoading(false);
//           },
//         },
//       };

//       if (!window.Razorpay) {
//         alert(
//           "Razorpay SDK not loaded. Please refresh the page."
//         );

//         setLoading(false);

//         return;
//       }

//       const razorpay =
//         new window.Razorpay(options);

//       razorpay.open();
//     } catch (error) {
//       console.error(
//         "❌ Razorpay Error:",
//         error.response?.data ||
//           error.message
//       );

//       alert(
//         error.response?.data?.message ||
//           error.message ||
//           "Unable to start payment"
//       );

//       setLoading(false);
//     }
//   };

//   // ==========================================
//   // PLACE ORDER
//   // ==========================================

//   const handlePlaceOrder = async () => {
//     if (!validateForm()) {
//       return;
//     }

//     if (paymentMethod === "razorpay") {
//       await openRazorpay();

//       return;
//     }

//     // ==========================================
//     // COD ORDER
//     // ==========================================

//     try {
//       setLoading(true);

//       const orderResponse =
//         await createFinalOrder({
//           paymentMethod: "cod",

//           paymentStatus: "Pending",
//         });

//       console.log(
//         "✅ COD ORDER:",
//         orderResponse
//       );

//       if (orderResponse?.success !== false) {
//         alert(
//           "Order placed successfully! 🎉"
//         );

//         navigate("/success", {
//           state: {
//             order: orderResponse,
//           },
//         });
//       }
//     } catch (error) {
//       console.error(
//         "❌ COD ORDER ERROR:",
//         error.response?.data ||
//           error.message
//       );

//       alert(
//         error.response?.data?.message ||
//           error.message ||
//           "Order creation failed"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ==========================================
//   // UI
//   // ==========================================

//   return (
//     <div className="checkout-page">

//       <div className="checkout-left">

//         <div className="checkout-section">

//           <h2>Delivery Information</h2>

//           <div className="checkout-form">

//             <div className="checkout-row">

//               <div className="checkout-field">
//                 <label>
//                   Full Name
//                 </label>

//                 <input
//                   type="text"
//                   name="name"
//                   value={customer.name}
//                   onChange={handleChange}
//                   placeholder="Enter your name"
//                 />
//               </div>

//               <div className="checkout-field">
//                 <label>
//                   Email
//                 </label>

//                 <input
//                   type="email"
//                   name="email"
//                   value={customer.email}
//                   onChange={handleChange}
//                   placeholder="Enter your email"
//                 />
//               </div>

//             </div>

//             <div className="checkout-row">

//               <div className="checkout-field">
//                 <label>
//                   Phone Number
//                 </label>

//                 <input
//                   type="tel"
//                   name="phone"
//                   value={customer.phone}
//                   onChange={handleChange}
//                   placeholder="Enter phone number"
//                 />
//               </div>

//             </div>

//             <div className="checkout-field">

//               <label>
//                 Shipping Address
//               </label>

//               <textarea
//                 name="address"
//                 value={customer.address}
//                 onChange={handleChange}
//                 placeholder="Enter your complete shipping address"
//                 rows="4"
//               />

//             </div>

//           </div>

//         </div>

//         <div className="checkout-section">

//           <h2>Payment Method</h2>

//           <div className="payment-methods">

//             <label
//               className={`payment-option ${
//                 paymentMethod === "razorpay"
//                   ? "active"
//                   : ""
//               }`}
//             >

//               <input
//                 type="radio"
//                 name="payment"
//                 value="razorpay"
//                 checked={
//                   paymentMethod === "razorpay"
//                 }
//                 onChange={(e) =>
//                   setPaymentMethod(
//                     e.target.value
//                   )
//                 }
//               />

//               <div>
//                 <strong>
//                   Razorpay
//                 </strong>

//                 <p>
//                   Pay securely using UPI,
//                   Card or Net Banking
//                 </p>
//               </div>

//             </label>

//             <label
//               className={`payment-option ${
//                 paymentMethod === "cod"
//                   ? "active"
//                   : ""
//               }`}
//             >

//               <input
//                 type="radio"
//                 name="payment"
//                 value="cod"
//                 checked={
//                   paymentMethod === "cod"
//                 }
//                 onChange={(e) =>
//                   setPaymentMethod(
//                     e.target.value
//                   )
//                 }
//               />

//               <div>
//                 <strong>
//                   Cash on Delivery
//                 </strong>

//                 <p>
//                   Pay when your order arrives
//                 </p>
//               </div>

//             </label>

//           </div>

//         </div>

//       </div>

//       <div className="checkout-right">

//         <div className="checkout-summary">

//           <h2>
//             Order Summary
//           </h2>

//           <div className="checkout-products">

//             {cart.map((item, index) => {

//               const product =
//                 item?.product;

//               if (!product) {
//                 return null;
//               }

//               const quantity =
//                 Number(item.quantity) || 1;

//               const price =
//                 Number(product.price) || 0;

//               return (
//                 <div
//                   className="checkout-product-item"
//                   key={
//                     item._id || index
//                   }
//                 >

//                   <img
//                     src={product.image}
//                     alt={product.name}
//                   />

//                   <div className="checkout-product-info">

//                     <h3>
//                       {product.name}
//                     </h3>

//                     <p>
//                       Qty: {quantity}
//                     </p>

//                     <strong>
//                       ₹
//                       {price *
//                         quantity}
//                     </strong>

//                   </div>

//                 </div>
//               );

//             })}

//           </div>

//           <div className="summary-row">
//             <span>
//               Items
//             </span>

//             <span>
//               {totalItems}
//             </span>
//           </div>

//           <div className="summary-row">
//             <span>
//               Subtotal
//             </span>

//             <span>
//               ₹{subtotal}
//             </span>
//           </div>

//           <div className="summary-row">
//             <span>
//               Delivery
//             </span>

//             <span className="free-text">
//               FREE
//             </span>
//           </div>

//           <div className="summary-row">
//             <span>
//               GST (18%)
//             </span>

//             <span>
//               ₹{gst}
//             </span>
//           </div>

//           <hr />

//           <div className="summary-total">

//             <span>
//               Total
//             </span>

//             <strong>
//               ₹{total}
//             </strong>

//           </div>

//           <button
//             className="place-order-btn"
//             onClick={handlePlaceOrder}
//             disabled={loading}
//           >
//             {loading
//               ? "Processing..."
//               : paymentMethod ===
//                 "razorpay"
//               ? "Pay & Place Order"
//               : "Place Order"}
//           </button>

//         </div>

//       </div>

//     </div>
//   );
// }

// export default Checkout;


import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [paymentMethod, setPaymentMethod] =
    useState("razorpay");

  const [loading, setLoading] = useState(false);

  // ==========================================
  // ORDER PRODUCTS
  // ==========================================

  const orderProducts = cart
    .filter(
      (item) =>
        item &&
        item.product &&
        (item.product._id || item.product.id)
    )
    .map((item) => ({
      product:
        item.product._id || item.product.id,

      quantity:
        Number(item.quantity) || 1,
    }));

  const totalItems = cart.reduce(
    (sum, item) =>
      sum + (Number(item.quantity) || 1),
    0
  );

  // ==========================================
  // INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================================
  // VALIDATION
  // ==========================================

  const validateForm = () => {
    if (!customer.name.trim()) {
      alert("Please enter your name");
      return false;
    }

    if (!customer.email.trim()) {
      alert("Please enter your email");
      return false;
    }

    if (!customer.phone.trim()) {
      alert("Please enter your phone number");
      return false;
    }

    if (!customer.address.trim()) {
      alert("Please enter your shipping address");
      return false;
    }

    if (orderProducts.length === 0) {
      alert("Your cart is empty");
      return false;
    }

    return true;
  };

  // ==========================================
  // CREATE FINAL ORDER
  // ==========================================

  const createFinalOrder = async (
    paymentData = {}
  ) => {
    const orderData = {
      products: orderProducts,

      customer,

      // Required by Order model
      shippingAddress: customer.address,

      subtotal: Number(subtotal),

      delivery: Number(delivery),

      gst: Number(gst),

      total: Number(total),

      paymentMethod:
        paymentData.paymentMethod ||
        paymentMethod,

      paymentStatus:
        paymentData.paymentStatus ||
        "Pending",

      razorpayOrderId:
        paymentData.razorpayOrderId || "",

      razorpayPaymentId:
        paymentData.razorpayPaymentId || "",

      razorpaySignature:
        paymentData.razorpaySignature || "",
    };

    console.log(
      "📦 FINAL ORDER DATA:",
      orderData
    );

    const response = await API.post(
      "/orders",
      orderData
    );

    console.log(
      "✅ ORDER CREATED:",
      response.data
    );

    return response.data;
  };

  // ==========================================
  // RAZORPAY
  // ==========================================

  const openRazorpay = async () => {
    try {
      setLoading(true);

      console.log(
        "💳 Creating Razorpay order..."
      );

      const razorpayResponse =
        await API.post(
          "/orders/razorpay",
          {
            amount: Number(total),
          }
        );

      console.log(
        "✅ Razorpay Order:",
        razorpayResponse.data
      );

      const razorpayOrder =
        razorpayResponse.data?.order ||
        razorpayResponse.data;

      const options = {
        key: "rzp_test_TfpWyNPgmXowEf",

        amount: razorpayOrder.amount,

        currency: "INR",

        name: "ShopSphere",

        description: "ShopSphere Order",

        order_id: razorpayOrder.id,

        handler: async function (response) {
          try {
            console.log(
              "💰 Razorpay Payment Response:",
              response
            );

            // ==========================================
            // VERIFY PAYMENT
            // ==========================================

            const verifyResponse =
              await API.post(
                "/orders/verify",
                {
                  razorpay_order_id:
                    response.razorpay_order_id,

                  razorpay_payment_id:
                    response.razorpay_payment_id,

                  razorpay_signature:
                    response.razorpay_signature,
                }
              );

            console.log(
              "✅ PAYMENT VERIFIED:",
              verifyResponse.data
            );

            // ==========================================
            // CREATE FINAL ORDER
            // ==========================================

            const orderResponse =
              await createFinalOrder({
                paymentMethod: "razorpay",

                paymentStatus: "Paid",

                razorpayOrderId:
                  response.razorpay_order_id,

                razorpayPaymentId:
                  response.razorpay_payment_id,

                razorpaySignature:
                  response.razorpay_signature,
              });

            if (
              orderResponse?.success !==
              false
            ) {
              alert(
                "Order placed successfully! 🎉"
              );

              navigate("/success", {
                state: {
                  order: orderResponse,
                },
              });
            }
          } catch (error) {
            console.error(
              "❌ Payment Verification / Order Error:",
              error.response?.data ||
                error.message
            );

            alert(
              error.response?.data?.message ||
                error.message ||
                "Order creation failed"
            );
          } finally {
            setLoading(false);
          }
        },

        prefill: {
          name: customer.name,

          email: customer.email,

          contact: customer.phone,
        },

        theme: {
          color: "#111827",
        },

        modal: {
          ondismiss: function () {
            console.log(
              "❌ Razorpay payment cancelled"
            );

            setLoading(false);
          },
        },
      };

      if (!window.Razorpay) {
        alert(
          "Razorpay SDK not loaded. Please refresh the page."
        );

        setLoading(false);

        return;
      }

      const razorpay =
        new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.error(
        "❌ Razorpay Error:",
        error.response?.data ||
          error.message
      );

      alert(
        error.response?.data?.message ||
          error.message ||
          "Unable to start payment"
      );

      setLoading(false);
    }
  };

  // ==========================================
  // PLACE ORDER
  // ==========================================

  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      return;
    }

    if (paymentMethod === "razorpay") {
      await openRazorpay();

      return;
    }

    // ==========================================
    // COD
    // ==========================================

    try {
      setLoading(true);

      const orderResponse =
        await createFinalOrder({
          paymentMethod: "cod",

          paymentStatus: "Pending",
        });

      console.log(
        "✅ COD ORDER:",
        orderResponse
      );

      if (
        orderResponse?.success !==
        false
      ) {
        alert(
          "Order placed successfully! 🎉"
        );

        navigate("/success", {
          state: {
            order: orderResponse,
          },
        });
      }
    } catch (error) {
      console.error(
        "❌ COD ORDER ERROR:",
        error.response?.data ||
          error.message
      );

      alert(
        error.response?.data?.message ||
          error.message ||
          "Order creation failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // BACK TO CART
  // ==========================================

  const handleBackToCart = () => {
    navigate("/cart");
  };

  // ==========================================
  // CONTINUE SHOPPING
  // ==========================================

  const handleContinueShopping = () => {
    navigate("/products");
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="checkout-page">

      {/* =====================================
          CHECKOUT HEADER
      ====================================== */}

      <div className="checkout-header">

        <button
          type="button"
          className="back-to-cart-btn"
          onClick={handleBackToCart}
        >
          ← Back to Cart
        </button>

        <div className="checkout-title">
          <h1>Checkout</h1>

          <p>
            Complete your order securely
          </p>
        </div>

        <button
          type="button"
          className="continue-shopping-btn"
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </button>

      </div>

      {/* =====================================
          CHECKOUT CONTENT
      ====================================== */}

      <div className="checkout-container">

        <div className="checkout-left">

          {/* DELIVERY INFORMATION */}

          <div className="checkout-section">

            <h2>
              Delivery Information
            </h2>

            <div className="checkout-form">

              <div className="checkout-row">

                <div className="checkout-field">

                  <label>
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={customer.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                  />

                </div>

                <div className="checkout-field">

                  <label>
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={customer.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />

                </div>

              </div>

              <div className="checkout-row">

                <div className="checkout-field">

                  <label>
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    maxLength={10}
                    name="phone"
                    value={customer.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                  />

                </div>

              </div>

              <div className="checkout-field">

                <label>
                  Shipping Address
                </label>

                <textarea
                  name="address"
                  value={customer.address}
                  onChange={handleChange}
                  placeholder="Enter your complete shipping address"
                  rows="4"
                />

              </div>

            </div>

          </div>

          {/* PAYMENT METHOD */}

          <div className="checkout-section">

            <h2>
              Payment Method
            </h2>

            <div className="payment-methods">

              <label
                className={`payment-option ${
                  paymentMethod ===
                  "razorpay"
                    ? "active"
                    : ""
                }`}
              >

                <input
                  type="radio"
                  name="payment"
                  value="razorpay"
                  checked={
                    paymentMethod ===
                    "razorpay"
                  }
                  onChange={(e) =>
                    setPaymentMethod(
                      e.target.value
                    )
                  }
                />

                <div>

                  <strong>
                    Razorpay
                  </strong>

                  <p>
                    Pay securely using UPI,
                    Card or Net Banking
                  </p>

                </div>

              </label>

              <label
                className={`payment-option ${
                  paymentMethod === "cod"
                    ? "active"
                    : ""
                }`}
              >

                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={
                    paymentMethod === "cod"
                  }
                  onChange={(e) =>
                    setPaymentMethod(
                      e.target.value
                    )
                  }
                />

                <div>

                  <strong>
                    Cash on Delivery
                  </strong>

                  <p>
                    Pay when your order arrives
                  </p>

                </div>

              </label>

            </div>

          </div>

        </div>

        {/* =====================================
            ORDER SUMMARY
        ====================================== */}

        <div className="checkout-right">

          <div className="checkout-summary">

            <h2>
              Order Summary
            </h2>

            <div className="checkout-products">

              {cart.map(
                (item, index) => {

                  const product =
                    item?.product;

                  if (!product) {
                    return null;
                  }

                  const quantity =
                    Number(
                      item.quantity
                    ) || 1;

                  const price =
                    Number(
                      product.price
                    ) || 0;

                  return (
                    <div
                      className="checkout-product-item"
                      key={
                        item._id ||
                        index
                      }
                    >

                      <img
                        src={
                          product.image
                        }
                        alt={
                          product.name
                        }
                      />

                      <div className="checkout-product-info">

                        <h3>
                          {
                            product.name
                          }
                        </h3>

                        <p>
                          Qty:{" "}
                          {quantity}
                        </p>

                        <strong>
                          ₹
                          {price *
                            quantity}
                        </strong>

                      </div>

                    </div>
                  );
                }
              )}

            </div>

            <div className="summary-row">

              <span>
                Items
              </span>

              <span>
                {totalItems}
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

              <span className="free-text">
                FREE
              </span>

            </div>

            <div className="summary-row">

              <span>
                GST (18%)
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

              <strong>
                ₹{total}
              </strong>

            </div>

            <button
              className="place-order-btn"
              onClick={
                handlePlaceOrder
              }
              disabled={loading}
            >
              {loading
                ? "Processing..."
                : paymentMethod ===
                  "razorpay"
                ? "Pay & Place Order"
                : "Place Order"}
            </button>

            <button
              type="button"
              className="summary-shopping-btn"
              onClick={
                handleContinueShopping
              }
            >
              Continue Shopping
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Checkout;

