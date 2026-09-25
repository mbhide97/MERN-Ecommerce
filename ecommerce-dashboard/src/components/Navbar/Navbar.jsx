
// import { NavLink } from "react-router-dom";
// import {
//   FaShoppingCart,
//   FaHeart,
//   FaUser,
//   FaSearch,
//   FaBars,
//   FaTimes,
//   FaBoxOpen,
// } from "react-icons/fa";

// import { useContext, useState } from "react";

// import { CartContext } from "../../context/CartContext";
// import { WishlistContext } from "../../context/WishlistContext";
// import { ThemeContext } from "../../context/ThemeContext";

// import "./Navbar.css";

// function Navbar() {
//   const { cart } = useContext(CartContext);
//   const { wishlist } = useContext(WishlistContext);
//   const { darkMode, setDarkMode } = useContext(ThemeContext);

//   const [menuOpen, setMenuOpen] = useState(false);

//   const cartCount = cart.reduce(
//     (total, item) => total + Number(item.quantity || 0),
//     0
//   );

//   const wishlistCount = wishlist.length;

//   const toggleTheme = () => {
//     setDarkMode(!darkMode);
//   };

//   return (
//     <nav className="navbar-custom">

//       {/* Logo */}
//       <NavLink
//         to="/"
//         className="logo"
//         onClick={() => setMenuOpen(false)}
//       >
//         🛍 ShopSphere
//       </NavLink>

//       {/* Search */}
//       <div className="search-box">
//         <FaSearch />

//         <input
//           type="text"
//           placeholder="Search products..."
//         />
//       </div>

//       {/* Mobile Menu */}
//       <div
//         className="menu-icon"
//         onClick={() => setMenuOpen(!menuOpen)}
//       >
//         {menuOpen ? <FaTimes /> : <FaBars />}
//       </div>

//       {/* Navigation */}
//       <div className={`nav-links ${menuOpen ? "active" : ""}`}>

//         <NavLink
//           to="/"
//           onClick={() => setMenuOpen(false)}
//         >
//           Home
//         </NavLink>

//         <NavLink
//           to="/products"
//           onClick={() => setMenuOpen(false)}
//         >
//           Products
//         </NavLink>

//         {/* Wishlist */}
//         <NavLink
//           to="/wishlist"
//           className="wishlist-icon"
//           onClick={() => setMenuOpen(false)}
//         >
//           <FaHeart />

//           {wishlistCount > 0 && (
//             <span className="badge">
//               {wishlistCount}
//             </span>
//           )}
//         </NavLink>

//         {/* Cart */}
//         <NavLink
//           to="/cart"
//           className="cart-icon"
//           onClick={() => setMenuOpen(false)}
//         >
//           <FaShoppingCart />

//           {cartCount > 0 && (
//             <span className="badge">
//               {cartCount}
//             </span>
//           )}
//         </NavLink>

//         {/* Orders */}
//         <NavLink
//           to="/orders"
//           className="orders-link"
//           onClick={() => setMenuOpen(false)}
//         >
//           <FaBoxOpen />
//           <span>Orders</span>
//         </NavLink>

//         {/* Profile */}
//         <NavLink
//           to="/profile"
//           className="profile-link"
//           onClick={() => setMenuOpen(false)}
//         >
//           <FaUser />
//           <span>Profile</span>
//         </NavLink>

//         {/* Theme */}
//         <button
//           className="mode-btn"
//           onClick={toggleTheme}
//         >
//           {darkMode ? "☀️" : "🌙"}
//         </button>

//       </div>
//     </nav>
//   );
// }

// export default Navbar;


import { NavLink, useNavigate } from "react-router-dom";

import {
  FaShoppingCart,
  FaHeart,
  FaUser,
  FaSearch,
  FaBars,
  FaTimes,
  FaBoxOpen,
} from "react-icons/fa";

import { useContext, useState } from "react";

import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";
import { ThemeContext } from "../../context/ThemeContext";

import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const { darkMode, setDarkMode } =
    useContext(ThemeContext);

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [search, setSearch] =
    useState("");

  // =========================
  // CART COUNT
  // =========================

  const cartCount = cart.reduce(
    (total, item) =>
      total + Number(item.quantity || 0),
    0
  );

  // =========================
  // WISHLIST COUNT
  // =========================

  const wishlistCount = wishlist.length;

  // =========================
  // SEARCH
  // =========================

  const handleSearch = (e) => {
    e.preventDefault();

    const searchValue = search.trim();

    if (!searchValue) {
      navigate("/products");
    } else {
      navigate(
        `/products?search=${encodeURIComponent(
          searchValue
        )}`
      );
    }

    setMenuOpen(false);
  };

  // =========================
  // THEME
  // =========================

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // =========================
  // CLOSE MENU
  // =========================

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar-custom">

      {/* =========================
          LOGO
      ========================= */}

      <NavLink
        to="/"
        className="logo"
        onClick={closeMenu}
      >
        🛍 ShopSphere
      </NavLink>


      {/* =========================
          DESKTOP SEARCH
      ========================= */}

      <form
        className="search-box desktop-search"
        onSubmit={handleSearch}
      >
        <FaSearch />

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </form>


      {/* =========================
          MOBILE MENU BUTTON
      ========================= */}

      <div
        className="menu-icon"
        onClick={() =>
          setMenuOpen(!menuOpen)
        }
      >
        {menuOpen ? (
          <FaTimes />
        ) : (
          <FaBars />
        )}
      </div>


      {/* =========================
          NAVIGATION
      ========================= */}

      <div
        className={`nav-links ${
          menuOpen ? "active" : ""
        }`}
      >

        {/* =========================
            MOBILE SEARCH
        ========================= */}

        <form
          className="search-box mobile-search"
          onSubmit={handleSearch}
        >
          <FaSearch />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <button type="submit">
            Search
          </button>
        </form>


        {/* =========================
            HOME
        ========================= */}

        <NavLink
          to="/"
          onClick={closeMenu}
        >
          Home
        </NavLink>


        {/* =========================
            PRODUCTS
        ========================= */}

        <NavLink
          to="/products"
          onClick={closeMenu}
        >
          Products
        </NavLink>


        {/* =========================
            WISHLIST
        ========================= */}

        <NavLink
          to="/wishlist"
          className="wishlist-icon"
          onClick={closeMenu}
        >
          <FaHeart />

          <span>Wishlist</span>

          {wishlistCount > 0 && (
            <span className="badge">
              {wishlistCount}
            </span>
          )}
        </NavLink>


        {/* =========================
            CART
        ========================= */}

        <NavLink
          to="/cart"
          className="cart-icon"
          onClick={closeMenu}
        >
          <FaShoppingCart />

          <span>Cart</span>

          {cartCount > 0 && (
            <span className="badge">
              {cartCount}
            </span>
          )}
        </NavLink>


        {/* =========================
            ORDERS
        ========================= */}

        <NavLink
          to="/orders"
          className="orders-link"
          onClick={closeMenu}
        >
          <FaBoxOpen />

          <span>Orders</span>
        </NavLink>


        {/* =========================
            PROFILE
        ========================= */}

        <NavLink
          to="/profile"
          className="profile-link"
          onClick={closeMenu}
        >
          <FaUser />

          <span>Profile</span>
        </NavLink>


        {/* =========================
            DARK MODE
        ========================= */}

        <button
          className="mode-btn"
          onClick={toggleTheme}
          type="button"
        >
          {darkMode ? "☀️" : "🌙"}

          <span>
            {darkMode
              ? "Light Mode"
              : "Dark Mode"}
          </span>
        </button>

      </div>

    </nav>
  );
}

export default Navbar;