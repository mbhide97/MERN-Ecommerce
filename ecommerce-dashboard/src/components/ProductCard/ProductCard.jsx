import "./ProductCard.css";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

import {
  FaHeart,
  FaShoppingCart,
  FaEye,
  FaStar,
} from "react-icons/fa";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="product-card">
      <div className="product-image">
        <img
          src={product.image}
          alt={product.name}
        />

        <span className="discount">
          20% OFF
        </span>

        <div className="product-icons">
          <button>
            <FaHeart />
          </button>

          <button>
            <FaEye />
          </button>
        </div>
      </div>

      <div className="product-info">
        <h3>{product.name}</h3>

        <div className="rating">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />

          <span>({product.rating})</span>
        </div>

        <div className="price">
          <span className="new-price">
            ₹{product.price}
          </span>

          <span className="old-price">
            ₹{product.oldPrice}
          </span>
        </div>

        <button
          className="cart-btn"
          onClick={() => addToCart(product)}
        >
          <FaShoppingCart />
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;