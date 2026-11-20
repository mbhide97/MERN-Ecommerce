import Product from "../models/Product.js";

let createProduct=async(req,res)=>{


    try{
        let {image,name,description,price,category}=req.body;


        let product=await Product.create({
            image,
            name,
            description,
            price,
            category
        });

       return res.status(201).json({
        msg:"Product created successfully",
        product,
       })
    }catch(error){
         return res.status(500).json({
        msg:"Error found",
        error:error.msg
       })
    }
}

 
let getProducts=async(req,res)=>{
   try{

    let products=await Product.find();
    res.status(200).json(products)
   }catch(error){
         return res.status(500).json({
        msg:"Error feching given product",
        error:error.msg
       })
   }
}

 
let getProduct=async(req,res)=>{
   try{

    let product=await Product.findById(req.params.id);

    if(!product){
         return res.status(404).json({
        msg:" product not found",
    })
    }
    res.status(200).json(product)
   }catch(error){
         return res.status(500).json({
        msg:" Error feching Single product",
        error:error.msg
       })
   }
}

//


let updateProduct=async(req,res)=>{
   try{

    let product=await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    });

    if(!product){
         return res.status(404).json({
        msg:" product not found",
    })
    }
    res.status(200).json(product,{
        msg:" product update successfully...",
    })
   }catch(error){
         return res.status(500).json({
        msg:" Error feching Single product",
        error:error.msg
       })
   }
}

 
let deleteProduct=async(req,res)=>{
   try{

    let product=await Product.findByIdAndDelete(req.params.id);

    if(!product){
         return res.status(404).json({
        msg:" product not found",
    })
    }
    res.status(200).json(product)
   }catch(error){
         return res.status(500).json({
        msg:" Error feching Single product",
        error:error.msg
       })
   }
}


 

export {createProduct,getProducts,getProduct,updateProduct,deleteProduct}