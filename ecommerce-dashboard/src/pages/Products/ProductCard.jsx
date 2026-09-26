// import { useContext } from "react";
// import { useNavigate } from "react-router-dom";

// import {
//   FaShoppingCart,
//   FaHeart,
//   FaStar,
// } from "react-icons/fa";

// import { CartContext } from "../../context/CartContext";
// import { WishlistContext } from "../../context/WishlistContext";

// function ProductCard({ item }) {
//   const navigate = useNavigate();

//   const { addToCart } = useContext(CartContext);

//   const {
//     wishlist = [],
//     addToWishlist,
//     removeFromWishlist,
//   } = useContext(WishlistContext);


//   // =========================
//   // CHECK WISHLIST
//   // =========================

//   const isWishlist = wishlist.some(
//     (product) => product.id === item.id
//   );


//   // =========================
//   // PRODUCT DETAILS
//   // =========================

//   const openProductDetails = () => {
//     navigate(`/product/${item.id}`);
//   };


//   // =========================
//   // WISHLIST
//   // =========================

//   const handleWishlist = (e) => {
//     e.stopPropagation();

//     if (isWishlist) {
//       removeFromWishlist(item.id);
//     } else {
//       addToWishlist(item);
//     }
//   };


//   // =========================
//   // ADD TO CART
//   // =========================

//   const handleAddToCart = (e) => {
//     e.stopPropagation();

//     addToCart(item);
//   };


//   return (
//     <div
//       className="product-card"
//       onClick={openProductDetails}
//     >

//       {/* =========================
//           PRODUCT IMAGE
//       ========================= */}

//       <div className="product-image">

//         <img
//           src={item.image}
//           alt={item.name || "Product"}
//           onError={(e) => {
//             e.target.style.display = "none";
//           }}
//         />


//         {/* DISCOUNT */}

//         {item.oldPrice > item.price && (
//           <span className="discount">

//             {Math.round(
//               ((item.oldPrice - item.price) /
//                 item.oldPrice) *
//                 100
//             )}

//             % OFF

//           </span>
//         )}


//         {/* WISHLIST */}

//         <div className="product-icons">

//           <button
//             type="button"
//             aria-label={
//               isWishlist
//                 ? "Remove from wishlist"
//                 : "Add to wishlist"
//             }
//             onClick={handleWishlist}
//           >

//             <FaHeart
//               color={
//                 isWishlist
//                   ? "red"
//                   : "currentColor"
//               }
//             />

//           </button>

//         </div>

//       </div>


//       {/* =========================
//           PRODUCT INFORMATION
//       ========================= */}

//       <div className="product-info">


//         {/* CATEGORY */}

//         <span className="category">
//           {item.category}
//         </span>


//         {/* PRODUCT NAME */}

//         <h3>
//           {item.name}
//         </h3>


//         {/* =========================
//             RATING
//         ========================= */}

//         <div className="rating">

//           <FaStar />
//           <FaStar />
//           <FaStar />
//           <FaStar />
//           <FaStar />

//           <span>
//             ({item.rating || 0})
//           </span>

//         </div>


//         {/* =========================
//             PRICE
//         ========================= */}

//         <div className="price">

//           <span className="new-price">
//             ₹{item.price}
//           </span>


//           {item.oldPrice > item.price && (
//             <span className="old-price">
//               ₹{item.oldPrice}
//             </span>
//           )}

//         </div>


//         {/* =========================
//             ADD TO CART
//         ========================= */}

//         <button
//           type="button"
//           className="cart-btn"
//           onClick={handleAddToCart}
//         >

//           <FaShoppingCart />

//           <span>
//             Add To Cart
//           </span>

//         </button>

//       </div>

//     </div>
//   );
// }

// export default ProductCard;

// // 

import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaShoppingCart,
  FaHeart,
  FaStar,
} from "react-icons/fa";

import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";

function ProductCard({ item }) {
  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);

  const {
    wishlist = [],
    addToWishlist,
    removeFromWishlist,
  } = useContext(WishlistContext);

  // =========================
  // CHECK WISHLIST
  // =========================

  const isWishlist = wishlist.some(
    (product) => product.id === item.id
  );

  // =========================
  // PRODUCT DETAILS
  // =========================

  const openProductDetails = () => {
    navigate(`/product/${item.id}`);
  };

  // =========================
  // WISHLIST
  // =========================

  const handleWishlist = (e) => {
    e.stopPropagation();

    if (isWishlist) {
      removeFromWishlist(item.id);
    } else {
      addToWishlist(item);
    }
  };

  // =========================
  // ADD TO CART
  // =========================

  const handleAddToCart = (e) => {
    e.stopPropagation();

    addToCart(item);
  };

  return (
    <div
      className="product-card"
      onClick={openProductDetails}
    >
      {/* =========================
          PRODUCT IMAGE
      ========================= */}

      <div className="product-image">
        <img
          src={item.image}
          alt={item.name || "Product"}
          loading="lazy"
          decoding="async"
          width="300"
          height="300"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />

        {/* DISCOUNT */}

        {item.oldPrice > item.price && (
          <span className="discount">
            {Math.round(
              ((item.oldPrice - item.price) /
                item.oldPrice) *
                100
            )}
            % OFF
          </span>
        )}

        {/* WISHLIST */}

        <div className="product-icons">
          <button
            type="button"
            aria-label={
              isWishlist
                ? "Remove from wishlist"
                : "Add to wishlist"
            }
            onClick={handleWishlist}
          >
            <FaHeart
              color={
                isWishlist
                  ? "red"
                  : "currentColor"
              }
            />
          </button>
        </div>
      </div>

      {/* =========================
          PRODUCT INFORMATION
      ========================= */}

      <div className="product-info">

        {/* CATEGORY */}

        <span className="category">
          {item.category}
        </span>

        {/* PRODUCT NAME */}

        <h3>{item.name}</h3>

        {/* RATING */}

        <div className="rating">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />

          <span>
            ({item.rating || 0})
          </span>
        </div>

        {/* PRICE */}

        <div className="price">
          <span className="new-price">
            ₹{item.price}
          </span>

          {item.oldPrice > item.price && (
            <span className="old-price">
              ₹{item.oldPrice}
            </span>
          )}
        </div>

        {/* ADD TO CART */}

        <button
          type="button"
          className="cart-btn"
          onClick={handleAddToCart}
        >
          <FaShoppingCart />

          <span>
            Add To Cart
          </span>
        </button>

      </div>
    </div>
  );
}

export default ProductCard;