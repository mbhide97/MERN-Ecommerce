
import React, { useEffect, useState } from "react";
import api from "../api/axios";
import "./Products.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Products() {
  let navigate = useNavigate();

  let [products, setProducts] = useState([]);
  let [search, setSearch] = useState("");
  let [category, setCategory] = useState("All");


  let { addToCart } = useCart();

  let getProducts = async () => {
    try {
      let response = await api.get("/products");

      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.log("Fetching Error", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  let categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];
 
  let filterProducts = products.filter((product) => {
    let matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    let matchCategory =
      category === "All" || product.category === category;

    return matchSearch && matchCategory;
  });

  let viewProduct = (id) => {
    navigate(`/products/${id}`);
  };

   let handleProduct = (product) => {
    addToCart(product);

    alert(`${product.name} added to the Cart`);

    navigate("/cart");
  };

  return (
    <div className="product-container">

       <h1>Our Products</h1>

       <input
        type="text"
        placeholder="Search here..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

       <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {categories.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>

       <div className="product-grid">

        {filterProducts.length > 0 ? (
          filterProducts.map((product) => (
            <div key={product._id}>

               <img
                src={product.image}
                alt={product.name}
              />
              <h2>{product.name}</h2>
               <p>{product.description}</p>
               <h3>₹{product.price}</h3>
              <p>{product.category}</p>
              <button
                className="details-btn"
                onClick={() => viewProduct(product._id)}>
                Product Details
              </button>

              <button
                className="cart-btn"
                onClick={() => handleProduct(product)}>
                Add to Cart
              </button>

            </div>
          ))
        ) : (
          <h2>No Product Found....</h2>
        )}

      </div>
    </div>
  );
}

export default Products;

