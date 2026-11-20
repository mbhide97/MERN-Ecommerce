import express from 'express';
import { register,login } from '../controllers/authController.js';
// import { model } from 'mongoose';
 let router=express.Router();

 router.post('/register',register)

router.post('/login',login)

export default router;


  