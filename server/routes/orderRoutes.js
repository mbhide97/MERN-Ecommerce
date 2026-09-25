
const express = require("express");

const router = express.Router();

const {
  createRazorpayOrder,
  verifyPayment,
  createOrder,
  getMyOrders,
  getSingleOrder,
  updateOrderStatus,
} = require("../controllers/orderController");

const protect = require("../middleware/authMiddleware");

// ==========================================
// CREATE RAZORPAY ORDER
// ==========================================

router.post(
  "/razorpay",
  protect,
  createRazorpayOrder
);

// ==========================================
// VERIFY RAZORPAY PAYMENT
// ==========================================

router.post(
  "/verify-payment",
  protect,
  verifyPayment
);

// ==========================================
// CREATE ORDER
// ==========================================

router.post(
  "/",
  protect,
  createOrder
);

// ==========================================
// GET MY ORDERS
// ==========================================

router.get(
  "/",
  protect,
  getMyOrders
);

// ==========================================
// GET SINGLE ORDER
// ==========================================

router.get(
  "/:id",
  protect,
  getSingleOrder
);

// ==========================================
// UPDATE ORDER STATUS
// ==========================================

router.put(
  "/:id",
  protect,
  updateOrderStatus
);

module.exports = router;
