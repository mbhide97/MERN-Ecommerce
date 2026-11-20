import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from '../api/axios';
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import './ProductDetails.css'
function ProductDetails(){

  let navigate=useNavigate()

  let {addToCart}=useCart()
    let {id}=useParams()

     let [product,setProduct]=useState([])

  let getProducts=async()=>{
    try{
      let response=await api.get(`/products/${id}`)
      console.log(response.data);
      
      setProduct(response.data)
    }catch(error){
console.log('Fetching Error');

    }
  }
 useEffect(()=>{
  getProducts();
 },[id]) 

 let handleProduct=()=>{
     addToCart(product)

     alert(`${product.name} add to the Cart`)

     navigate('/cart')
  }


    return <div>
          <div className="container">

            <h1>View Details</h1>

            <div className="product-card">

                  <div className="product-img">
                     <img src={product.image} alt={product.name} />
                  </div>

                  <div className="product-info">
                     <h1>{product.name}</h1>
                     <p>{product.description}</p>
                     <h3>₹{product.price}</h3>
                     <p>{product.category}</p>

                     <button onClick={handleProduct}>Add To Cart</button>
                  </div>
                 
            </div>
          </div>


    </div>
}

export default ProductDetails;