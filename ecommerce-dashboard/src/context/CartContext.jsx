 


// import {
//   createContext,
//   useState,
//   useEffect,
// } from "react";

// import API from "../services/api";

// export const CartContext = createContext();

// function CartProvider({ children }) {
//   const [cart, setCart] = useState([]);

//   // ==========================================
//   // GET CART FROM DATABASE
//   // ==========================================

//   const fetchCart = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         setCart([]);
//         return;
//       }

//       const response = await API.get("/cart", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const cartData = response.data.cart || [];

//       setCart(cartData);

//       console.log("🛒 Cart Loaded:", cartData);
//     } catch (error) {
//       console.error("❌ Error fetching cart:", error);
//     }
//   };

//   // ==========================================
//   // LOAD CART
//   // ==========================================

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   // ==========================================
//   // ADD PRODUCT TO CART
//   // ==========================================

//   const addToCart = async (product) => {
//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         alert("Please login first");
//         return;
//       }

//       const response = await API.post(
//         "/cart",
//         {
//           productId: product.id,
//           quantity: 1,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log("✅ Product Added:", response.data);

//       await fetchCart();

//       alert("Product added to cart 🛒");
//     } catch (error) {
//       console.error("❌ Add to cart error:", error);

//       alert(
//         error.response?.data?.message ||
//           "Failed to add product to cart"
//       );
//     }
//   };

//   // ==========================================
//   // REMOVE PRODUCT
//   // ==========================================

//   const removeFromCart = async (id) => {
//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         return;
//       }

//       await API.delete(`/cart/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       await fetchCart();
//     } catch (error) {
//       console.error("❌ Remove cart error:", error);
//     }
//   };

//   // ==========================================
//   // INCREASE QUANTITY
//   // ==========================================

//   const increaseQuantity = async (id) => {
//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         return;
//       }

//       await API.put(
//         `/cart/increase/${id}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       await fetchCart();
//     } catch (error) {
//       console.error(
//         "❌ Increase quantity error:",
//         error
//       );
//     }
//   };

//   // ==========================================
//   // DECREASE QUANTITY
//   // ==========================================

//   const decreaseQuantity = async (id) => {
//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         return;
//       }

//       await API.put(
//         `/cart/decrease/${id}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       await fetchCart();
//     } catch (error) {
//       console.error(
//         "❌ Decrease quantity error:",
//         error
//       );
//     }
//   };

//   // ==========================================
//   // CLEAR CART
//   // ==========================================

//   const clearCart = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         return;
//       }

//       await API.delete("/cart", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setCart([]);
//     } catch (error) {
//       console.error("❌ Clear cart error:", error);
//     }
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         addToCart,
//         removeFromCart,
//         increaseQuantity,
//         decreaseQuantity,
//         clearCart,
//         fetchCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// export default CartProvider;




import {
  createContext,
  useState,
  useEffect,
} from "react";

import API from "../services/api";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // ==========================================
  // GET CART FROM DATABASE
  // ==========================================

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setCart([]);
        return;
      }

      const response = await API.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("🛒 GET CART RESPONSE:", response.data);

      const cartData = response.data?.cart || [];

      setCart(cartData);

      console.log("🛒 CART DATA:", cartData);
    } catch (error) {
      console.error(
        "❌ FETCH CART ERROR:",
        error.response?.data || error.message
      );

      setCart([]);
    }
  };

  // ==========================================
  // LOAD CART
  // ==========================================

  useEffect(() => {
    fetchCart();
  }, []);

  // ==========================================
  // ADD PRODUCT TO CART
  // ==========================================

  const addToCart = async (product) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      console.log("➕ ADD PRODUCT:", product);

      const productId =
        product?._id || product?.id;

      if (!productId) {
        console.error("❌ Product ID not found:", product);
        alert("Product ID not found");
        return;
      }

      const response = await API.post(
        "/cart",
        {
          productId: productId,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "✅ PRODUCT ADDED:",
        response.data
      );

      await fetchCart();

      alert("Product added to cart 🛒");
    } catch (error) {
      console.error(
        "❌ ADD TO CART ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to add product to cart"
      );
    }
  };

  // ==========================================
  // REMOVE PRODUCT
  // ==========================================

  const removeFromCart = async (cartId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      console.log(
        "🗑️ REMOVE CART ID:",
        cartId
      );

      if (!cartId) {
        console.error("❌ Cart ID missing");
        return;
      }

      const response = await API.delete(
        `/cart/${cartId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "✅ REMOVE RESPONSE:",
        response.data
      );

      await fetchCart();
    } catch (error) {
      console.error(
        "❌ REMOVE CART ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to remove product"
      );
    }
  };

  // ==========================================
  // INCREASE QUANTITY
  // ==========================================

  const increaseQuantity = async (cartId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      console.log(
        "➕ INCREASE CART ID:",
        cartId
      );

      if (!cartId) {
        console.error("❌ Cart ID missing");
        return;
      }

      const response = await API.put(
        `/cart/increase/${cartId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "✅ INCREASE RESPONSE:",
        response.data
      );

      await fetchCart();
    } catch (error) {
      console.error(
        "❌ INCREASE QUANTITY ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to increase quantity"
      );
    }
  };

  // ==========================================
  // DECREASE QUANTITY
  // ==========================================

  const decreaseQuantity = async (cartId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      console.log(
        "➖ DECREASE CART ID:",
        cartId
      );

      if (!cartId) {
        console.error("❌ Cart ID missing");
        return;
      }

      const response = await API.put(
        `/cart/decrease/${cartId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "✅ DECREASE RESPONSE:",
        response.data
      );

      await fetchCart();
    } catch (error) {
      console.error(
        "❌ DECREASE QUANTITY ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to decrease quantity"
      );
    }
  };

  // ==========================================
  // CLEAR CART
  // ==========================================

  const clearCart = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      const response = await API.delete(
        "/cart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "✅ CLEAR CART RESPONSE:",
        response.data
      );

      setCart([]);
    } catch (error) {
      console.error(
        "❌ CLEAR CART ERROR:",
        error.response?.data || error.message
      );
    }
  };

  // ==========================================
  // CONTEXT
  // ==========================================

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
 
