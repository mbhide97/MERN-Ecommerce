const express = require("express");

const router = express.Router();

const {
  createRazorpayOrder,
  verifyPayment,
  createOrder,
  getMyOrders,
  getSingleOrder,
  updateOrderStatus,
  testEmail,
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
  "/verify",
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
  "/my-orders",
  protect,
  getMyOrders
);

// ==========================================
// TEST EMAIL
// IMPORTANT:
// This must come BEFORE /:id
// ==========================================

router.get(
  "/test-email",
  testEmail
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
  "/:id/status",
  protect,
  updateOrderStatus
);

// ==========================================
// EXPORT ROUTER
// ==========================================

module.exports = router;