//  import { useContext } from "react";
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
//     removeFromCart,
//     increaseQuantity,
//     decreaseQuantity,
//   } = useContext(CartContext);

//   const subtotal = cart.reduce(
//     (total, item) =>
//       total + item.price * item.quantity,
//     0
//   );

//   const delivery = subtotal > 1000 ? 0 : 99;

//   const gst = Math.round(subtotal * 0.05);

//   const total = subtotal + delivery + gst;

//   if (cart.length === 0) {
//     return (
//       <div className="empty-cart">

//         <img
//           src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
//           alt="cart"
//         />

//         <h1>Your Cart is Empty</h1>

//         <p>
//           Add products and start shopping.
//         </p>

//         <button
//           className="shop-btn"
//           onClick={() =>
//             navigate("/products")
//           }
//         >
//           Continue Shopping
//         </button>

//       </div>
//     );
//   }

//   return (

//     <div className="cart-page">

//       <h1 className="cart-title">
//         Shopping Cart
//       </h1>

//       <div className="cart-container">

//         {/* LEFT */}

//         <div className="cart-left">

//           {cart.map((item) => (

//             <div
//               className="cart-card"
//               key={item.id}
//             >

//               <div className="cart-image">

//                 <img
//                   src={item.image}
//                   alt={item.name}
//                 />

//               </div>

//               <div className="cart-details">

//                 <span className="category">
//                   {item.category}
//                 </span>

//                 <h2>
//                   {item.name}
//                 </h2>

//                 <div className="rating">

//                   <FaStar />

//                   <span>
//                     {item.rating}
//                   </span>

//                 </div>

//                 <div className="price">

//                   <span className="new-price">
//                     ₹{item.price}
//                   </span>

//                   <span className="old-price">
//                     ₹{item.oldPrice}
//                   </span>

//                 </div>

//                 <div className="delivery">

//                   <FaTruck />

//                   Free Delivery

//                 </div>

//               </div>

//               <div className="cart-actions">

//                 <div className="qty-box">

//                   <button
//                     onClick={() =>
//                       decreaseQuantity(item.id)
//                     }
//                   >
//                     <FaMinus />
//                   </button>

//                   <span>
//                     {item.quantity}
//                   </span>

//                   <button
//                     onClick={() =>
//                       increaseQuantity(item.id)
//                     }
//                   >
//                     <FaPlus />
//                   </button>

//                 </div>

//                 <h3>
//                   ₹
//                   {item.price *
//                     item.quantity}
//                 </h3>

//                 <button
//                   className="remove-btn"
//                   onClick={() =>
//                     removeFromCart(item.id)
//                   }
//                 >

//                   <FaTrash />

//                   Remove

//                 </button>

//               </div>

//             </div>

//           ))}
//                   </div>

//         {/* ================= RIGHT SIDE ================= */}

//         <div className="cart-right">

//           <div className="summary-card">

//             <h2>Order Summary</h2>

//             <div className="summary-row">
//               <span>Items</span>
//               <span>{cart.length}</span>
//             </div>

//             <div className="summary-row">
//               <span>Subtotal</span>
//               <span>₹{subtotal}</span>
//             </div>

//             <div className="summary-row">
//               <span>Delivery</span>
//               <span>
//                 {delivery === 0 ? "FREE" : `₹${delivery}`}
//               </span>
//             </div>

//             <div className="summary-row">
//               <span>GST (5%)</span>
//               <span>₹{gst}</span>
//             </div>

//             <hr />

//             <div className="summary-total">

//               <span>Total</span>

//               <h3>₹{total}</h3>

//             </div>

//             {/* Coupon */}

//             <div className="coupon-box">

//               <input
//                 type="text"
//                 placeholder="Enter Coupon Code"
//               />

//               <button>

//                 Apply

//               </button>

//             </div>

//             <button
//               className="checkout-btn"
//               onClick={() =>
//                 navigate("/checkout", {
//                   state: {
//                     cart,
//                     subtotal,
//                     delivery,
//                     gst,
//                     total,
//                   },
//                 })
//               }
//             >

//               Proceed To Checkout

//             </button>

//             <button
//               className="continue-btn"
//               onClick={() =>
//                 navigate("/products")
//               }
//             >

//               Continue Shopping

//             </button>

//             <div className="secure-payment">

//               🔒 100% Secure Checkout

//             </div>

//           </div>

//         </div>

//       </div>

//     </div>

//   );

// }

// export default Cart;


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
//     removeFromCart,
//     increaseQuantity,
//     decreaseQuantity,
//   } = useContext(CartContext);

//   // ==========================================
//   // SUBTOTAL
//   // ==========================================

//   const subtotal = cart.reduce(
//     (total, item) =>
//       total +
//       Number(item.product?.price || 0) *
//         Number(item.quantity || 0),
//     0
//   );

//   // ==========================================
//   // DELIVERY
//   // ==========================================

//   const delivery = subtotal > 1000 ? 0 : 99;

//   // ==========================================
//   // GST
//   // ==========================================

//   const gst = Math.round(subtotal * 0.05);

//   // ==========================================
//   // FINAL TOTAL
//   // ==========================================

//   const total = subtotal + delivery + gst;

//   // ==========================================
//   // EMPTY CART
//   // ==========================================

//   if (cart.length === 0) {
//     return (
//       <div className="empty-cart">
//         <img
//           src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
//           alt="cart"
//         />

//         <h1>Your Cart is Empty</h1>

//         <p>
//           Add products and start shopping.
//         </p>

//         <button
//           className="shop-btn"
//           onClick={() => navigate("/products")}
//         >
//           Continue Shopping
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="cart-page">

//       <h1 className="cart-title">
//         Shopping Cart
//       </h1>

//       <div className="cart-container">

//         {/* ======================================
//             LEFT SIDE
//         ====================================== */}

//         <div className="cart-left">

//           {cart.map((item) => {
//             const product = item.product;

//             return (
//               <div
//                 className="cart-card"
//                 key={item._id}
//               >

//                 {/* PRODUCT IMAGE */}

//                 <div className="cart-image">

//                   <img
//                     src={product?.image}
//                     alt={product?.name || "Product"}
//                     onError={(e) => {
//                       e.target.style.display = "none";
//                     }}
//                   />

//                 </div>

//                 {/* PRODUCT DETAILS */}

//                 <div className="cart-details">

//                   <span className="category">
//                     {product?.category}
//                   </span>

//                   <h2>
//                     {product?.name}
//                   </h2>

//                   {/* Rating */}

//                   <div className="rating">

//                     <FaStar />

//                     <span>
//                       {product?.rating || 0}
//                     </span>

//                   </div>

//                   {/* Price */}

//                   <div className="price">

//                     <span className="new-price">
//                       ₹{product?.price || 0}
//                     </span>

//                   </div>

//                   {/* Delivery */}

//                   <div className="delivery">

//                     <FaTruck />

//                     Free Delivery

//                   </div>

//                 </div>

//                 {/* CART ACTIONS */}

//                 <div className="cart-actions">

//                   {/* Quantity */}

//                   <div className="qty-box">

//                     <button
//                       onClick={() =>
//                         decreaseQuantity(item._id)
//                       }
//                     >
//                       <FaMinus />
//                     </button>

//                     <span>
//                       {item.quantity}
//                     </span>

//                     <button
//                       onClick={() =>
//                         increaseQuantity(item._id)
//                       }
//                     >
//                       <FaPlus />
//                     </button>

//                   </div>

//                   {/* ITEM TOTAL */}

//                   <h3>
//                     ₹
//                     {Number(product?.price || 0) *
//                       Number(item.quantity || 0)}
//                   </h3>

//                   {/* REMOVE */}

//                   <button
//                     className="remove-btn"
//                     onClick={() =>
//                       removeFromCart(item._id)
//                     }
//                   >
//                     <FaTrash />

//                     Remove
//                   </button>

//                 </div>

//               </div>
//             );
//           })}

//         </div>

//         {/* ======================================
//             RIGHT SIDE
//         ====================================== */}

//         <div className="cart-right">

//           <div className="summary-card">

//             <h2>
//               Order Summary
//             </h2>

//             {/* ITEMS */}

//             <div className="summary-row">

//               <span>
//                 Items
//               </span>

//               <span>
//                 {cart.reduce(
//                   (total, item) =>
//                     total + Number(item.quantity || 0),
//                   0
//                 )}
//               </span>

//             </div>

//             {/* SUBTOTAL */}

//             <div className="summary-row">

//               <span>
//                 Subtotal
//               </span>

//               <span>
//                 ₹{subtotal}
//               </span>

//             </div>

//             {/* DELIVERY */}

//             <div className="summary-row">

//               <span>
//                 Delivery
//               </span>

//               <span>
//                 {delivery === 0
//                   ? "FREE"
//                   : `₹${delivery}`}
//               </span>

//             </div>

//             {/* GST */}

//             <div className="summary-row">

//               <span>
//                 GST (5%)
//               </span>

//               <span>
//                 ₹{gst}
//               </span>

//             </div>

//             <hr />

//             {/* TOTAL */}

//             <div className="summary-total">

//               <span>
//                 Total
//               </span>

//               <h3>
//                 ₹{total}
//               </h3>

//             </div>

//             {/* COUPON */}

//             <div className="coupon-box">

//               <input
//                 type="text"
//                 placeholder="Enter Coupon Code"
//               />

//               <button>
//                 Apply
//               </button>

//             </div>

//             {/* CHECKOUT */}

//             <button
//               className="checkout-btn"
//               onClick={() =>
//                 navigate("/checkout", {
//                   state: {
//                     cart,
//                     subtotal,
//                     delivery,
//                     gst,
//                     total,
//                   },
//                 })
//               }
//             >
//               Proceed To Checkout
//             </button>

//             {/* CONTINUE SHOPPING */}

//             <button
//               className="continue-btn"
//               onClick={() =>
//                 navigate("/products")
//               }
//             >
//               Continue Shopping
//             </button>

//             {/* SECURE */}

//             <div className="secure-payment">
//               🔒 100% Secure Checkout
//             </div>

//           </div>

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
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  // ==========================================
  // SUBTOTAL
  // ==========================================

  const subtotal = cart.reduce(
    (total, item) =>
      total +
      Number(item.product?.price || 0) *
        Number(item.quantity || 0),
    0
  );

  // ==========================================
  // DELIVERY
  // ==========================================

  const delivery = subtotal > 1000 ? 0 : 99;

  // ==========================================
  // GST
  // ==========================================

  const gst = Math.round(subtotal * 0.05);

  // ==========================================
  // FINAL TOTAL
  // ==========================================

  const total = subtotal + delivery + gst;

  // ==========================================
  // EMPTY CART
  // ==========================================

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
          alt="cart"
        />

        <h1>Your Cart is Empty</h1>

        <p>Add products and start shopping.</p>

        <button
          type="button"
          className="shop-btn"
          onClick={() => {
            console.log("CONTINUE SHOPPING CLICKED");
            navigate("/products");
          }}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page">

      {/* ======================================
          TITLE
      ====================================== */}

      <h1 className="cart-title">
        Shopping Cart
      </h1>

      <div className="cart-container">

        {/* ======================================
            LEFT SIDE
        ====================================== */}

        <div className="cart-left">

          {cart.map((item) => {
            const product = item.product;

            return (
              <div
                className="cart-card"
                key={item._id}
              >

                {/* PRODUCT IMAGE */}

                <div className="cart-image">
                  <img
                    src={product?.image}
                    alt={product?.name || "Product"}
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>

                {/* PRODUCT DETAILS */}

                <div className="cart-details">

                  <span className="category">
                    {product?.category || "Product"}
                  </span>

                  <h2>
                    {product?.name || "Product"}
                  </h2>

                  {/* RATING */}

                  <div className="rating">
                    <FaStar />

                    <span>
                      {product?.rating || 0}
                    </span>
                  </div>

                  {/* PRICE */}

                  <div className="price">
                    <span className="new-price">
                      ₹{product?.price || 0}
                    </span>
                  </div>

                  {/* DELIVERY */}

                  <div className="delivery">
                    <FaTruck />
                    <span>Free Delivery</span>
                  </div>

                </div>

                {/* ======================================
                    CART ACTIONS
                ====================================== */}

                <div className="cart-actions">

                  {/* QUANTITY */}

                  <div className="qty-box">

                    {/* MINUS */}

                    <button
                      type="button"
                      className="qty-btn minus-btn"
                      onClick={() => {
                        console.log(
                          "MINUS CLICKED:",
                          item._id
                        );

                        decreaseQuantity(item._id);
                      }}
                    >
                      <FaMinus />
                    </button>

                    {/* QUANTITY */}

                    <span className="quantity">
                      {item.quantity}
                    </span>

                    {/* PLUS */}

                    <button
                      type="button"
                      className="qty-btn plus-btn"
                      onClick={() => {
                        console.log(
                          "PLUS CLICKED:",
                          item._id
                        );

                        increaseQuantity(item._id);
                      }}
                    >
                      <FaPlus />
                    </button>

                  </div>

                  {/* ITEM TOTAL */}

                  <h3 className="item-total">
                    ₹
                    {Number(product?.price || 0) *
                      Number(item.quantity || 0)}
                  </h3>

                  {/* REMOVE */}

                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => {
                      console.log(
                        "REMOVE CLICKED:",
                        item._id
                      );

                      removeFromCart(item._id);
                    }}
                  >
                    <FaTrash />
                    <span>Remove</span>
                  </button>

                </div>

              </div>
            );
          })}

        </div>

        {/* ======================================
            RIGHT SIDE
        ====================================== */}

        <div className="cart-right">

          <div className="summary-card">

            <h2>
              Order Summary
            </h2>

            {/* ITEMS */}

            <div className="summary-row">
              <span>Items</span>

              <span>
                {cart.reduce(
                  (total, item) =>
                    total + Number(item.quantity || 0),
                  0
                )}
              </span>
            </div>

            {/* SUBTOTAL */}

            <div className="summary-row">
              <span>Subtotal</span>

              <span>
                ₹{subtotal}
              </span>
            </div>

            {/* DELIVERY */}

            <div className="summary-row">
              <span>Delivery</span>

              <span>
                {delivery === 0
                  ? "FREE"
                  : `₹${delivery}`}
              </span>
            </div>

            {/* GST */}

            <div className="summary-row">
              <span>GST (5%)</span>

              <span>
                ₹{gst}
              </span>
            </div>

            <hr />

            {/* TOTAL */}

            <div className="summary-total">
              <span>Total</span>

              <h3>
                ₹{total}
              </h3>
            </div>

            {/* COUPON */}

            <div className="coupon-box">

              <input
                type="text"
                placeholder="Enter Coupon Code"
              />

              <button
                type="button"
                onClick={() => {
                  console.log("COUPON APPLY CLICKED");
                }}
              >
                Apply
              </button>

            </div>

            {/* CHECKOUT */}

            <button
              type="button"
              className="checkout-btn"
              onClick={() => {
                console.log("CHECKOUT CLICKED");

                navigate("/checkout", {
                  state: {
                    cart,
                    subtotal,
                    delivery,
                    gst,
                    total,
                  },
                });
              }}
            >
              Proceed To Checkout
            </button>

            {/* CONTINUE SHOPPING */}

            <button
              type="button"
              className="continue-btn"
              onClick={() => {
                console.log("CONTINUE SHOPPING CLICKED");

                navigate("/products");
              }}
            >
              Continue Shopping
            </button>

            {/* SECURE PAYMENT */}

            <div className="secure-payment">
              🔒 100% Secure Checkout
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Cart;