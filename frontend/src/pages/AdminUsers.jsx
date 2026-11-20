
import React, { useState, useEffect } from "react";
import api from "../api/axios";
import AdminSidebar from "../components/AdminSidebar";
import "./AdminUsers.css";

function AdminUsers() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/user/admin/all");
      setUsers(response.data.users || []);
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.msg || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      const response = await api.delete(`/user/admin/delete/${id}`);

      alert(response.data.msg || "User deleted successfully");
      fetchUsers();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.msg || "User delete failed");
    }
  };

  return (
    <div className="admin-users-layout">
      <AdminSidebar />

      <div className="admin-users">
        <h1>Manage Users</h1>
        <p className="admin-users-subtitle">
          View and manage registered ShopSphere users.
        </p>

        {loading && <h3>Loading Users...</h3>}

        {error && <h4>{error}</h4>}

        {!loading && !error && users.length === 0 && (
          <h3>No Users Found</h3>
        )}

        {!loading && !error && users.length > 0 && (
          <div className="admin-users-table-container">
            <table>
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`user-role ${user.role || "user"}`}>
                        {user.role || "user"}
                      </span>
                    </td>
                    <td>
                      {user.role !== "admin" && (
                        <button
                          className="delete-user-btn"
                          onClick={() => deleteUser(user._id)}
                        >
                          Delete
                        </button>
                      )}
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

export default AdminUsers;
