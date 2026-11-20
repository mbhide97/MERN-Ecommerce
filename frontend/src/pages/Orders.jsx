import React, { useState, useEffect } from "react";
import api from "../api/axios";
import "./Orders.css";
import {  useNavigate } from "react-router-dom";

function Orders() {

  let navigate=useNavigate()
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const OrderFetch = async () => {
      try {
        const response = await api.get("/orders/my-orders");
        const data = response.data;

        setOrders(
          Array.isArray(data) ? data : data.orders || []
        );
      } catch (err) {
        console.log(err.response?.data || err.message);

        setError(
          err.response?.data?.msg ||
          err.response?.data?.message ||
          "Failed to load orders"
        );
      } finally {
        setLoading(false);
      }
    };

    OrderFetch();
  }, []);

  if (loading) {
    return <div className="orders-loading">Loading Orders...</div>;
  }

  if (error) {
    return <div className="orders-error">{error}</div>;
  }

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h1>My Orders</h1>
        <p>Track and manage your ShopSphere purchases.</p>
      </div>

      {orders.length === 0 ? (
        <div className="orders-empty">
          <div className="empty-icon">📦</div>
          <h2>No Orders Found</h2>
          <p>Your orders will appear here after checkout.</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((demo) => (
            <div className="order-card" key={demo._id}>
              <div className="order-card-header">
                <div>
                  <h2>Order Details</h2>
                  <p className="order-id">ID: {demo._id}</p>
                </div>

                <span className="order-status">
                  {demo.orderStatus || demo.status || "Pending"}
                </span>
              </div>

              <div className="order-info">
                <div className="order-info-item">
                  <span>Total Amount</span>
                  <strong>₹{demo.total ?? 0}</strong>
                </div>

                <div className="order-info-item">
                  <span>Payment Method</span>
                  <strong>{demo.payment || "COD"}</strong>
                </div>

                <div className="order-info-item">
                  <span>Payment Status</span>
                  <strong>{demo.paymentStatus || "Pending"}</strong>
                </div>
              </div>

              <div className="order-products">
                <h3>Products</h3>

                {demo.items?.map((item, index) => (
                  <div className="order-product" key={item._id || index}>
                    <span>
                      {item.name || item.product?.name || "Product"}
                    </span>

                    <span className="product-quantity">
                      Qty: {item.quantity || 1}
                    </span>
                  </div>
                ))}
              </div>

<button
                className="invoice-btn"
                onClick={() => navigate(`/invoice/${demo._id}`)}
              >
                Download Invoice
              </button>            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;