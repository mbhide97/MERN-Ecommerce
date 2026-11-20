 import React, { createContext, useContext, useState } from "react";

let CartContext=createContext()

export function CartProvider({children}){
let [cart, setCart] = useState(() => {
  let savedCart = localStorage.getItem("cart");
     try {

       let parsedCart = savedCart ? JSON.parse(savedCart): []
    return Array.isArray(parsedCart)? parsedCart: [];
  } catch (error) {
    console.log("Cart data error:", error);
    return [];
  }
});
//add product
let addToCart=(product)=>{

   let productExist=cart.find((item)=> item._id === product._id)
    
   let updateCart
   if(productExist){

    updateCart=(cart.map((item)=>item._id === product._id ?{...item,quantity:item.quantity +1}:item))
   }
   else{
    updateCart=[...cart,{...product,quantity:1}]
   }

   setCart(updateCart)
   localStorage.setItem("cart",JSON.stringify(updateCart))
}

//remove
let removeCart=(productId)=>{
  let updateCart= cart.filter((item)=>item._id !== productId)
  setCart(updateCart)
   localStorage.setItem("cart",JSON.stringify(updateCart))
}

// + quantity
let increaseQuantity=(productId)=>{
 let updateCart=cart.map((item)=>item._id === productId ?{...item,quantity:item.quantity +1}:item)
setCart(updateCart)
   localStorage.setItem("cart",JSON.stringify(updateCart))
 }

 // - quantity
let decreaseQuantity=(productId)=>{
 let updateCart=cart.map((item)=>item._id === productId && item.quantity > 1 ?{...item,quantity:item.quantity - 1}:item)
setCart(updateCart)
   localStorage.setItem("cart",JSON.stringify(updateCart))

}

// clear

const clearCart = () => {
  setCart([]);
  localStorage.removeItem("cart");
};


    return <div>

    <CartContext.Provider value={{cart,addToCart,removeCart,increaseQuantity,decreaseQuantity,clearCart}}>{children}</CartContext.Provider>


    </div>
}

export function useCart(){
    return useContext(CartContext)
}