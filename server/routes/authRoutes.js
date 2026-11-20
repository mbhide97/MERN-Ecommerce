// const express = require("express");
// const router = express.Router();

// const {
//   registerUser,
//   loginUser,
//    getProfile,
// } = require("../controllers/authController");

// const protect = require("../middleware/authMiddleware");
// // Register
// router.post("/register", registerUser);

// // Login
// router.post("/login", loginUser);

// //profile uer
// router.get("/profile", protect, getProfile);

// module.exports = router;

const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  googleLogin,
  getProfile,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

// ================= REGISTER =================
router.post("/register", registerUser);

// ================= LOGIN =================
router.post("/login", loginUser);

// ================= GOOGLE LOGIN =================
router.post("/google", googleLogin);

// ================= PROFILE =================
router.get("/profile", protect, getProfile);

module.exports = router;