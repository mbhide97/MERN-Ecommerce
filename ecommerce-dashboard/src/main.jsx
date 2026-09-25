// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// import App from "./App";
// import './style/theme.css'
// import CartProvider from "./context/CartContext";
// import WishlistProvider from "./context/WishlistContext";
// import ThemeProvider from "./context/ThemeContext";
 
// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <ThemeProvider>
//         <CartProvider>
//           <WishlistProvider>
//             <App />
//           </WishlistProvider>
//         </CartProvider>
//       </ThemeProvider>
//     </BrowserRouter>
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App";
import "./style/theme.css";
import CartProvider from "./context/CartContext";
import WishlistProvider from "./context/WishlistContext";
import ThemeProvider from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="1084592556528-v5fbas5v7u2u50qd6l2gjf3lkh9hb0hm.apps.googleusercontent.com">
      <BrowserRouter>
        <ThemeProvider>
          <CartProvider>
            <WishlistProvider>
              <App />
            </WishlistProvider>
          </CartProvider>
        </ThemeProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);