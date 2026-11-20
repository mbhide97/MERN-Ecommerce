
// import React, { useEffect, useState } from "react";
// import api from "../api/axios";
// import AdminSidebar from "../components/AdminSidebar";

// function AdminProducts() {

//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchProducts = async () => {
//     try {
//       const response = await api.get("/products");
//       setProducts(response.data.products || response.data);
//     } catch (error) {
//       console.log(error);
//       alert("Unable to load products");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const deleteProduct = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this product?")) {
//       return;
//     }

//     try {
//       await api.delete(`/products/${id}`);
//       alert("Product deleted successfully");
//       fetchProducts();
//     } catch (error) {
//       console.log(error);
//       alert("Unable to delete product");
//     }
//   };

//   return (
//     <div style={{ display: "flex", minHeight: "100vh" }}>

//       <AdminSidebar />

//       <div style={{ flex: 1, padding: "25px" }}>

//         <h1>Manage Products</h1>

//         {loading ? (
//           <h3>Loading Products...</h3>
//         ) : products.length === 0 ? (
//           <h3>No Products Found</h3>
//         ) : (
//           products.map((product) => (
//             <div
//               key={product._id}
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 padding: "15px",
//                 marginBottom: "12px",
//                 background: "#f1f1f1",
//                 borderRadius: "8px",
//                 gap: "10px"
//               }}
//             >
//               <div>
//                 <h3>{product.name}</h3>
//                 <p>Price: ₹{product.price}</p>
//               </div>

//               <button
//                 onClick={() => deleteProduct(product._id)}
//                 style={{
//                   background: "red",
//                   color: "white",
//                   border: "none",
//                   padding: "10px",
//                   cursor: "pointer",
//                   borderRadius: "5px"
//                 }}
//               >
//                 Delete
//               </button>
//             </div>
//           ))
//         )}

//       </div>
//     </div>
//   );
// }

// export default AdminProducts;


import React, { useState, useEffect } from "react";
import api from "../api/axios";
import AdminSidebar from "../components/AdminSidebar";
import "./AdminProducts.css";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    image: "",
    name: "",
    description: "",
    price: "",
    category: "",
  });

  // Fetch All Products
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await api.get("/products");

      setProducts(response.data.products || response.data);
      setError("");
    } catch (err) {
      console.log(err);
      setError("Unable to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Input Handler
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Open Add Form
  const openAddForm = () => {
    setEditId(null);

    setFormData({
      image: "",
      name: "",
      description: "",
      price: "",
      category: "",
    });

    setShowForm(true);
  };

  // Edit Product
  const editProduct = (product) => {
    setEditId(product._id);

    setFormData({
      image: product.image || "",
      name: product.name || "",
      description: product.description || "",
      price: product.price ?? "",
      category: product.category || "",
    });

    setShowForm(true);
  };

  // Submit Add / Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = {
        ...formData,
        price: Number(formData.price),
      };

      if (editId) {
        await api.put(`/products/${editId}`, productData);
        alert("Product updated successfully!");
      } else {
        await api.post("/products", productData);
        alert("Product added successfully!");
      }

      setShowForm(false);
      setEditId(null);

      setFormData({
        image: "",
        name: "",
        description: "",
        price: "",
        category: "",
      });

      fetchProducts();
    } catch (err) {
      console.log(err);
      alert("Something went wrong. Please check console.");
    }
  };

  // Delete Product
  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/products/${id}`);

      alert("Product deleted successfully!");

      fetchProducts();
    } catch (err) {
      console.log(err);
      alert("Unable to delete product");
    }
  };

  return (
    <div className="admin-products-layout">

      <AdminSidebar />

      <div className="admin-products">

        <div className="admin-products-header">
          <h1>Manage Products</h1>

          <button onClick={openAddForm}>
            + Add Product
          </button>
        </div>

        {/* Add / Edit Form */}
        {showForm && (
          <div className="product-form-container">

            <h2>
              {editId ? "Edit Product" : "Add New Product"}
            </h2>

            <form onSubmit={handleSubmit}>

              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="image"
                placeholder="Product Image URL"
                value={formData.image}
                onChange={handleChange}
                required
              />

              <textarea
                name="description"
                placeholder="Product Description"
                value={formData.description}
                onChange={handleChange}
                required
              />

              <input
                type="number"
                name="price"
                placeholder="Product Price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                required
              />

              <input
                type="text"
                name="category"
                placeholder="Product Category"
                value={formData.category}
                onChange={handleChange}
                required
              />

              <div className="product-form-buttons">

                <button type="submit">
                  {editId ? "Update Product" : "Add Product"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditId(null);
                  }}
                >
                  Cancel
                </button>

              </div>

            </form>
          </div>
        )}

        {/* Product List */}
        {loading ? (
          <h2>Loading Products...</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : products.length === 0 ? (
          <h2>No Products Found</h2>
        ) : (
          <div className="admin-product-list">

            {products.map((product) => (
              <div className="admin-product-card" key={product._id}>

                <img
                  src={product.image}
                  alt={product.name}
                />

                <h3>{product.name}</h3>

                <p>{product.description}</p>

                <h4>₹{product.price}</h4>

                <p>Category: {product.category}</p>

                <div className="product-actions">

                  <button
                    type="button"
                    onClick={() => editProduct(product)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteProduct(product._id)}
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default AdminProducts;
