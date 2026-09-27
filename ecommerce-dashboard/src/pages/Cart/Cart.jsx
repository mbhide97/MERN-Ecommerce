
// import { useContext } from "react";
// import { useNavigate } from "react-router-dom";

// import {
//   FaTrash,
//   FaMinus,
//   FaPlus,
//   FaStar,
//   FaTruck,
// } from "react-icons/fa";

// import { CartContext } from "../../context/CartContext";

// import "./Cart.css";

// function Cart() {
//   const navigate = useNavigate();

//   const {
//     cart,
//     cartLoading,
//     removeFromCart,
//     increaseQuantity,
//     decreaseQuantity,
//   } = useContext(CartContext);

//   // ==========================================
//   // TOTAL PRICE
//   // ==========================================

//   const totalPrice = cart.reduce((total, item) => {
//     const price = item?.product?.price || 0;
//     const quantity = item?.quantity || 1;

//     return total + price * quantity;
//   }, 0);

//   // ==========================================
//   // CHECKOUT
//   // ==========================================

//   const handleCheckout = () => {
//     if (!cart || cart.length === 0) {
//       alert("Your cart is empty");
//       return;
//     }

//     navigate("/checkout");
//   };

//   // ==========================================
//   // LOADING
//   // ==========================================

//   if (cartLoading) {
//     return (
//       <div className="cart-page">
//         <div className="cart-loading">
//           <h2>Loading Cart...</h2>
//           <p>Please wait...</p>
//         </div>
//       </div>
//     );
//   }

//   // ==========================================
//   // EMPTY CART
//   // ==========================================

//   if (!cart || cart.length === 0) {
//     return (
//       <div className="cart-page">
//         <div className="empty-cart">
//           <h2>Your Cart is Empty 🛒</h2>

//           <p>
//             Looks like you haven't added anything to
//             your cart yet.
//           </p>

//           <button
//             className="continue-shopping-btn"
//             onClick={() => navigate("/products")}
//           >
//             Continue Shopping
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // ==========================================
//   // CART
//   // ==========================================

//   return (
//     <div className="cart-page">

//       {/* ======================================
//           TITLE
//       ====================================== */}

//       <div className="cart-header">
//         <h1>Shopping Cart</h1>

//         <p>
//           {cart.length}{" "}
//           {cart.length === 1 ? "Item" : "Items"} in
//           your cart
//         </p>
//       </div>

//       <div className="cart-container">

//         {/* ====================================
//             CART PRODUCTS
//         ==================================== */}

//         <div className="cart-products">

//           {cart.map((item) => {
//             const product = item?.product;

//             if (!product) {
//               return null;
//             }

//             const cartId = item?._id;

//             const price = product?.price || 0;

//             const quantity = item?.quantity || 1;

//             const itemTotal = price * quantity;

//             return (
//               <div
//                 className="cart-item"
//                 key={cartId}
//               >

//                 {/* PRODUCT IMAGE */}

//                 <div className="cart-product-image">
//                   <img
//                     src={product?.image}
//                     alt={product?.name}
//                   />
//                 </div>

//                 {/* PRODUCT DETAILS */}

//                 <div className="cart-product-details">

//                   <h2>
//                     {product?.name}
//                   </h2>

//                   <p className="cart-category">
//                     {product?.category}
//                   </p>

//                   {/* RATING */}

//                   <div className="cart-rating">
//                     <FaStar />
//                     <FaStar />
//                     <FaStar />
//                     <FaStar />
//                     <FaStar />
//                   </div>

//                   <p className="cart-price">
//                     ₹{price}
//                   </p>

//                   {/* STOCK */}

//                   {product?.stock > 0 && (
//                     <p className="cart-stock">
//                       In Stock
//                     </p>
//                   )}

//                   {/* QUANTITY */}

//                   <div className="quantity-section">

//                     <button
//                       className="quantity-btn"
//                       onClick={() =>
//                         decreaseQuantity(cartId)
//                       }
//                     >
//                       <FaMinus />
//                     </button>

//                     <span className="quantity">
//                       {quantity}
//                     </span>

//                     <button
//                       className="quantity-btn"
//                       onClick={() =>
//                         increaseQuantity(cartId)
//                       }
//                     >
//                       <FaPlus />
//                     </button>

//                   </div>

//                 </div>

//                 {/* RIGHT SIDE */}

//                 <div className="cart-item-right">

//                   <h3>
//                     ₹{itemTotal}
//                   </h3>

//                   <button
//                     className="remove-cart-btn"
//                     onClick={() =>
//                       removeFromCart(cartId)
//                     }
//                   >
//                     <FaTrash />
//                     Remove
//                   </button>

//                 </div>

//               </div>
//             );
//           })}

//           {/* DELIVERY INFO */}

//           <div className="cart-delivery">

//             <FaTruck />

//             <div>
//               <h3>
//                 Free Delivery
//               </h3>

//               <p>
//                 Free delivery on your order
//               </p>
//             </div>

//           </div>

//         </div>

//         {/* ====================================
//             ORDER SUMMARY
//         ==================================== */}

//         <div className="cart-summary">

//           <h2>
//             Order Summary
//           </h2>

//           <div className="summary-row">
//             <span>
//               Items
//             </span>

//             <span>
//               {cart.length}
//             </span>
//           </div>

//           <div className="summary-row">
//             <span>
//               Subtotal
//             </span>

//             <span>
//               ₹{totalPrice}
//             </span>
//           </div>

//           <div className="summary-row">
//             <span>
//               Delivery
//             </span>

//             <span className="free-text">
//               FREE
//             </span>
//           </div>

//           <hr />

//           <div className="summary-total">
//             <span>
//               Total
//             </span>

//             <strong>
//               ₹{totalPrice}
//             </strong>
//           </div>

//           <button
//             className="checkout-btn"
//             onClick={handleCheckout}
//           >
//             Proceed to Checkout
//           </button>

//           <button
//             className="continue-shopping-btn"
//             onClick={() =>
//               navigate("/products")
//             }
//           >
//             Continue Shopping
//           </button>

//         </div>

//       </div>
//     </div>
//   );
// }

// export default Cart;

import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaTrash,
  FaMinus,
  FaPlus,
  FaStar,
  FaTruck,
} from "react-icons/fa";

import { CartContext } from "../../context/CartContext";

import "./Cart.css";

function Cart() {
  const navigate = useNavigate();

  const {
    cart,
    cartLoading,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  // ==========================================
  // CALCULATE SUBTOTAL
  // ==========================================

  const totalPrice = cart.reduce((total, item) => {
    const price = item?.product?.price || 0;
    const quantity = item?.quantity || 1;

    return total + price * quantity;
  }, 0);

  // ==========================================
  // PROCEED TO CHECKOUT
  // ==========================================

  const handleCheckout = () => {
    if (!cart || cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    // Delivery charge
    const delivery = 0;

    // GST 18%
    const gst = Math.round(totalPrice * 0.18);

    // Final total
    const total = totalPrice + delivery + gst;

    navigate("/checkout", {
      state: {
        cart,
        subtotal: totalPrice,
        delivery,
        gst,
        total,
      },
    });
  };

  // ==========================================
  // CART LOADING
  // ==========================================

  if (cartLoading) {
    return (
      <div className="cart-page">
        <div className="cart-loading">
          <h2>Loading Cart...</h2>
          <p>Please wait...</p>
        </div>
      </div>
    );
  }

  // ==========================================
  // EMPTY CART
  // ==========================================

  if (!cart || cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <h2>Your Cart is Empty 🛒</h2>

          <p>
            Looks like you haven't added anything to
            your cart yet.
          </p>

          <button
            className="continue-shopping-btn"
            onClick={() => navigate("/products")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // CART UI
  // ==========================================

  return (
    <div className="cart-page">

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="cart-header">
        <h1>Shopping Cart</h1>

        <p>
          {cart.length}{" "}
          {cart.length === 1 ? "Item" : "Items"} in
          your cart
        </p>
      </div>

      <div className="cart-container">

        {/* ====================================
            CART PRODUCTS
        ==================================== */}

        <div className="cart-products">

          {cart.map((item) => {
            const product = item?.product;

            if (!product) {
              return null;
            }

            const cartId = item?._id;

            const price = product?.price || 0;

            const quantity = item?.quantity || 1;

            const itemTotal = price * quantity;

            return (
              <div
                className="cart-item"
                key={cartId}
              >

                {/* PRODUCT IMAGE */}

                <div className="cart-product-image">
                  <img
                    src={product?.image}
                    alt={product?.name}
                  />
                </div>

                {/* PRODUCT DETAILS */}

                <div className="cart-product-details">

                  <h2>
                    {product?.name}
                  </h2>

                  <p className="cart-category">
                    {product?.category}
                  </p>

                  {/* RATING */}

                  <div className="cart-rating">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>

                  {/* PRICE */}

                  <p className="cart-price">
                    ₹{price}
                  </p>

                  {/* STOCK */}

                  {product?.stock > 0 && (
                    <p className="cart-stock">
                      In Stock
                    </p>
                  )}

                  {/* QUANTITY */}

                  <div className="quantity-section">

                    <button
                      className="quantity-btn"
                      onClick={() =>
                        decreaseQuantity(cartId)
                      }
                    >
                      <FaMinus />
                    </button>

                    <span className="quantity">
                      {quantity}
                    </span>

                    <button
                      className="quantity-btn"
                      onClick={() =>
                        increaseQuantity(cartId)
                      }
                    >
                      <FaPlus />
                    </button>

                  </div>

                </div>

                {/* RIGHT SIDE */}

                <div className="cart-item-right">

                  <h3>
                    ₹{itemTotal}
                  </h3>

                  <button
                    className="remove-cart-btn"
                    onClick={() =>
                      removeFromCart(cartId)
                    }
                  >
                    <FaTrash />
                    Remove
                  </button>

                </div>

              </div>
            );
          })}

          {/* ==================================
              DELIVERY
          ================================== */}

          <div className="cart-delivery">

            <FaTruck />

            <div>
              <h3>Free Delivery</h3>

              <p>
                Free delivery on your order
              </p>
            </div>

          </div>

        </div>

        {/* ====================================
            ORDER SUMMARY
        ==================================== */}

        <div className="cart-summary">

          <h2>
            Order Summary
          </h2>

          <div className="summary-row">

            <span>
              Items
            </span>

            <span>
              {cart.length}
            </span>

          </div>

          <div className="summary-row">

            <span>
              Subtotal
            </span>

            <span>
              ₹{totalPrice}
            </span>

          </div>

          <div className="summary-row">

            <span>
              Delivery
            </span>

            <span className="free-text">
              FREE
            </span>

          </div>

          <hr />

          <div className="summary-total">

            <span>
              Total
            </span>

            <strong>
              ₹{totalPrice}
            </strong>

          </div>

          {/* CHECKOUT */}

          <button
            className="checkout-btn"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>

          {/* CONTINUE SHOPPING */}

          <button
            className="continue-shopping-btn"
            onClick={() =>
              navigate("/products")
            }
          >
            Continue Shopping
          </button>

        </div>

      </div>

    </div>
  );
}

export default Cart;