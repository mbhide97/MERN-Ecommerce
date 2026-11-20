
import express from "express";
import {createOrder,myOrder  ,razorpayOrder,verifyOrder,saveVerifyPaymentOrder,getAllOrders, updateOrderStatus ,deleteOrder} from "../controllers/orderController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = express.Router();

router.post("/", authMiddleware, createOrder);

router.get("/my-orders", authMiddleware, myOrder);

router.post("/razorpay",authMiddleware,razorpayOrder);

router.post("/verify",authMiddleware,verifyOrder);

router.post( "/save-verify",authMiddleware,saveVerifyPaymentOrder);

router.get('/admin/all',authMiddleware,adminMiddleware,getAllOrders);

router.put('/admin/update/:id',authMiddleware,adminMiddleware,updateOrderStatus);

router.delete('/admin/delete/:id',authMiddleware,adminMiddleware,deleteOrder)
 

 


 
export default router;