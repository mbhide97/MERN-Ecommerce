import express from 'express'

import {createProduct,getProducts,getProduct,updateProduct,deleteProduct} from '../controllers/productController.js'
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

let router=express.Router();

router.get('/',getProducts)

router.get('/:id',getProduct)

router.post('/',authMiddleware,adminMiddleware, createProduct);

router.put('/:id',authMiddleware, adminMiddleware, updateProduct)

router.delete('/:id',authMiddleware,adminMiddleware, deleteProduct)

export default router;