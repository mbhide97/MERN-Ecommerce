
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Products from "../pages/Products/Products";
import Cart from "../pages/Cart/Cart";
import Wishlist from "../pages/Wishlist/Wishlist";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Checkout from "../pages/Checkout/Checkout";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import OrderSuccess from "../pages/OrderSuccess/OrderSuccess";
import Signup from "../pages/Signup/Signup";
import Success from "../pages/Success/Success";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import Orders from "../pages/Orders/Orders";
import OrderDetails from "../pages/OrderDetails/OrderDetails";
import Profile from "../pages/Profile/Profile";
import OTPVerification from "../pages/OTPVerification/OTPVerification";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import Address from "../pages/Address/Address";
import Invoice from "../pages/Invoice/Invoice";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>

        {/* Public Routes */}

        <Route path="/" element={<Home />} />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/verify-otp"
          element={<OTPVerification />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

        <Route
          path="/address"
          element={<Address />}

        />

        <Route
  path="/invoice/:id"
  element={
    <ProtectedRoute>
      <Invoice />
    </ProtectedRoute>
  }
/>

        {/* Protected / User Routes */}

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        {/* Order Details */}

        <Route
          path="/order-details/:id"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        />

        {/* Success Pages */}

        <Route
          path="/success"
          element={<Success />}
        />

        <Route
          path="/order-success"
          element={<OrderSuccess />}
        />

      </Route>
    </Routes>
  );
}

export default AppRoutes;




// import { Routes, Route } from "react-router-dom";

// import Home from "../pages/Home/Home";
// import Products from "../pages/Products/Products";
// import Cart from "../pages/Cart/Cart";
// import Wishlist from "../pages/Wishlist/Wishlist";
// import Login from "../pages/Login/Login";
// import Register from "../pages/Register/Register";
//  import Checkout from "../pages/Checkout/Checkout";
// import ProductDetails from "../pages/ProductDetails/ProductDetails";
// import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
// import OrderSuccess from "../pages/OrderSuccess/OrderSuccess";
// import Signup from "../pages/Signup/Signup";
// import Success from "../pages/Success/Success";
// import MainLayout from "../layouts/MainLayout";
// import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
// import Orders from "../pages/Orders/Orders";
// import Profile from "../pages/Profile/Profile";
//  import OTPVerification from "../pages/OTPVerification/OTPVerification";
// import ResetPassword from "../pages/ResetPassword/ResetPassword";
// import Address from "../pages/Address/Address";

// function AppRoutes() {
//   return (
//     <Routes>
//       <Route element={<MainLayout />}>
//         {/* Public Routes */}
//         <Route path="/" element={<Home />} />
//         <Route path="/products" element={<Products />} />
//         <Route path="/product/:id" element={<ProductDetails />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/success" element={<Success />} />
//         <Route path="/orders" element={<Orders />} />
//         <Route path="/profile" element={<Profile />} />
//  <Route path="/verify-otp" element={<OTPVerification />} />
// <Route path="/reset-password" element={<ResetPassword />} />
//     <Route path="/address" element={<Address />} />    
//         {/* Protected Routes */}
//         <Route
//           path="/cart" element={<Cart />}/>

//         <Route
//           path="/wishlist"
//           element={
//             //<ProtectedRoute>
//               <Wishlist />
//             //</ProtectedRoute>
//           }
//         />

//         <Route
//           path="/profile"
//           element={
//             <ProtectedRoute>
//               <Profile />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/checkout"
//           element={
//             // <ProtectedRoute>
//               <Checkout />
//             //</ProtectedRoute>
//           }
//         />

//         <Route
//           path="/success"
//           element={
//             //<ProtectedRoute>
//               <OrderSuccess />
//             //</ProtectedRoute>
//           }
//         />
//       </Route>
//     </Routes>
//   );
// }

// export default AppRoutes;




// import { Routes, Route } from "react-router-dom";

// import Home from "../pages/Home/Home";
// import Products from "../pages/Products/Products";
// import Cart from "../pages/Cart/Cart";
// import Wishlist from "../pages/Wishlist/Wishlist";
// import Login from "../pages/Login/Login";
// import Register from "../pages/Register/Register";
// import Profile from "../pages/Profile/Profile";
// import Checkout from "../pages/Checkout/Checkout";
// import ProductDetails from "../pages/ProductDetails/ProductDetails";
// import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
// import MainLayout from "../layouts/MainLayout";
// import OrderSuccess from "../pages/OrderSuccess/OrderSuccess";
// import Signup from "../pages/Signup/Signup";

// function AppRoutes() {
//   return (
//     <Routes>
//       <Route element={<MainLayout />}>
//         <Route path="/" element={<Home />} />
//         <Route path="/products" element={<Products />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/wishlist" element={<Wishlist />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/checkout" element={<Checkout />} />
//         <Route path="/product/:id" element={<ProductDetails />} />
//         <Route path="/success" element={<OrderSuccess />}/></Route>
//         <Route path="/forgot-password" element={<ForgotPassword />}/>
//          <Route path="/signup" element={<Signup />} />
//     </Routes>
//   );
// }

// export default AppRoutes;