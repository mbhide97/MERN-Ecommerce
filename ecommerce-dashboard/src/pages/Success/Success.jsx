import "./Success.css";

import { Link } from "react-router-dom";

import {
  FaCheckCircle,
  FaShoppingBag,
  FaClipboardList,
  FaTruck,
} from "react-icons/fa";

function Success() {

  // Random Order ID
  const orderId =
    "ORD" +
    Math.floor(100000 + Math.random() * 900000);

  // Delivery Date (5 Days Later)
  const deliveryDate = new Date();

  deliveryDate.setDate(
    deliveryDate.getDate() + 5
  );

  const formattedDate =
    deliveryDate.toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );

  return (

    <section className="success-page">

      <div className="success-card">

        {/* Success Icon */}

        <div className="success-icon">

          <FaCheckCircle />

        </div>

        {/* Heading */}

        <h1>

          Order Placed Successfully 🎉

        </h1>

        <p>

          Thank you for shopping with us.

          Your order has been received successfully.

        </p>

        {/* Order Details */}

        <div className="order-details">

          <div className="detail-row">

            <span>

              Order ID

            </span>

            <strong>

              {orderId}

            </strong>

          </div>

          <div className="detail-row">

            <span>

              Estimated Delivery

            </span>

            <strong>

              {formattedDate}

            </strong>

          </div>

          <div className="detail-row">

            <span>

              Shipping

            </span>

            <strong>

              <FaTruck />

              Free Delivery

            </strong>

          </div>

        </div>
                {/* ===========================
              ACTION BUTTONS
        =========================== */}

        <div className="success-buttons">

          <Link
            to="/products"
            className="shop-btn"
          >

            <FaShoppingBag />

            Continue Shopping

          </Link>

          <Link
            to="/orders"
            className="orders-btn"
          >

            <FaClipboardList />

            View My Orders

          </Link>

        </div>

        {/* ===========================
              INVOICE
        =========================== */}

        <button
          className="invoice-btn"
          onClick={() =>
            alert(
              "Invoice Download Coming Soon..."
            )
          }
        >

          📄 Download Invoice

        </button>

        {/* ===========================
              THANK YOU
        =========================== */}

        <div className="thank-you">

          <h3>

            Thank You ❤️

          </h3>

          <p>

            We appreciate your purchase.

            Your order is now being processed.

          </p>

        </div>

      </div>

    </section>

  );

}

export default Success;