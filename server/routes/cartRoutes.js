// const express = require("express");
// const router = express.Router();

// const { addToCart , getCart, updateCart,removeCart,} = require("../controllers/cartController");
// const protect = require("../middleware/authMiddleware");

// // Add To Cart
// router.post("/", protect, addToCart);

// //get cart
// router.get("/", protect, getCart);

// //updte cart
// router.put("/:id", protect, updateCart);

// //remove cart
// router.delete("/:id", protect, removeCart);

// module.exports = router;

const express = require("express");

const router = express.Router();

const {
  addToCart,
  getCart,
  increaseCart,
  decreaseCart,
  updateCart,
  removeCart,
  clearCart,
} = require("../controllers/cartController");

const protect = require("../middleware/authMiddleware");

// ==========================================
// ADD TO CART
// ==========================================
router.post("/", protect, addToCart);

// ==========================================
// GET USER CART
// ==========================================
router.get("/", protect, getCart);

// ==========================================
// INCREASE QUANTITY
// ==========================================
router.put("/increase/:id", protect, increaseCart);

// ==========================================
// DECREASE QUANTITY
// ==========================================
router.put("/decrease/:id", protect, decreaseCart);

// ==========================================
// UPDATE QUANTITY
// ==========================================
router.put("/:id", protect, updateCart);

// ==========================================
// REMOVE FROM CART
// ==========================================
router.delete("/:id", protect, removeCart);

// ==========================================
// CLEAR CART
// ==========================================
router.delete("/", protect, clearCart);

module.exports = router;