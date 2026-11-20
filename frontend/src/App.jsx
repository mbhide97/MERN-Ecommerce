import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import './App.css'
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import Orders from './pages/Orders';
import Invoice from './pages/Invoice';
import AdminDashboard from './pages/AdminDashboard';
import AdminRoutes from './components/AdminRoutes';
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from './pages/AdminOrders';
import AdminUsers from './pages/AdminUsers';
function App() {

  return <div>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:id' element={<ProductDetails />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/success' element={<Success />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/invoice/:id' element={<Invoice />} />
        <Route path='/admin/dashboard' element={<AdminRoutes><AdminDashboard /></AdminRoutes>}></Route>
        <Route path="/admin/products" element={<AdminRoutes><AdminProducts /></AdminRoutes>}></Route>
        <Route path="/admin/orders" element={<AdminRoutes> <AdminOrders /></AdminRoutes>} />
        <Route path="/admin/users" element={<AdminRoutes> <AdminUsers /></AdminRoutes>} />

      </Routes>


    </BrowserRouter>

  </div>



}

export default App
