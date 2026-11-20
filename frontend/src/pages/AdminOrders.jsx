 
import React, { useState, useEffect } from "react";
import AdminSidebar from "../components/AdminSidebar";
import api from "../api/axios";
import "./AdminOrders.css";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/orders/admin/all");

      setOrders(response.data.orders || []);

    } catch (error) {
      console.log(error);
      setError(
        error.response?.data?.msg || "Failed loading orders"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (id, orderStatus) => {
    try {
      await api.put(`/orders/admin/update/${id}`, {
        orderStatus
      });

      alert("Order status updated successfully");
      fetchOrders();

    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.msg || "Status update failed"
      );
    }
  };

  const deleteOrder = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/orders/admin/delete/${id}`);

      alert("Order deleted successfully");
      fetchOrders();

    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.msg || "Order delete failed"
      );
    }
  };

  return (
    <div className="admin-orders-layout">
      <AdminSidebar />

      <div className="admin-orders">
        <h1>Manage Orders</h1>

        {loading && <h3>Loading Orders...</h3>}

        {error && <h4>{error}</h4>}

        {!loading && !error && orders.length === 0 && (
          <h3>No Orders Found</h3>
        )}

        {!loading && orders.length > 0 && (
          <div className="admin-orders-table-container">
            <table className="admin-orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Email</th>
                  <th>Products</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Payment Status</th>
                  <th>Order Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>

                    <td>
                      {order.customer?.name || "N/A"}
                    </td>

                    <td>
                      {order.customer?.email || "N/A"}
                    </td>

                    <td>
                      {order.items?.map((item, index) => (
                        <div key={index}>
                          {item.name || item.product?.name || "Product"}
                          {" "}× {item.quantity}
                        </div>
                      ))}
                    </td>

                    <td>₹{order.total}</td>
                    <td>{order.payment}</td>
                    <td>{order.paymentStatus}</td>

                    <td>
                      <select
                        value={order.orderStatus || "Placed"}
                        onChange={(e) =>
                          updateOrderStatus(
                            order._id,
                            e.target.value
                          )
                        }
                      >
                        <option value="Placed">Placed</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>

                    <td>
                      <button
                        onClick={() => deleteOrder(order._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminOrders;
