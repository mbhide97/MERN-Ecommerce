
// import "./OrderDetails.css";

// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// import {
//   FaBoxOpen,
//   FaMapMarkerAlt,
//   FaCreditCard,
//   FaCheckCircle,
//   FaClock,
//   FaTimesCircle,
//   FaArrowLeft,
// } from "react-icons/fa";

// import API from "../../services/api";

// function OrderDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         if (!token) {
//           alert("Please Login First");
//           navigate("/login");
//           return;
//         }

//         const response = await API.get(`/orders/${id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         console.log("✅ Order Details:", response.data);

//         setOrder(response.data.order);
//       } catch (error) {
//         console.error("❌ Order Details Error:", error);

//         if (error.response?.status === 401) {
//           localStorage.removeItem("token");
//           alert("Session Expired. Please Login Again.");
//           navigate("/login");
//           return;
//         }

//         setError(
//           error.response?.data?.message ||
//             "Failed to load order details"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrder();
//   }, [id, navigate]);

//   if (loading) {
//     return (
//       <div className="order-details-empty">
//         <h2>Loading Order Details...</h2>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="order-details-empty">
//         <h2>{error}</h2>

//         <button
//           onClick={() => navigate("/orders")}
//           className="back-order-btn"
//         >
//           <FaArrowLeft />
//           Back to Orders
//         </button>
//       </div>
//     );
//   }

//   if (!order) {
//     return (
//       <div className="order-details-empty">
//         <h2>Order Not Found</h2>

//         <button
//           onClick={() => navigate("/orders")}
//           className="back-order-btn"
//         >
//           <FaArrowLeft />
//           Back to Orders
//         </button>
//       </div>
//     );
//   }

//   const getStatusIcon = () => {
//     if (order.orderStatus === "Delivered") {
//       return <FaCheckCircle />;
//     }

//     if (order.orderStatus === "Cancelled") {
//       return <FaTimesCircle />;
//     }

//     return <FaClock />;
//   };

//   return (
//     <section className="order-details-page">
//       <div className="order-details-container">

//         <button
//           className="back-order-btn"
//           onClick={() => navigate("/orders")}
//         >
//           <FaArrowLeft />
//           Back to Orders
//         </button>

//         <div className="order-details-header">
//           <div>
//             <h1>
//               <FaBoxOpen />
//               Order Details
//             </h1>

//             <p>
//               Order ID: <strong>{order._id}</strong>
//             </p>
//           </div>

//           <div
//             className={`order-status-badge ${
//               order.orderStatus === "Delivered"
//                 ? "delivered"
//                 : order.orderStatus === "Cancelled"
//                 ? "cancelled"
//                 : "processing"
//             }`}
//           >
//             {getStatusIcon()}
//             {order.orderStatus}
//           </div>
//         </div>

//         <div className="order-details-grid">

//           <div className="order-products-section">
//             <h2>Ordered Products</h2>

//             {order.products?.map((item) => {
//               const product = item.product;

//               return (
//                 <div
//                   className="order-product-card"
//                   key={item._id || product?._id}
//                 >
//                   <div className="order-product-image">
//                     <img
//                       src={product?.image}
//                       alt={product?.name || "Product"}
//                     />
//                   </div>

//                   <div className="order-product-info">
//                     <span>
//                       {product?.category}
//                     </span>

//                     <h3>
//                       {product?.name}
//                     </h3>

//                     <p>
//                       Quantity:{" "}
//                       <strong>{item.quantity}</strong>
//                     </p>

//                     <p>
//                       Price:{" "}
//                       <strong>
//                         ₹{product?.price || 0}
//                       </strong>
//                     </p>
//                   </div>

//                   <div className="order-product-total">
//                     <h3>
//                       ₹
//                       {Number(product?.price || 0) *
//                         Number(item.quantity || 0)}
//                     </h3>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           <div className="order-summary-section">

//             <div className="details-card">
//               <h2>Order Summary</h2>

//               <div className="details-row">
//                 <span>Total Items</span>

//                 <strong>
//                   {order.products?.reduce(
//                     (total, item) =>
//                       total +
//                       Number(item.quantity || 0),
//                     0
//                   )}
//                 </strong>
//               </div>

//               <div className="details-row">
//                 <span>Payment Method</span>

//                 <strong>
//                   <FaCreditCard />
//                   {order.paymentMethod}
//                 </strong>
//               </div>

//               <div className="details-row total-row">
//                 <span>Total Amount</span>

//                 <strong>
//                   ₹{order.totalAmount}
//                 </strong>
//               </div>
//             </div>

//             <div className="details-card">
//               <h2>
//                 <FaMapMarkerAlt />
//                 Shipping Address
//               </h2>

//               <p className="shipping-address">
//                 {order.shippingAddress}
//               </p>
//             </div>

//             <div className="details-card">
//               <h2>Order Information</h2>

//               <div className="details-row">
//                 <span>Order Date</span>

//                 <strong>
//                   {new Date(
//                     order.createdAt
//                   ).toLocaleDateString("en-IN")}
//                 </strong>
//               </div>

//               <div className="details-row">
//                 <span>Order Status</span>

//                 <strong>
//                   {order.orderStatus}
//                 </strong>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default OrderDetails;


import "./OrderDetails.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  FaBoxOpen,
  FaMapMarkerAlt,
  FaCreditCard,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaArrowLeft,
  FaTruck,
} from "react-icons/fa";

import API from "../../services/api";

function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          alert("Please Login First");
          navigate("/login");
          return;
        }

        const response = await API.get(`/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("✅ Order Details:", response.data);

        setOrder(response.data.order);
      } catch (error) {
        console.error("❌ Order Details Error:", error);

        if (error.response?.status === 401) {
          localStorage.removeItem("token");

          alert("Session Expired. Please Login Again.");

          navigate("/login");
          return;
        }

        setError(
          error.response?.data?.message ||
            "Failed to load order details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="order-details-empty">
        <h2>Loading Order Details...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="order-details-empty">
        <h2>{error}</h2>

        <button
          onClick={() => navigate("/orders")}
          className="back-order-btn"
        >
          <FaArrowLeft />
          Back to Orders
        </button>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="order-details-empty">
        <h2>Order Not Found</h2>

        <button
          onClick={() => navigate("/orders")}
          className="back-order-btn"
        >
          <FaArrowLeft />
          Back to Orders
        </button>
      </div>
    );
  }

  // ==========================================
  // STATUS TIMELINE
  // ==========================================

  const statusSteps = [
    {
      name: "Pending",
      icon: <FaClock />,
      description: "Order placed",
    },
    {
      name: "Processing",
      icon: <FaBoxOpen />,
      description: "Order is being prepared",
    },
    {
      name: "Shipped",
      icon: <FaTruck />,
      description: "Order is on the way",
    },
    {
      name: "Delivered",
      icon: <FaCheckCircle />,
      description: "Order delivered",
    },
  ];

  const currentStatusIndex = statusSteps.findIndex(
    (step) => step.name === order.orderStatus
  );

  const getStatusIcon = () => {
    if (order.orderStatus === "Delivered") {
      return <FaCheckCircle />;
    }

    if (order.orderStatus === "Cancelled") {
      return <FaTimesCircle />;
    }

    return <FaClock />;
  };

  return (
    <section className="order-details-page">
      <div className="order-details-container">

        {/* BACK BUTTON */}

        <button
          className="back-order-btn"
          onClick={() => navigate("/orders")}
        >
          <FaArrowLeft />
          Back to Orders
        </button>

        {/* HEADER */}

        <div className="order-details-header">
          <div>
            <h1>
              <FaBoxOpen />
              Order Details
            </h1>

            <p>
              Order ID: <strong>{order._id}</strong>
            </p>
          </div>

          <div
            className={`order-status-badge ${
              order.orderStatus === "Delivered"
                ? "delivered"
                : order.orderStatus === "Cancelled"
                ? "cancelled"
                : "processing"
            }`}
          >
            {getStatusIcon()}
            {order.orderStatus}
          </div>
        </div>

        {/* ==========================================
              ORDER STATUS TIMELINE
        ========================================== */}

        <div className="order-timeline-card">

          <div className="timeline-heading">
            <h2>
              <FaTruck />
              Order Status
            </h2>

            <span>
              {order.orderStatus}
            </span>
          </div>

          {order.orderStatus === "Cancelled" ? (
            <div className="cancelled-timeline">

              <div className="cancelled-icon">
                <FaTimesCircle />
              </div>

              <div>
                <h3>Order Cancelled</h3>

                <p>
                  This order has been cancelled.
                </p>
              </div>

            </div>
          ) : (
            <div className="order-timeline">

              {statusSteps.map((step, index) => {

                const isCompleted =
                  currentStatusIndex >= index;

                const isCurrent =
                  currentStatusIndex === index;

                return (
                  <div
                    className={`timeline-step ${
                      isCompleted
                        ? "completed"
                        : ""
                    } ${
                      isCurrent
                        ? "current"
                        : ""
                    }`}
                    key={step.name}
                  >

                    <div className="timeline-icon">
                      {isCompleted ? (
                        index <
                        currentStatusIndex ? (
                          <FaCheckCircle />
                        ) : (
                          step.icon
                        )
                      ) : (
                        step.icon
                      )}
                    </div>

                    <div className="timeline-content">

                      <h3>
                        {step.name}
                      </h3>

                      <p>
                        {isCurrent
                          ? "Current Status"
                          : step.description}
                      </p>

                    </div>

                    {index <
                      statusSteps.length - 1 && (
                      <div
                        className={`timeline-line ${
                          currentStatusIndex >
                          index
                            ? "active"
                            : ""
                        }`}
                      />
                    )}

                  </div>
                );
              })}

            </div>
          )}

        </div>

        {/* MAIN GRID */}

        <div className="order-details-grid">

          {/* PRODUCTS */}

          <div className="order-products-section">

            <h2>Ordered Products</h2>

            {order.products?.map((item) => {

              const product = item.product;

              return (
                <div
                  className="order-product-card"
                  key={
                    item._id ||
                    product?._id
                  }
                >

                  <div className="order-product-image">

                    <img
                      src={product?.image}
                      alt={
                        product?.name ||
                        "Product"
                      }
                    />

                  </div>

                  <div className="order-product-info">

                    <span>
                      {product?.category}
                    </span>

                    <h3>
                      {product?.name}
                    </h3>

                    <p>
                      Quantity:{" "}
                      <strong>
                        {item.quantity}
                      </strong>
                    </p>

                    <p>
                      Price:{" "}
                      <strong>
                        ₹{product?.price || 0}
                      </strong>
                    </p>

                  </div>

                  <div className="order-product-total">

                    <h3>
                      ₹
                      {Number(
                        product?.price || 0
                      ) *
                        Number(
                          item.quantity || 0
                        )}
                    </h3>

                  </div>

                </div>
              );
            })}

          </div>

          {/* RIGHT SIDE */}

          <div className="order-summary-section">

            {/* ORDER SUMMARY */}

            <div className="details-card">

              <h2>
                Order Summary
              </h2>

              <div className="details-row">

                <span>
                  Total Items
                </span>

                <strong>
                  {order.products?.reduce(
                    (total, item) =>
                      total +
                      Number(
                        item.quantity || 0
                      ),
                    0
                  )}
                </strong>

              </div>

              <div className="details-row">

                <span>
                  Payment Method
                </span>

                <strong>
                  <FaCreditCard />
                  {order.paymentMethod}
                </strong>

              </div>

              <div className="details-row total-row">

                <span>
                  Total Amount
                </span>

                <strong>
                  ₹{order.totalAmount}
                </strong>

              </div>

            </div>

            {/* SHIPPING ADDRESS */}

            <div className="details-card">

              <h2>
                <FaMapMarkerAlt />
                Shipping Address
              </h2>

              <p className="shipping-address">
                {order.shippingAddress}
              </p>

            </div>

            {/* ORDER INFORMATION */}

            <div className="details-card">

              <h2>
                Order Information
              </h2>

              <div className="details-row">

                <span>
                  Order Date
                </span>

                <strong>
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString(
                    "en-IN"
                  )}
                </strong>

              </div>

              <div className="details-row">

                <span>
                  Order Status
                </span>

                <strong>
                  {order.orderStatus}
                </strong>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default OrderDetails;
 