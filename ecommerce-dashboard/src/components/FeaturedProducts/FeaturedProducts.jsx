// import { useContext } from "react";
// import "./FeaturedProducts.css";
// import { CartContext } from "../../context/CartContext";
// import {
//   FaHeart,
//   FaShoppingCart,
//   FaStar,
// } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// function FeaturedProducts() {
//   const { addToCart } = useContext(CartContext);
//   const navigate = useNavigate();

//   const products = [
//     {
//       id: 1,
//       name: "Men Premium Hoodie",
//       category: "Fashion",
//       price: 2499,
//       oldPrice: 3499,
//       discount: "30% OFF",
//       rating: 4.8,
//       reviews: 124,
//       stock: true,
//       image: "/products/men product.jpg",
//     },
//     {
//       id: 2,
//       name: "Wireless Headphones",
//       category: "Electronics",
//       price: 5999,
//       oldPrice: 7999,
//       discount: "25% OFF",
//       rating: 4.7,
//       reviews: 98,
//       stock: true,
//       image: "/products/electronic1.jpg",
//     },
//     {
//       id: 3,
//       name: "Running Sneakers",
//       category: "Shoes",
//       price: 3999,
//       oldPrice: 5499,
//       discount: "27% OFF",
//       rating: 4.9,
//       reviews: 210,
//       stock: true,
//       image: "/products/sneaker1.jpg",
//     },
//     {
//       id: 4,
//       name: "Women's Casual Dress",
//       category: "Women",
//       price: 1999,
//       oldPrice: 2999,
//       discount: "33% OFF",
//       rating: 4.6,
//       reviews: 85,
//       stock: false,
//       image: "/products/women product.jpg",
//     },
//   ];

//   return (
//     <section className="featured-section">

//       <div className="section-title">
//         <span>OUR COLLECTION</span>
//         <h2>Featured Products</h2>
//         <p>
//           Discover our most loved products carefully selected
//           for quality, style and performance.
//         </p>
//       </div>

//       <div className="product-grid">

//         {products.map((item) => (

//           <div
//             key={item.id}
//             className="product-card"
//             onClick={() => navigate(`/product/${item.id}`)}
//           >

//             <span className="discount-badge">
//               {item.discount}
//             </span>

//             <button
//               className="wishlist-btn"
//               onClick={(e) => {
//                 e.stopPropagation();
//               }}
//             >
//               <FaHeart />
//             </button>

//             <div className="image-box">
//               <img
//                 src={item.image}
//                 alt={item.name}
//               />
//             </div>

//             <div className="product-info">

//               <span className="category">
//                 {item.category}
//               </span>

//               <h3>{item.name}</h3>

//               <div className="rating">

//                 <FaStar />
//                 <FaStar />
//                 <FaStar />
//                 <FaStar />
//                 <FaStar />

//                 <span>
//                   ({item.reviews})
//                 </span>

//               </div>

//               <div className="price-box">

//                 <span className="new-price">
//                   ₹{item.price}
//                 </span>

//                 <span className="old-price">
//                   ₹{item.oldPrice}
//                 </span>

//               </div>

//               <div className="stock">

//                 {item.stock ? (
//                   <span className="in-stock">
//                     🟢 In Stock
//                   </span>
//                 ) : (
//                   <span className="out-stock">
//                     🔴 Out Of Stock
//                   </span>
//                 )}

//               </div>

//               <button
//                 className="cart-btn"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   addToCart(item);
//                 }}
//               >
//                 <FaShoppingCart />

//                 <span>
//                   Add To Cart
//                 </span>

//               </button>

//             </div>

//           </div>

//         ))}

//       </div>

//     </section>
//   );
// }

// export default FeaturedProducts;

 
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaHeart,
  FaShoppingCart,
  FaStar,
} from "react-icons/fa";

import API from "../../services/api";

import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";

import "./FeaturedProducts.css";

function FeaturedProducts() {
  const navigate = useNavigate();

  const { addToCart } =
    useContext(CartContext);

  const {
    wishlist = [],
    addToWishlist,
    removeFromWishlist,
  } = useContext(WishlistContext);

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  // =========================
  // FETCH PRODUCTS
  // =========================

  useEffect(() => {
    const fetchFeaturedProducts =
      async () => {
        try {
          const response =
            await API.get("/products");

          const productData =
            Array.isArray(response.data)
              ? response.data
              : response.data.products || [];


          // Take first 4 products
          // from MongoDB

          const featured =
            productData
              .slice(0, 4)
              .map((item) => ({
                id:
                  item._id ||
                  item.id,

                name:
                  item.name ||
                  "Product",

                category:
                  item.category ||
                  "Other",

                price:
                  Number(item.price) ||
                  0,

                oldPrice:
                  Number(item.oldPrice) ||
                  Number(item.price) ||
                  0,

                rating:
                  Number(item.rating) ||
                  0,

                reviews:
                  Number(item.reviews) ||
                  0,

                stock:
                  Number(item.stock) > 0,

                image:
                  item.image ||
                  "",
              }));


          setProducts(featured);

        } catch (error) {

          console.error(
            "Featured Products Error:",
            error
          );

        } finally {

          setLoading(false);

        }
      };

    fetchFeaturedProducts();

  }, []);


  // =========================
  // WISHLIST CHECK
  // =========================

  const isWishlist = (id) => {
    return wishlist.some(
      (item) => item.id === id
    );
  };


  // =========================
  // WISHLIST HANDLER
  // =========================

  const handleWishlist = (
    e,
    item
  ) => {
    e.stopPropagation();

    if (isWishlist(item.id)) {

      removeFromWishlist(item.id);

    } else {

      addToWishlist(item);

    }
  };


  // =========================
  // ADD TO CART
  // =========================

  const handleCart = (
    e,
    item
  ) => {
    e.stopPropagation();

    addToCart(item);
  };


  // =========================
  // PRODUCT DETAILS
  // =========================

  const handleProductClick = (
    id
  ) => {
    navigate(`/product/${id}`);
  };


  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <section className="featured-section">

        <div className="section-title">

          <span>
            OUR COLLECTION
          </span>

          <h2>
            Featured Products
          </h2>

          <p>
            Discover our most loved products
            carefully selected for quality,
            style and performance.
          </p>

        </div>

        <h3 className="featured-loading">
          Loading Products...
        </h3>

      </section>
    );
  }


  // =========================
  // UI
  // =========================

  return (
    <section className="featured-section">

      {/* =========================
          SECTION TITLE
      ========================= */}

      <div className="section-title">

        <span>
          OUR COLLECTION
        </span>

        <h2>
          Featured Products
        </h2>

        <p>
          Discover our most loved products
          carefully selected for quality,
          style and performance.
        </p>

      </div>


      {/* =========================
          PRODUCT GRID
      ========================= */}

      <div className="product-grid">

        {products.map((item) => (

          <div
            key={item.id}
            className="product-card"
            onClick={() =>
              handleProductClick(item.id)
            }
          >

            {/* DISCOUNT */}

            {item.oldPrice > item.price && (
              <span className="discount-badge">

                {Math.round(
                  (
                    (item.oldPrice -
                      item.price) /
                    item.oldPrice
                  ) * 100
                )}

                % OFF

              </span>
            )}


            {/* WISHLIST */}

            <button
              type="button"
              className="wishlist-btn"
              onClick={(e) =>
                handleWishlist(e, item)
              }
            >

              <FaHeart
                color={
                  isWishlist(item.id)
                    ? "red"
                    : "currentColor"
                }
              />

            </button>


            {/* IMAGE */}

            <div className="image-box">

              <img
                src={item.image}
                alt={
                  item.name ||
                  "Product"
                }

                onError={(e) => {
                  e.target.style.display =
                    "none";
                }}
              />

            </div>


            {/* PRODUCT INFO */}

            <div className="product-info">

              {/* CATEGORY */}

              <span className="category">
                {item.category}
              </span>


              {/* NAME */}

              <h3>
                {item.name}
              </h3>


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

              <div className="price-box">

                <span className="new-price">
                  ₹{item.price}
                </span>

                {item.oldPrice >
                  item.price && (
                  <span className="old-price">
                    ₹{item.oldPrice}
                  </span>
                )}

              </div>


              {/* STOCK */}

              <div className="stock">

                {item.stock ? (

                  <span className="in-stock">
                    🟢 In Stock
                  </span>

                ) : (

                  <span className="out-stock">
                    🔴 Out Of Stock
                  </span>

                )}

              </div>


              {/* CART */}

              <button
                type="button"
                className="cart-btn"
                onClick={(e) =>
                  handleCart(e, item)
                }
              >

                <FaShoppingCart />

                <span>
                  Add To Cart
                </span>

              </button>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default FeaturedProducts;
