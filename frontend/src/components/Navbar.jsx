  
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useCart } from "../context/CartContext";

import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  let {cart}=useCart()

  let cartCount=cart.reduce((total, item) =>
      total + 1,
    0)
    

  return (
    <nav className="navbar-custom">

      <NavLink
        to="/"
        className="logo"
        onClick={() => setMenuOpen(false)}
      >
        🛍 ShopSphere
      </NavLink>

      <div
        className="menu-icon"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <div className={`nav-links ${menuOpen ? "active" : ""}`}>

        <NavLink to="/" onClick={() => setMenuOpen(false)}>
          Home
        </NavLink>

        <NavLink to="/products" onClick={() => setMenuOpen(false)}>
          Products
        </NavLink>

        <NavLink to="/cart" onClick={() => setMenuOpen(false)}>
          Cart({cartCount})
        </NavLink>

        <NavLink to="/login" onClick={() => setMenuOpen(false)}>
          Login
        </NavLink>

        <NavLink to="/register" onClick={() => setMenuOpen(false)}>
          Register
        </NavLink>

      </div>

    </nav>
  );
}

export default Navbar;


 