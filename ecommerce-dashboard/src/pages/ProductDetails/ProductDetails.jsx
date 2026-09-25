 


// import { useEffect, useState, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   FaStar,
//   FaHeart,
//   FaShoppingCart,
// } from "react-icons/fa";

// import API from "../../services/api";
// import { CartContext } from "../../context/CartContext";
// import { WishlistContext } from "../../context/WishlistContext";
// import RelatedProducts from "../../components/RelatedProducts/RelatedProducts";

// import "./ProductDetails.css";

// function ProductDetails() {

//   const { id } = useParams();

//   const navigate = useNavigate();

//   const { addToCart } = useContext(CartContext);

//   const {
//     wishlist,
//     addToWishlist,
//     removeFromWishlist,
//   } = useContext(WishlistContext);

//   const [product, setProduct] = useState(null);

//   const [loading, setLoading] = useState(true);

//   const [quantity, setQuantity] = useState(1);

//   useEffect(() => {

//     API.get(`/products/${id}`)
//       .then((res) => {

//         setProduct({

//           id: res.data.id,

//           title: res.data.title,

//           name: res.data.title,

//           image: res.data.image,

//           description: res.data.description,

//           category: res.data.category,

//           rating: res.data.rating.rate,

//           price: Math.round(res.data.price * 85),

//           oldPrice: Math.round(res.data.price * 100),

//         });

//         setLoading(false);

//       })
//       .catch((err) => {

//         console.log(err);

//         setLoading(false);

//       });

//   }, [id]);

//   if (loading) {

//     return <h2>Loading...</h2>;

//   }

//   if (!product) {

//     return <h2>Product Not Found</h2>;

//   }

//   const isWishlist = wishlist.find(
//     (item) => item.id === product.id
//   );

//   return (

//     <section className="details-page">

//       <div className="details-container">

//         {/* IMAGE */}

//         <div className="details-image">

//           <img
//             src={product.image}
//             alt={product.title}
//           />

//         </div>

//         {/* INFO */}

//         <div className="details-info">

//           <span className="category">
//             {product.category}
//           </span>

//           <h1>{product.title}</h1>

//           <div className="rating">

//             <FaStar />
//             <FaStar />
//             <FaStar />
//             <FaStar />
//             <FaStar />

//             <span>
//               ({product.rating})
//             </span>

//           </div>

//           <div className="price">

//             <span className="new-price">
//               ₹{product.price}
//             </span>

//             <span className="old-price">
//               ₹{product.oldPrice}
//             </span>

//           </div>

//           <p className="description">
//             {product.description}
//           </p>

//           {/* QUANTITY */}

//           <div className="quantity">

//             <button
//               onClick={() =>
//                 quantity > 1 &&
//                 setQuantity(quantity - 1)
//               }
//             >
//               -
//             </button>

//             <span>{quantity}</span>

//             <button
//               onClick={() =>
//                 setQuantity(quantity + 1)
//               }
//             >
//               +
//             </button>

//           </div>

//           {/* ADD TO CART */}

//           <button
//             className="cart-btn"
//             onClick={() =>
//               addToCart({
//                 ...product,
//                 quantity,
//               })
//             }
//           >

//             <FaShoppingCart />

//             Add To Cart

//           </button>

//           {/* BUY NOW */}

//           <button
//             className="buy-btn"
//             onClick={() =>
//               navigate("/checkout", {
//                 state: {
//                   product,
//                   quantity,
//                 },
//               })
//             }
//           >

//             Buy Now

//           </button>

//           {/* WISHLIST */}

//           <button
//             className="wish-btn"
//             onClick={() => {

//               if (isWishlist) {

//                 removeFromWishlist(product.id);

//               } else {

//                 addToWishlist(product);

//               }

//             }}
//           >

//             <FaHeart />

//             {isWishlist
//               ? " Remove Wishlist"
//               : " Add Wishlist"}

//           </button>

//         </div>

//       </div>

//       {/* RELATED PRODUCTS */}

//       <RelatedProducts
//         category={product.category}
//         currentId={product.id}
//       />

//     </section>

//   );

// }

// export default ProductDetails;

 
import {
  useEffect,
  useState,
  useContext,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  FaStar,
  FaHeart,
  FaShoppingCart,
} from "react-icons/fa";

import API from "../../services/api";

import { CartContext } from "../../context/CartContext";

import { WishlistContext } from "../../context/WishlistContext";

import RelatedProducts from "../../components/RelatedProducts/RelatedProducts";

import "./ProductDetails.css";


function ProductDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const { addToCart } =
    useContext(CartContext);


  const {
    wishlist = [],
    addToWishlist,
    removeFromWishlist,
  } = useContext(WishlistContext);


  const [product, setProduct] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [quantity, setQuantity] =
    useState(1);


  /* =========================
     FETCH PRODUCT
  ========================= */

  useEffect(() => {

    const fetchProduct = async () => {

      try {

        setLoading(true);

        console.log(
          "Fetching Product ID:",
          id
        );


        const response =
          await API.get(
            `/products/${id}`
          );


        console.log(
          "Product Details Response:",
          response.data
        );


        /*
          Backend कधी direct product
          return करू शकतो:

          response.data

          किंवा:

          response.data.product
        */

        const item =
          response.data.product ||
          response.data;


        if (!item) {

          setProduct(null);

          return;
        }


        const productData = {

          id:
            item._id ||
            item.id,

          name:
            item.name ||
            item.title ||
            "Product",

          title:
            item.name ||
            item.title ||
            "Product",

          image:
            item.image ||
            item.imageUrl ||
            "",

          description:
            item.description ||
            "No description available.",

          category:
            item.category ||
            "Other",

          price:
            Number(item.price) ||
            0,

          /*
            MongoDB model मध्ये oldPrice नाही,
            त्यामुळे सध्या original price दाखवतो.
          */

          oldPrice:
            Number(item.oldPrice) ||
            Number(item.price) ||
            0,

          rating:
            Number(item.rating) ||
            0,

          stock:
            Number(item.stock) ||
            0,
        };


        console.log(
          "Formatted Product:",
          productData
        );


        setProduct(productData);

      } catch (error) {

        console.error(
          "Product Details Error:",
          error
        );

        setProduct(null);

      } finally {

        setLoading(false);

      }

    };


    fetchProduct();

  }, [id]);


  /* =========================
     LOADING
  ========================= */

  if (loading) {

    return (
      <div className="product-details-message">

        <h2>
          Loading Product...
        </h2>

      </div>
    );

  }


  /* =========================
     NOT FOUND
  ========================= */

  if (!product) {

    return (
      <div className="product-details-message">

        <h2>
          Product Not Found
        </h2>

        <button
          className="back-products-btn"
          onClick={() =>
            navigate("/products")
          }
        >
          Back To Products
        </button>

      </div>
    );

  }


  /* =========================
     WISHLIST
  ========================= */

  const isWishlist =
    wishlist.some(
      (item) =>
        item.id === product.id
    );


  /* =========================
     ADD TO CART
  ========================= */

  const handleAddToCart = () => {

    addToCart({
      ...product,
      quantity,
    });

  };


  /* =========================
     BUY NOW
  ========================= */

  const handleBuyNow = () => {

    navigate("/checkout", {

      state: {
        product,
        quantity,
      },

    });

  };


  /* =========================
     WISHLIST
  ========================= */

  const handleWishlist = () => {

    if (isWishlist) {

      removeFromWishlist(
        product.id
      );

    } else {

      addToWishlist(product);

    }

  };


  return (

    <section className="details-page">

      <div className="details-container">


        {/* =====================
            PRODUCT IMAGE
        ===================== */}

        <div className="details-image">

          <img
            src={product.image}
            alt={product.name}
            onError={(e) => {

              e.target.style.display =
                "none";

            }}
          />

        </div>


        {/* =====================
            PRODUCT INFORMATION
        ===================== */}

        <div className="details-info">


          <span className="category">

            {product.category}

          </span>


          <h1>

            {product.name}

          </h1>


          {/* Rating */}

          <div className="rating">

            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />

            <span>

              (
              {product.rating || 0}
              )

            </span>

          </div>


          {/* Price */}

          <div className="price">

            <span className="new-price">

              ₹{product.price}

            </span>


            {product.oldPrice >
              product.price && (

              <span className="old-price">

                ₹{product.oldPrice}

              </span>

            )}

          </div>


          {/* Description */}

          <p className="description">

            {product.description}

          </p>


          {/* Stock */}

          <div className="product-stock">

            {product.stock > 0 ? (

              <span className="in-stock">

                🟢 In Stock

              </span>

            ) : (

              <span className="out-stock">

                🔴 Out Of Stock

              </span>

            )}

          </div>


          {/* Quantity */}

          <div className="quantity">

            <button
              type="button"
              onClick={() => {

                if (quantity > 1) {

                  setQuantity(
                    quantity - 1
                  );

                }

              }}
            >
              -
            </button>


            <span>

              {quantity}

            </span>


            <button
              type="button"
              onClick={() =>
                setQuantity(
                  quantity + 1
                )
              }
            >
              +
            </button>

          </div>


          {/* Add To Cart */}

          <button
            type="button"
            className="cart-btn"
            onClick={handleAddToCart}
          >

            <FaShoppingCart />

            Add To Cart

          </button>


          {/* Buy Now */}

          <button
            type="button"
            className="buy-btn"
            onClick={handleBuyNow}
          >

            Buy Now

          </button>


          {/* Wishlist */}

          <button
            type="button"
            className="wish-btn"
            onClick={handleWishlist}
          >

            <FaHeart />

            {isWishlist
              ? " Remove Wishlist"
              : " Add Wishlist"}

          </button>


        </div>

      </div>


      {/* =====================
          RELATED PRODUCTS
      ===================== */}

      <RelatedProducts
        category={product.category}
        currentId={product.id}
      />

    </section>

  );

}


export default ProductDetails;
 
