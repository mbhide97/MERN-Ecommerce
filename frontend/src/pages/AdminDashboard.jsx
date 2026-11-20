
import React, { useState, useEffect } from "react";
import api from "../api/axios";
import AdminSidebar from "../components/AdminSidebar";
import "./AdminDashboard.css";

function AdminDashboard() {

  const [status, setStatus] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get("/dashboard/status");
        setStatus(response.data.status);
      } catch (error) {
        console.log(error);
        setError("Unable to load dashboard content...");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      <AdminSidebar />

      <div className="admin-dashboard" style={{ flex: 1 }}>

        <h1 className="dashboard-title">
          ShopSphere Admin Dashboard
        </h1>

        {loading ? (
          <h2>Dashboard Loading...</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          <div className="dashboard-cards">

            <div className="dashboard-card">
              <h3>Total Users</h3>
              <h2>{status.totalUsers}</h2>
            </div>

            <div className="dashboard-card">
              <h3>Total Products</h3>
              <h2>{status.totalProducts}</h2>
            </div>

            <div className="dashboard-card">
              <h3>Total Orders</h3>
              <h2>{status.totalOrders}</h2>
            </div>

            <div className="dashboard-card">
              <h3>Total Revenue</h3>
              <h2>₹{status.totalRevenue}</h2>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default AdminDashboard;
