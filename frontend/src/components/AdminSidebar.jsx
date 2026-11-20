
// import React from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import "./AdminSidebar.css";

// function AdminSidebar() {

//   let navigate = useNavigate();

//   let LogoutHandler = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   return (
//     <div className="admin-sidebar">

//       <h1>ShopSphere</h1>

//       <h2>Admin Panel</h2>

//       <NavLink to="/admin/dashboard">Dashboard</NavLink>
//       <NavLink to="/admin/products">Manage Products</NavLink>
//       <NavLink to="/admin/orders">Manage Orders</NavLink>
//       <NavLink to="/admin/users">Manage Users</NavLink>

//       <button onClick={LogoutHandler}>Logout</button>

//     </div>
//   );
// }

// export default AdminSidebar;

import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./AdminSidebar.css";

function AdminSidebar() {
  const navigate = useNavigate();

  const LogoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="admin-sidebar">
      <div className="sidebar-brand">
        <h1>ShopSphere</h1>
        <h2>Admin Panel</h2>
      </div>

      <nav className="sidebar-links">
        <NavLink to="/admin/dashboard">Dashboard</NavLink>
        <NavLink to="/admin/products">Manage Products</NavLink>
        <NavLink to="/admin/orders">Manage Orders</NavLink>
        <NavLink to="/admin/users">Manage Users</NavLink>
      </nav>

      <button className="sidebar-logout" onClick={LogoutHandler}>
        Logout
      </button>
    </div>
  );
}

export default AdminSidebar;
