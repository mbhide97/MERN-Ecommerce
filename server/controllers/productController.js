// const Product = require("../models/Product");

// // Add Product
// const addProduct = async (req, res) => {
//   try {
//     const { name, price, description, category, image, stock } = req.body;

//     if (!name || !price || !description || !category) {
//       return res.status(400).json({
//         success: false,
//         message: "Please fill all required fields",
//       });
//     }

//     const product = await Product.create({
//       name,
//       price,
//       description,
//       category,
//       image,
//       stock,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Product Added Successfully",
//       product,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // Get All Products
// const getProducts = async (req, res) => {
//   try {
//     const products = await Product.find();

//     res.status(200).json({
//       success: true,
//       count: products.length,
//       products,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // Get Single Product
// const getSingleProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product Not Found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       product,
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // Update Product
// const updateProduct = async (req, res) => {
//   try {
//     const product = await Product.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       {
//         new: true,
//         runValidators: true,
//       }
//     );

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product Not Found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Product Updated Successfully",
//       product,
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // Delete Product
// const deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product Not Found",
//       });
//     }

//     await Product.findByIdAndDelete(req.params.id);

//     res.status(200).json({
//       success: true,
//       message: "Product Deleted Successfully",
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// module.exports = {
// addProduct,
// getProducts,
// getSingleProduct,
// updateProduct,
// deleteProduct,
// };


const Product = require("../models/Product");

// Add Single Product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      category,
      image,
      stock,
    } = req.body;

    if (!name || !price || !description || !category) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const product = await Product.create({
      name,
      price,
      description,
      category,
      image,
      stock,
    });

    res.status(201).json({
      success: true,
      message: "Product Added Successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Add Multiple Products
const addMultipleProducts = async (req, res) => {
  try {
    const products = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please send an array of products",
      });
    }

    const createdProducts = await Product.insertMany(products);

    res.status(201).json({
      success: true,
      message: `${createdProducts.length} Products Added Successfully`,
      count: createdProducts.length,
      products: createdProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Get All Products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Get Single Product
const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Update Product
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product Updated Successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  addProduct,
  addMultipleProducts,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
