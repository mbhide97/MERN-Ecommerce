import express from 'express';

import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';
import { dashboardStatus } from '../controllers/dashboardController.js';
let router=express.Router();

router.get('/status',authMiddleware,adminMiddleware,dashboardStatus)

export default router;