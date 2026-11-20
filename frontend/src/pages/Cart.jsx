import React from "react";
import { useCart } from "../context/CartContext";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
function Cart() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeCart,
    clearCart
  } = useCart();

  let navigate=useNavigate()

  const totalPrice = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">

      <h1>Shopping Cart</h1>

      {cart.length === 0 ? (

        <div className="cart-empty">
          <h2>Your Cart is Empty</h2>
        </div>

      ) : (

        <div>

          <div className="cart-list">

            {cart.map((item) => (

              <div
                key={item._id}
                className="cart-item"
              >

                <img
                  src={item.image}
                  alt={item.name}
                />

                <div className="cart-item-info">

                  <h3>{item.name}</h3>

                  <p className="cart-item-price">
                    ₹{item.price}
                  </p>

                </div>

                <div className="quantity-section">

                  <button
                    className="quantity-btn"
                    onClick={() =>
                      decreaseQuantity(item._id)
                    }
                  >
                    -
                  </button>

                  <span className="quantity-number">
                    {item.quantity}
                  </span>

                  <button
                    className="quantity-btn"
                    onClick={() =>
                      increaseQuantity(item._id)
                    }
                  >
                    +
                  </button>

                </div>
                
                <h4>₹{item.price * item.quantity}</h4>


                <button
                  className="remove-btn"
                  onClick={() =>
                    removeCart(item._id)
                  }
                >
                  Remove
                </button>

              </div>

            ))}

          </div>

          <div className="cart-summary">

            <h2>
              Total: ₹{totalPrice}
            </h2>

            <button
              className="clear-cart-btn"
              onClick={clearCart}
            >
              Clear Cart
            </button>

            <button
              className="checkout-cart-btn"
              onClick={()=>navigate('/checkout')}
            >
             Proceed to Checkout
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default Cart;