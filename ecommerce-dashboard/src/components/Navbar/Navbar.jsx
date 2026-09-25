
import { NavLink } from "react-router-dom";
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
  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  const [menuOpen, setMenuOpen] = useState(false);

  const cartCount = cart.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0
  );

  const wishlistCount = wishlist.length;

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <nav className="navbar-custom">

      {/* Logo */}
      <NavLink
        to="/"
        className="logo"
        onClick={() => setMenuOpen(false)}
      >
        🛍 ShopSphere
      </NavLink>

      {/* Search */}
      <div className="search-box">
        <FaSearch />

        <input
          type="text"
          placeholder="Search products..."
        />
      </div>

      {/* Mobile Menu */}
      <div
        className="menu-icon"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Navigation */}
      <div className={`nav-links ${menuOpen ? "active" : ""}`}>

        <NavLink
          to="/"
          onClick={() => setMenuOpen(false)}
        >
          Home
        </NavLink>

        <NavLink
          to="/products"
          onClick={() => setMenuOpen(false)}
        >
          Products
        </NavLink>

        {/* Wishlist */}
        <NavLink
          to="/wishlist"
          className="wishlist-icon"
          onClick={() => setMenuOpen(false)}
        >
          <FaHeart />

          {wishlistCount > 0 && (
            <span className="badge">
              {wishlistCount}
            </span>
          )}
        </NavLink>

        {/* Cart */}
        <NavLink
          to="/cart"
          className="cart-icon"
          onClick={() => setMenuOpen(false)}
        >
          <FaShoppingCart />

          {cartCount > 0 && (
            <span className="badge">
              {cartCount}
            </span>
          )}
        </NavLink>

        {/* Orders */}
        <NavLink
          to="/orders"
          className="orders-link"
          onClick={() => setMenuOpen(false)}
        >
          <FaBoxOpen />
          <span>Orders</span>
        </NavLink>

        {/* Profile */}
        <NavLink
          to="/profile"
          className="profile-link"
          onClick={() => setMenuOpen(false)}
        >
          <FaUser />
          <span>Profile</span>
        </NavLink>

        {/* Theme */}
        <button
          className="mode-btn"
          onClick={toggleTheme}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

      </div>
    </nav>
  );
}

export default Navbar;




//  import { NavLink } from "react-router-dom";
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
//     (total, item) => total + item.quantity,
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

// import { NavLink } from "react-router-dom";
// import {
//   FaShoppingCart,
//   FaHeart,
//   FaUser,
//   FaSearch,
//   FaBars,
//   FaTimes,
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
//     (total, item) => total + item.quantity,
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

//         <NavLink
//           to="/login"
//           onClick={() => setMenuOpen(false)}
//         >
//           <FaUser />
//         </NavLink>

//         {/* Theme Toggle */}
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