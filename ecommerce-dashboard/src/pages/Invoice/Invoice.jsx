 import "./Invoice.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  FaArrowLeft,
  FaFileInvoice,
  FaMapMarkerAlt,
  FaCreditCard,
  FaPrint,
  FaUser,
  FaDownload,
} from "react-icons/fa";

import html2pdf from "html2pdf.js";

import API from "../../services/api";

function Invoice() {
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

        console.log("✅ Invoice Order:", response.data);

        setOrder(response.data.order);
      } catch (error) {
        console.error("❌ Invoice Error:", error);

        if (error.response?.status === 401) {
          localStorage.removeItem("token");

          alert("Session Expired. Please Login Again.");

          navigate("/login");
          return;
        }

        setError(
          error.response?.data?.message ||
            "Failed to load invoice"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, navigate]);

  // PRINT INVOICE
  const printInvoice = () => {
    window.print();
  };

  // DOWNLOAD PDF
  const downloadPDF = () => {
    const invoiceElement =
      document.querySelector(".invoice-card");

    if (!invoiceElement) {
      alert("Invoice not found");
      return;
    }

    const options = {
      margin: 10,
      filename: `ShopSphere-Invoice-${order._id}.pdf`,
      image: {
        type: "jpeg",
        quality: 0.98,
      },
      html2canvas: {
        scale: 2,
        useCORS: true,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
    };

    html2pdf()
      .set(options)
      .from(invoiceElement)
      .save();
  };

  if (loading) {
    return (
      <div className="invoice-empty">
        <h2>Loading Invoice...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="invoice-empty">
        <h2>{error}</h2>

        <button
          className="invoice-back-btn"
          onClick={() => navigate("/orders")}
        >
          <FaArrowLeft />
          Back to Orders
        </button>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="invoice-empty">
        <h2>Invoice Not Found</h2>

        <button
          className="invoice-back-btn"
          onClick={() => navigate("/orders")}
        >
          <FaArrowLeft />
          Back to Orders
        </button>
      </div>
    );
  }

  const totalItems =
    order.products?.reduce(
      (total, item) =>
        total + Number(item.quantity || 0),
      0
    );

  return (
    <section className="invoice-page">
      <div className="invoice-container">

        {/* ACTION BUTTONS */}

        <div className="invoice-actions no-print">

          <button
            className="invoice-back-btn"
            onClick={() => navigate("/orders")}
          >
            <FaArrowLeft />
            Back to Orders
          </button>

          <div className="invoice-action-buttons">

            <button
              className="invoice-print-btn"
              onClick={printInvoice}
            >
              <FaPrint />
              Print Invoice
            </button>

            <button
              className="invoice-download-btn"
              onClick={downloadPDF}
            >
              <FaDownload />
              Download PDF
            </button>

          </div>
        </div>

        {/* INVOICE */}

        <div className="invoice-card">

          {/* HEADER */}

          <div className="invoice-header">

            <div className="shop-info">
              <h1>🛍 ShopSphere</h1>

              <p>
                Premium Online Shopping
              </p>

              <p>
                Pune, Maharashtra, India
              </p>
            </div>

            <div className="invoice-title">

              <FaFileInvoice />

              <h2>INVOICE</h2>

              <p>
                #{order._id}
              </p>

            </div>

          </div>

          <hr />

          {/* CUSTOMER / ORDER / ADDRESS */}

          <div className="invoice-info-grid">

            {/* CUSTOMER */}

            <div className="invoice-info-box">

              <h3>
                <FaUser />
                Customer Details
              </h3>

              <p>
                <strong>Name:</strong>{" "}
                {order.customerName || "N/A"}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {order.customerEmail || "N/A"}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {order.customerPhone || "N/A"}
              </p>

            </div>

            {/* ORDER INFORMATION */}

            <div className="invoice-info-box">

              <h3>
                <FaFileInvoice />
                Order Information
              </h3>

              <p>
                <strong>Order ID:</strong>{" "}
                {order._id}
              </p>

              <p>
                <strong>Order Date:</strong>{" "}
                {new Date(
                  order.createdAt
                ).toLocaleDateString("en-IN")}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {order.orderStatus}
              </p>

              <p>
                <strong>Payment:</strong>{" "}
                <FaCreditCard />{" "}
                {order.paymentMethod}
              </p>

            </div>

            {/* SHIPPING ADDRESS */}

            <div className="invoice-info-box">

              <h3>
                <FaMapMarkerAlt />
                Shipping Address
              </h3>

              <p>
                {order.shippingAddress}
              </p>

            </div>

          </div>

          {/* PRODUCTS */}

          <div className="invoice-products">

            <h3>
              Order Items
            </h3>

            <div className="invoice-table">

              <div className="invoice-table-header">

                <span>Product</span>
                <span>Price</span>
                <span>Qty</span>
                <span>Total</span>

              </div>

              {order.products?.map((item) => {

                const product = item.product;

                const itemTotal =
                  Number(product?.price || 0) *
                  Number(item.quantity || 0);

                return (
                  <div
                    className="invoice-table-row"
                    key={
                      item._id ||
                      product?._id
                    }
                  >

                    <div className="invoice-product">

                      <img
                        src={product?.image}
                        alt={
                          product?.name ||
                          "Product"
                        }
                      />

                      <div>

                        <strong>
                          {product?.name}
                        </strong>

                        <small>
                          {product?.category}
                        </small>

                      </div>

                    </div>

                    <span>
                      ₹{product?.price || 0}
                    </span>

                    <span>
                      {item.quantity}
                    </span>

                    <strong>
                      ₹{itemTotal}
                    </strong>

                  </div>
                );
              })}

            </div>

          </div>

          {/* SUMMARY */}

          <div className="invoice-summary">

            <div className="invoice-summary-row">

              <span>Total Items</span>

              <strong>
                {totalItems}
              </strong>

            </div>

            <div className="invoice-summary-row">

              <span>Subtotal</span>

              <strong>
                ₹{order.subtotal || 0}
              </strong>

            </div>

            <div className="invoice-summary-row">

              <span>Delivery</span>

              <strong>
                {Number(
                  order.deliveryCharge || 0
                ) === 0
                  ? "FREE"
                  : `₹${order.deliveryCharge}`}
              </strong>

            </div>

            <div className="invoice-summary-row">

              <span>GST (5%)</span>

              <strong>
                ₹{order.gst || 0}
              </strong>

            </div>

            {Number(order.discount || 0) > 0 && (
              <div className="invoice-summary-row discount">

                <span>
                  Coupon Discount
                </span>

                <strong>
                  - ₹{order.discount}
                </strong>

              </div>
            )}

            <div className="invoice-summary-row">

              <span>Payment Method</span>

              <strong>
                {order.paymentMethod}
              </strong>

            </div>

            <div className="invoice-summary-total">

              <span>
                Total Amount
              </span>

              <strong>
                ₹{order.totalAmount}
              </strong>

            </div>

          </div>

          {/* FOOTER */}

          <div className="invoice-footer">

            <h3>
              Thank You for Shopping with
              ShopSphere! ❤️
            </h3>

            <p>
              This is a computer-generated
              invoice.
            </p>

          </div>

        </div>
      </div>
    </section>
  );
}

export default Invoice;