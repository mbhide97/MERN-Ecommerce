import React from "react";
import { useNavigate } from "react-router-dom";
import "./Success.css";

function Success() {
  const navigate = useNavigate();

  return (
    <div className="success-container">
      <div className="success-card">
        <div className="success-icon">✓</div>

        <h1>Order Placed Successfully!</h1>

        <p className="success-message">
          Thank you for shopping with ShopSphere.
          Your order has been placed successfully.
        </p>

        <div className="success-buttons">
          <button
            className="view-orders-btn"
            onClick={() => navigate("/orders")}
          >
            View Orders
          </button>

          <button
            className="continue-shopping-btn"
            onClick={() => navigate("/products")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default Success;