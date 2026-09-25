// const Cart = require("../models/Cart");
// const Product = require("../models/Product");

// // Add To Cart
// const addToCart = async (req, res) => {
//   try {
//     const { productId, quantity } = req.body;

//     // Check Product
//     const product = await Product.findById(productId);

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product Not Found",
//       });
//     }

//     // Check Existing Cart Item
//     let cartItem = await Cart.findOne({
//       user: req.user.id,
//       product: productId,
//     });

//     if (cartItem) {
//       cartItem.quantity += quantity;

//       await cartItem.save();

//       return res.status(200).json({
//         success: true,
//         message: "Cart Updated Successfully",
//         cartItem,
//       });
//     }

//     // Create New Cart Item
//     cartItem = await Cart.create({
//       user: req.user.id,
//       product: productId,
//       quantity,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Product Added To Cart",
//       cartItem,
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
// // Get User Cart
// const getCart = async (req, res) => {
//   try {
//     const cart = await Cart.find({ user: req.user.id })
//       .populate("product");

//     res.status(200).json({
//       success: true,
//       cart,
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // Update Cart Quantity
// const updateCart = async (req, res) => {
//   try {
//     const { quantity } = req.body;

//     const cartItem = await Cart.findById(req.params.id);

//     if (!cartItem) {
//       return res.status(404).json({
//         success: false,
//         message: "Cart Item Not Found",
//       });
//     }

//     cartItem.quantity = quantity;

//     await cartItem.save();

//     res.status(200).json({
//       success: true,
//       message: "Cart Updated Successfully",
//       cartItem,
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


// // Remove From Cart
// const removeCart = async (req, res) => {
//   try {
//     const cartItem = await Cart.findById(req.params.id);

//     if (!cartItem) {
//       return res.status(404).json({
//         success: false,
//         message: "Cart Item Not Found",
//       });
//     }

//     await Cart.findByIdAndDelete(req.params.id);

//     res.status(200).json({
//       success: true,
//       message: "Product Removed From Cart",
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
// module.exports = {
//   addToCart,
//   getCart,
//   updateCart,
//   removeCart,
// };



const Cart = require("../models/Cart");
const Product = require("../models/Product");

// ==========================================
// ADD TO CART
// ==========================================

const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    // Check Product
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    // Check Existing Cart Item
    let cartItem = await Cart.findOne({
      user: req.user.id,
      product: productId,
    });

    if (cartItem) {
      cartItem.quantity += quantity;

      await cartItem.save();

      return res.status(200).json({
        success: true,
        message: "Cart Updated Successfully",
        cartItem,
      });
    }

    // Create New Cart Item
    cartItem = await Cart.create({
      user: req.user.id,
      product: productId,
      quantity,
    });

    res.status(201).json({
      success: true,
      message: "Product Added To Cart",
      cartItem,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ==========================================
// GET USER CART
// ==========================================

const getCart = async (req, res) => {
  try {
    const cart = await Cart.find({
      user: req.user.id,
    }).populate("product");

    res.status(200).json({
      success: true,
      cart,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ==========================================
// INCREASE QUANTITY
// ==========================================

const increaseCart = async (req, res) => {
  try {
    const cartItem = await Cart.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart Item Not Found",
      });
    }

    cartItem.quantity += 1;

    await cartItem.save();

    res.status(200).json({
      success: true,
      message: "Quantity Increased",
      cartItem,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ==========================================
// DECREASE QUANTITY
// ==========================================

const decreaseCart = async (req, res) => {
  try {
    const cartItem = await Cart.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart Item Not Found",
      });
    }

    // Quantity 1 असेल तर item delete
    if (cartItem.quantity <= 1) {

      await Cart.findByIdAndDelete(cartItem._id);

      return res.status(200).json({
        success: true,
        message: "Product Removed From Cart",
      });
    }

    cartItem.quantity -= 1;

    await cartItem.save();

    res.status(200).json({
      success: true,
      message: "Quantity Decreased",
      cartItem,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ==========================================
// UPDATE QUANTITY
// ==========================================

const updateCart = async (req, res) => {
  try {
    const { quantity } = req.body;

    const cartItem = await Cart.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart Item Not Found",
      });
    }

    if (quantity < 1) {
      await Cart.findByIdAndDelete(cartItem._id);

      return res.status(200).json({
        success: true,
        message: "Product Removed From Cart",
      });
    }

    cartItem.quantity = quantity;

    await cartItem.save();

    res.status(200).json({
      success: true,
      message: "Cart Updated Successfully",
      cartItem,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ==========================================
// REMOVE FROM CART
// ==========================================

const removeCart = async (req, res) => {
  try {
    const cartItem = await Cart.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart Item Not Found",
      });
    }

    await Cart.findByIdAndDelete(cartItem._id);

    res.status(200).json({
      success: true,
      message: "Product Removed From Cart",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ==========================================
// CLEAR CART
// ==========================================

const clearCart = async (req, res) => {
  try {
    await Cart.deleteMany({
      user: req.user.id,
    });

    res.status(200).json({
      success: true,
      message: "Cart Cleared Successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  addToCart,
  getCart,
  increaseCart,
  decreaseCart,
  updateCart,
  removeCart,
  clearCart,
};
