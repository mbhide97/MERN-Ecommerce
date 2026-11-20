import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'; 
import adminMiddleware from '../middleware/adminMiddleware.js';
import { getAllUser,deleteUser } from '../controllers/userController.js';

let router=express.Router()

router.get('/profile',authMiddleware,(req,res)=>{
    res.status(200).json({
        msg:"Profile successfully fetching",
        user:req.user
    })
})

router.get('/admin/all',authMiddleware,adminMiddleware,getAllUser)
router.delete('/admin/delete/:id',authMiddleware,adminMiddleware,deleteUser)


export default router;