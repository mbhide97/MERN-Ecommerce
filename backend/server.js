import "dotenv/config";
import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import ProductRoutes from './routes/productRoutes.js';
import OrderRoutes from './routes/orderRoutes.js';
import dashboardRoutes from "./routes/dashboardRoutes.js";;
 


let app=express()

dotenv.config()   //varianle envirnment loaded

connectDB()    //monngodb connection
app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{

    res.send('this is backend server file...')
})

app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);
app.use("/api/products",ProductRoutes)
app.use("/api/orders",OrderRoutes)
app.use('/api/dashboard',dashboardRoutes)
 

 // let PORT=process.env.PORT||5000;

app.listen(5000,()=>{
    console.log('server started...');
    
})