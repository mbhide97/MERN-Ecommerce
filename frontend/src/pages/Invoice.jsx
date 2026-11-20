 
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import "./Invoice.css";

function Invoice() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await api.get("/orders/my-orders");

        const orders = Array.isArray(response.data)
          ? response.data
          : response.data.orders || [];

        const foundOrder = orders.find(
          (item) => item._id === id
        );

        setOrder(foundOrder || null);

      } catch (error) {
        console.log("Invoice Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const DownloadInvoice = () => {
    window.print();
  };

  if (loading) {
    return <h2 className="invoice-loading">Loading Invoice...</h2>;
  }

  if (!order) {
    return <h2 className="invoice-loading">Invoice Not Found</h2>;
  }

  return (
    <div className="invoice-page">

      <div className="invoice-actions">
        <button onClick={DownloadInvoice}>
          <i className="fa-solid fa-download"></i>
          Download Invoice
        </button>
      </div>

      <div className="invoice-container">

         <div className="invoice-header">
          <div>
            <h1>ShopSphere</h1>
            <p>Your Shopping Destination</p>
          </div>

          <div className="invoice-title">
            <h2>INVOICE</h2>
            <p>#{order._id}</p>
          </div>
        </div>

         <div className="invoice-info">

          <div>
            <h3>Bill To</h3>

            <p><strong>Name:</strong> {order.customer?.name}</p>
            <p><strong>Email:</strong> {order.customer?.email}</p>
            <p><strong>Mobile:</strong> {order.customer?.number}</p>
            <p><strong>Address:</strong> {order.customer?.address}</p>
          </div>

          <div>
            <h3>Invoice Details</h3>

            <p>
              <strong>Order Date:</strong>{" "}
              {order.createdAt
                ? new Date(order.createdAt).toLocaleDateString()
                : "N/A"}
            </p>

            <p>
              <strong>Payment:</strong> {order.payment}
            </p>

            <p>
              <strong>Payment Status:</strong> {order.paymentStatus}
            </p>

            <p>
              <strong>Order Status:</strong> {order.orderStatus}
            </p>
          </div>

        </div>

         <h3 className="invoice-products-title">
          Order Items
        </h3>

        <table className="invoice-table">

          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {order.items?.map((item, index) => (
              <tr key={item._id || index}>

                <td>{item.name}</td>

                <td>₹{item.price}</td>

                <td>{item.quantity}</td>

                <td>
                  ₹{Number(item.price) * Number(item.quantity)}
                </td>

              </tr>
            ))}
          </tbody>

        </table>

         <div className="invoice-total">

          <p>
            Subtotal: ₹{order.subtotal}
          </p>

          <p>
            Delivery: ₹{order.delivery}
          </p>

          <h2>
            Total: ₹{order.total}
          </h2>

        </div>

      
        <div className="invoice-footer">
          <h3>Thank You For Shopping!</h3>
          <p>Thank you for choosing ShopSphere.</p>
          <p>We hope to see you again!</p>
        </div>

      </div>
    </div>
  );
}

export default Invoice;
