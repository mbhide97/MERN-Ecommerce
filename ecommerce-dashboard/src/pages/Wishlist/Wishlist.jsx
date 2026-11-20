
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaHeart,
  FaShoppingCart,
  FaTrash,
} from "react-icons/fa";

import { WishlistContext } from "../../context/WishlistContext";
import { CartContext } from "../../context/CartContext";

import "./Wishlist.css";


function Wishlist() {

  const navigate = useNavigate();

  const {
    wishlist = [],
    removeFromWishlist,
  } = useContext(WishlistContext);

  const { addToCart } =
    useContext(CartContext);


  /* =========================
     ADD TO CART
  ========================= */

  const handleAddToCart = (item) => {

    addToCart(item);

  };


  /* =========================
     PRODUCT DETAILS
  ========================= */

  const handleProductClick = (id) => {

    navigate(`/product/${id}`);

  };


  /* =========================
     EMPTY WISHLIST
  ========================= */

  if (wishlist.length === 0) {

    return (
      <section className="wishlist-page">

        <div className="wishlist-empty">

          <div className="empty-heart">

            <FaHeart />

          </div>

          <h1>
            Your Wishlist is Empty
          </h1>

          <p>
            Save your favourite products
            here and shop them anytime.
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/products")
            }
          >
            Explore Products
          </button>

        </div>

      </section>
    );

  }


  return (

    <section className="wishlist-page">

      <div className="wishlist-container">


        {/* =====================
            HEADER
        ===================== */}

        <div className="wishlist-header">

          <div>

            <span>
              YOUR FAVOURITES
            </span>

            <h1>
              My Wishlist
            </h1>

            <p>
              {wishlist.length}{" "}
              {wishlist.length === 1
                ? "Product"
                : "Products"}{" "}
              saved
            </p>

          </div>

          <FaHeart className="wishlist-header-icon" />

        </div>


        {/* =====================
            PRODUCTS
        ===================== */}

        <div className="wishlist-grid">

          {wishlist.map((item) => (

            <div
              className="wishlist-card"
              key={item.id}
            >

              {/* Remove */}

              <button
                type="button"
                className="remove-wishlist"
                onClick={() =>
                  removeFromWishlist(
                    item.id
                  )
                }
                aria-label="Remove from wishlist"
              >

                <FaTrash />

              </button>


              {/* Image */}

              <div
                className="wishlist-image"
                onClick={() =>
                  handleProductClick(
                    item.id
                  )
                }
              >

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


              {/* Info */}

              <div className="wishlist-info">

                <span className="wishlist-category">

                  {item.category ||
                    "Product"}

                </span>


                <h3
                  onClick={() =>
                    handleProductClick(
                      item.id
                    )
                  }
                >

                  {item.name ||
                    item.title ||
                    "Product"}

                </h3>


                <div className="wishlist-price">

                  <span>
                    ₹
                    {Number(
                      item.price || 0
                    )}
                  </span>

                </div>


                {/* Cart */}

                <button
                  type="button"
                  className="wishlist-cart-btn"
                  onClick={() =>
                    handleAddToCart(item)
                  }
                >

                  <FaShoppingCart />

                  Add To Cart

                </button>

              </div>

            </div>

          ))}

        </div>


        {/* Continue Shopping */}

        <div className="wishlist-bottom">

          <button
            type="button"
            onClick={() =>
              navigate("/products")
            }
          >
            Continue Shopping
          </button>

        </div>

      </div>

    </section>

  );

}


export default Wishlist;

