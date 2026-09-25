// import React from "react";
// import "./Orders.css";

// import { useNavigate } from "react-router-dom";

// import {
//   FaBoxOpen,
//   FaTruck,
//   FaCheckCircle,
//   FaClock,
//   FaFileInvoice,
//   FaTimesCircle,
//   FaMapMarkerAlt,
// } from "react-icons/fa";

// function Orders() {

//   const navigate = useNavigate();

//   // Dummy Orders
//   const orders = [

//     {
//       id: "ORD784521",
//       image: "/products/headphone.png",
//       name: "Sony WH-1000XM5 Headphones",
//       category: "Electronics",
//       quantity: 1,
//       price: 24999,
//       payment: "Paid",
//       status: "Delivered",
//       orderDate: "25 July 2026",
//       deliveryDate: "28 July 2026",
//     },

//     {
//       id: "ORD784522",
//       image: "/products/shoes.png",
//       name: "Nike Air Max Shoes",
//       category: "Fashion",
//       quantity: 2,
//       price: 5999,
//       payment: "Paid",
//       status: "Shipped",
//       orderDate: "26 July 2026",
//       deliveryDate: "31 July 2026",
//     },

//     {
//       id: "ORD784523",
//       image: "/products/watch.png",
//       name: "Apple Watch Series 10",
//       category: "Wearables",
//       quantity: 1,
//       price: 45999,
//       payment: "Cash On Delivery",
//       status: "Processing",
//       orderDate: "27 July 2026",
//       deliveryDate: "02 Aug 2026",
//     },

//   ];

//   return (

//     <section className="orders-page">

//       <div className="orders-container">

//         <div className="orders-header">

//           <h1>

//             <FaBoxOpen />

//             My Orders

//           </h1>

//           <p>

//             Track all your recent purchases.

//           </p>

//         </div>

//         {/* Orders Start */}

//         {
//           orders.map((order) => (

//             <div
//               className="order-card"
//               key={order.id}
//             >

//                {/* ===========================
//                     PRODUCT IMAGE
//               =========================== */}

//               <div className="order-image">

//                 <img
//                   src={order.image}
//                   alt={order.name}
//                 />

//               </div>

//               {/* ===========================
//                     PRODUCT DETAILS
//               =========================== */}

//               <div className="order-details">

//                 <span className="order-category">

//                   {order.category}

//                 </span>

//                 <h2>

//                   {order.name}

//                 </h2>

//                 <p>

//                   <strong>Order ID :</strong>

//                   {order.id}

//                 </p>

//                 <p>

//                   <strong>Quantity :</strong>

//                   {order.quantity}

//                 </p>

//                 <p>

//                   <strong>Order Date :</strong>

//                   {order.orderDate}

//                 </p>

//                 <p>

//                   <strong>Expected Delivery :</strong>

//                   {order.deliveryDate}

//                 </p>

//                 <p>

//                   <FaMapMarkerAlt />

//                   Home Delivery

//                 </p>

//               </div>

//               {/* ===========================
//                     PRICE
//               =========================== */}

//               <div className="order-price">

//                 <h2>

//                   ₹{order.price}

//                 </h2>

//                 <span>

//                   {order.payment}

//                 </span>

//               </div>

//               {/* ===========================
//                     STATUS START
//               =========================== */}

//               <div className="order-status"></div>
//                               {/* ===========================
//                       ORDER STATUS
//                 =========================== */}

//                 {order.status === "Delivered" && (

//                   <div className="status delivered">

//                     <FaCheckCircle />

//                     Delivered

//                   </div>

//                 )}

//                 {order.status === "Shipped" && (

//                   <div className="status shipped">

//                     <FaTruck />

//                     Shipped

//                   </div>

//                 )}

//                 {order.status === "Processing" && (

//                   <div className="status processing">

//                     <FaClock />

//                     Processing

//                   </div>

//                 )}

//                 {/* ===========================
//                       ACTION BUTTONS
//                 =========================== */}

//                 <div className="order-buttons">

//                   <button
//                     className="track-btn"
//                     onClick={() =>
//                       alert("Tracking Feature Coming Soon...")
//                     }
//                   >
//                     <FaTruck />

//                     Track Order

//                   </button>

//                   <button
//                     className="invoice-btn"
//                     onClick={() =>
//                       alert("Invoice Download Coming Soon...")
//                     }
//                   >
//                     <FaFileInvoice />

//                     Invoice

//                   </button>

//                   {order.status === "Processing" && (

//                     <button
//                       className="cancel-btn"
//                       onClick={() =>
//                         alert("Order Cancelled")
//                       }
//                     >
//                       <FaTimesCircle />

//                       Cancel

//                     </button>

//                   )}

//                 </div>

//               </div>

        

//           ))

//         }

//       </div>
      

//     </section>

//   );

// }

// export default Orders;
 

import "./Orders.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaBoxOpen,
  FaTruck,
  FaFileInvoice,
  FaTimesCircle,
  FaMapMarkerAlt,
  FaClock,
  FaCheckCircle,
  FaEye,
} from "react-icons/fa";

import API from "../../services/api";

function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // GET MY ORDERS
  // ==========================================

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          alert("Please Login First");
          navigate("/login");
          return;
        }

        const response = await API.get("/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("✅ Orders:", response.data);

        setOrders(response.data.orders || []);
      } catch (error) {
        console.error("❌ Orders Error:", error);

        if (error.response?.status === 401) {
          localStorage.removeItem("token");

          alert("Session Expired. Please Login Again.");

          navigate("/login");
          return;
        }

        setError(
          error.response?.data?.message ||
            "Failed to load orders"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);


    // ==========================================
  // CANCEL ORDER
  // ==========================================

  const handleCancelOrder = async (orderId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmCancel) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please Login First");
        navigate("/login");
        return;
      }

      const response = await API.put(
        `/orders/${orderId}`,
        {
          orderStatus: "Cancelled",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "✅ Order Cancelled:",
        response.data
      );

      if (response.data.success) {
        alert("Order Cancelled Successfully ❌");

        // Update order status on screen
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId
              ? {
                  ...order,
                  orderStatus: "Cancelled",
                }
              : order
          )
        );
      }
    } catch (error) {
      console.error(
        "❌ Cancel Order Error:",
        error
      );

      if (error.response?.status === 401) {
        localStorage.removeItem("token");

        alert(
          "Session Expired. Please Login Again."
        );

        navigate("/login");
        return;
      }

      alert(
        error.response?.data?.message ||
          "Failed to cancel order"
      );
    }
  };
  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="checkout-empty">
        <h2>Loading Orders...</h2>
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <div className="checkout-empty">
        <h2>{error}</h2>

        <button
          className="back-btn"
          onClick={() => navigate("/products")}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  // ==========================================
  // NO ORDERS
  // ==========================================

  if (orders.length === 0) {
    return (
      <div className="checkout-empty">
        <h2>No Orders Found</h2>

        <p>You haven't placed any orders yet.</p>

        <button
          className="back-btn"
          onClick={() => navigate("/products")}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  // ==========================================
  // ORDERS UI
  // ==========================================

  return (
    <section className="orders-page">
      <div className="orders-container">

        {/* HEADER */}

        <div className="orders-header">
          <h1>
            <FaBoxOpen />
            My Orders
          </h1>

          <p>
            Track your purchases and order status.
          </p>
        </div>

        {/* ORDERS */}

        {orders.map((order) => (
          <div
            className="order-card"
            key={order._id}
          >

            {/* IMAGE */}

            <div className="order-image">
              <img
                src={
                  order.products?.[0]?.product?.image
                }
                alt={
                  order.products?.[0]?.product?.name ||
                  "Product"
                }
              />
            </div>

            {/* DETAILS */}

            <div className="order-details">

              <span className="order-category">
                {
                  order.products?.[0]?.product
                    ?.category
                }
              </span>

              <h2>
                {
                  order.products?.[0]?.product
                    ?.name
                }
              </h2>

              <p>
                <strong>Order ID :</strong>{" "}
                {order._id}
              </p>

              <p>
                <strong>Quantity :</strong>{" "}
                {order.products?.reduce(
                  (total, item) =>
                    total +
                    Number(item.quantity || 0),
                  0
                )}
              </p>

              <p>
                <strong>Payment :</strong>{" "}
                {order.paymentMethod}
              </p>

              <p>
                <strong>Total :</strong>{" "}
                ₹{order.totalAmount}
              </p>

              <p>
                <FaMapMarkerAlt /> Home Delivery
              </p>

            </div>

            {/* PRICE */}

            <div className="order-price">

              <h2>
                ₹{order.totalAmount}
              </h2>

              <span>
                {order.paymentMethod}
              </span>

            </div>

            {/* STATUS */}

            <div className="order-status">

              <div
                className={`status ${
                  order.orderStatus === "Delivered"
                    ? "delivered"
                    : order.orderStatus === "Cancelled"
                    ? "cancelled"
                    : "processing"
                }`}
              >

                {order.orderStatus === "Delivered" ? (
                  <FaCheckCircle />
                ) : order.orderStatus === "Cancelled" ? (
                  <FaTimesCircle />
                ) : (
                  <FaClock />
                )}

                {order.orderStatus}
              </div>

              <div className="order-buttons">

                {/* VIEW DETAILS */}

                <button
                  className="details-btn"
                  onClick={() =>
                    navigate(
                      `/order-details/${order._id}`
                    )
                  }
                >
                  <FaEye />
                  View Details
                </button>

                {/* TRACK ORDER */}

                <button
                  className="track-btn"
                  onClick={() =>
                    alert(
                      `Order Status: ${order.orderStatus}`
                    )
                  }
                >
                  <FaTruck />
                  Track Order
                </button>

                {/* INVOICE */}

                <button
  className="invoice-btn"
  onClick={() =>
    navigate(`/invoice/${order._id}`)
  }
>
  <FaFileInvoice />
  Invoice
</button>

                {/* CANCEL */}

                <button
  className="cancel-btn"
  onClick={() =>
    handleCancelOrder(order._id)
  }
  disabled={
    order.orderStatus === "Delivered" ||
    order.orderStatus === "Cancelled"
  }
>
  <FaTimesCircle />
  {order.orderStatus === "Cancelled"
    ? "Cancelled"
    : order.orderStatus === "Delivered"
    ? "Delivered"
    : "Cancel"}
</button>
              </div>

            </div>

          </div>
        ))}

      </div>
    </section>
  );
}

export default Orders;

