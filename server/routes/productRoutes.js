const express = require("express");
const router = express.Router();

const {
  addProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,

} = require("../controllers/productController");

// Add Product
router.post("/", addProduct);

// Get All Products
router.get("/", getProducts);

//ingle Products
router.get("/:id", getSingleProduct);

//update product
router.put("/:id", updateProduct);

//delete product
router.delete("/:id", deleteProduct);

module.exports = router;