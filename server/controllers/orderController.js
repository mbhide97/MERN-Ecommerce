 
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const razorpay = require("../services/razorpay");
const crypto = require("crypto");

// ==========================================
// CREATE RAZORPAY ORDER
// ==========================================

const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid Amount",
      });
    }

    const options = {
      amount: Math.round(Number(amount) * 100),
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const razorpayOrder =
      await razorpay.orders.create(options);

    res.status(201).json({
      success: true,
      message: "Razorpay Order Created",
      order: razorpayOrder,
    });
  } catch (error) {
    console.error(
      "❌ Razorpay Order Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// VERIFY RAZORPAY PAYMENT
// ==========================================

const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment Verification Data Missing",
      });
    }

    const generatedSignature =
      crypto
        .createHmac(
          "sha256",
          process.env.RAZORPAY_KEY_SECRET
        )
        .update(
          `${razorpay_order_id}|${razorpay_payment_id}`
        )
        .digest("hex");

    if (
      generatedSignature !==
      razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid Payment Signature",
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment Verified Successfully",

      paymentId: razorpay_payment_id,

      orderId: razorpay_order_id,

      paymentStatus: "Paid",
    });
  } catch (error) {
    console.error(
      "❌ Payment Verification Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// CREATE ORDER
// ==========================================

const createOrder = async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      paymentMethod,

      subtotal,
      deliveryCharge,
      gst,
      discount,
      totalAmount,

      razorpayOrderId,
      razorpayPaymentId,
      paymentStatus,
    } = req.body;

    // ==========================================
    // CHECK CART
    // ==========================================

    const cartItems = await Cart.find({
      user: req.user.id,
    }).populate("product");

    if (cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is Empty",
      });
    }

    // ==========================================
    // CALCULATE PRODUCT SUBTOTAL
    // ==========================================

    let calculatedSubtotal = 0;

    const products = cartItems.map((item) => {
      calculatedSubtotal +=
        item.product.price * item.quantity;

      return {
        product: item.product._id,
        quantity: item.quantity,
      };
    });

    // ==========================================
    // FINAL PRICE
    // ==========================================

    const finalSubtotal =
      Number(subtotal) || calculatedSubtotal;

    const finalDelivery =
      Number(deliveryCharge) || 0;

    const finalGst =
      Number(gst) || 0;

    const finalDiscount =
      Number(discount) || 0;

    const calculatedTotal =
      finalSubtotal +
      finalDelivery +
      finalGst -
      finalDiscount;

    const finalTotal =
      Number(totalAmount) || calculatedTotal;

    // ==========================================
    // PAYMENT STATUS
    // ==========================================

    let finalPaymentStatus = "Pending";

    if (paymentMethod === "Razorpay") {
      finalPaymentStatus =
        paymentStatus === "Paid"
          ? "Paid"
          : "Pending";
    }

    // ==========================================
    // CREATE ORDER
    // ==========================================

    const order = await Order.create({
      user: req.user.id,

      customerName,
      customerEmail,
      customerPhone,

      products,

      subtotal: finalSubtotal,

      deliveryCharge: finalDelivery,

      gst: finalGst,

      discount: finalDiscount,

      totalAmount: finalTotal,

      paymentMethod,

      razorpayOrderId:
        razorpayOrderId || "",

      razorpayPaymentId:
        razorpayPaymentId || "",

      paymentStatus:
        finalPaymentStatus,

      shippingAddress,
    });

    // ==========================================
    // CLEAR CART
    // ==========================================

    await Cart.deleteMany({
      user: req.user.id,
    });

    // ==========================================
    // RESPONSE
    // ==========================================

    res.status(201).json({
      success: true,

      message:
        "Order Placed Successfully",

      order,
    });
  } catch (error) {
    console.error(
      "❌ Create Order Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// GET MY ORDERS
// ==========================================

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id,
    })
      .populate("products.product")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(
      "❌ Get Orders Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// GET SINGLE ORDER
// ==========================================

const getSingleOrder = async (req, res) => {
  try {
    const order = await Order.findById(
      req.params.id
    )
      .populate("products.product")
      .populate("user", "name email");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order Not Found",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(
      "❌ Get Single Order Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// UPDATE ORDER STATUS
// ==========================================

const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;

    const validStatuses = [
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    if (!validStatuses.includes(orderStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Order Status",
      });
    }

    const order = await Order.findById(
      req.params.id
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order Not Found",
      });
    }

    order.orderStatus = orderStatus;

    await order.save();

    res.status(200).json({
      success: true,

      message:
        "Order Status Updated Successfully",

      order,
    });
  } catch (error) {
    console.error(
      "❌ Update Order Status Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// EXPORT
// ==========================================

module.exports = {
  createRazorpayOrder,
  verifyPayment,
  createOrder,
  getMyOrders,
  getSingleOrder,
  updateOrderStatus,
};


// const Order = require("../models/Order");
// const Cart = require("../models/Cart");
// const razorpay = require("../services/razorpay");
// const crypto = require("crypto");

// // ==========================================
// // CREATE RAZORPAY ORDER
// // ==========================================

// const createRazorpayOrder = async (req, res) => {
//   try {
//     const { amount } = req.body;

//     if (!amount || Number(amount) <= 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid Amount",
//       });
//     }

//     const options = {
//       amount: Math.round(Number(amount) * 100),
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`,
//     };

//     const razorpayOrder =
//       await razorpay.orders.create(options);

//     res.status(201).json({
//       success: true,
//       message: "Razorpay Order Created",
//       order: razorpayOrder,
//     });
//   } catch (error) {
//     console.error(
//       "❌ Razorpay Order Error:",
//       error
//     );

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ==========================================
// // VERIFY RAZORPAY PAYMENT
// // ==========================================

// const verifyPayment = async (req, res) => {
//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//     } = req.body;

//     // ==========================================
//     // CHECK PAYMENT DATA
//     // ==========================================

//     if (
//       !razorpay_order_id ||
//       !razorpay_payment_id ||
//       !razorpay_signature
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "Payment Verification Data Missing",
//       });
//     }

//     // ==========================================
//     // CREATE SIGNATURE
//     // ==========================================

//     const generatedSignature =
//       crypto
//         .createHmac(
//           "sha256",
//           process.env.RAZORPAY_KEY_SECRET
//         )
//         .update(
//           `${razorpay_order_id}|${razorpay_payment_id}`
//         )
//         .digest("hex");

//     // ==========================================
//     // COMPARE SIGNATURE
//     // ==========================================

//     if (
//       generatedSignature !==
//       razorpay_signature
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid Payment Signature",
//       });
//     }

//     // ==========================================
//     // PAYMENT VERIFIED
//     // ==========================================

//     res.status(200).json({
//       success: true,
//       message: "Payment Verified Successfully",
//       paymentId: razorpay_payment_id,
//       orderId: razorpay_order_id,
//     });

//   } catch (error) {
//     console.error(
//       "❌ Payment Verification Error:",
//       error
//     );

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ==========================================
// // CREATE ORDER
// // ==========================================

// const createOrder = async (req, res) => {
//   try {
//     const {
//       customerName,
//       customerEmail,
//       customerPhone,
//       shippingAddress,
//       paymentMethod,
//       subtotal,
//       deliveryCharge,
//       gst,
//       discount,
//       totalAmount,
//     } = req.body;

//     // ==========================================
//     // CHECK CART
//     // ==========================================

//     const cartItems = await Cart.find({
//       user: req.user.id,
//     }).populate("product");

//     if (cartItems.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Cart is Empty",
//       });
//     }

//     // ==========================================
//     // CALCULATE PRODUCT SUBTOTAL
//     // ==========================================

//     let calculatedSubtotal = 0;

//     const products = cartItems.map((item) => {
//       calculatedSubtotal +=
//         item.product.price * item.quantity;

//       return {
//         product: item.product._id,
//         quantity: item.quantity,
//       };
//     });

//     // ==========================================
//     // USE BACKEND CALCULATED VALUES
//     // ==========================================

//     const finalSubtotal =
//       Number(subtotal) || calculatedSubtotal;

//     const finalDelivery =
//       Number(deliveryCharge) || 0;

//     const finalGst =
//       Number(gst) || 0;

//     const finalDiscount =
//       Number(discount) || 0;

//     const calculatedTotal =
//       finalSubtotal +
//       finalDelivery +
//       finalGst -
//       finalDiscount;

//     const finalTotal =
//       Number(totalAmount) || calculatedTotal;

//     // ==========================================
//     // CREATE ORDER
//     // ==========================================

//     const order = await Order.create({
//       user: req.user.id,

//       customerName,
//       customerEmail,
//       customerPhone,

//       products,

//       subtotal: finalSubtotal,

//       deliveryCharge: finalDelivery,

//       gst: finalGst,

//       discount: finalDiscount,

//       totalAmount: finalTotal,

//       paymentMethod,

//       shippingAddress,
//     });

//     // ==========================================
//     // CLEAR CART
//     // ==========================================

//     await Cart.deleteMany({
//       user: req.user.id,
//     });

//     // ==========================================
//     // RESPONSE
//     // ==========================================

//     res.status(201).json({
//       success: true,
//       message: "Order Placed Successfully",
//       order,
//     });
//   } catch (error) {
//     console.error(
//       "❌ Create Order Error:",
//       error
//     );

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ==========================================
// // GET MY ORDERS
// // ==========================================

// const getMyOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({
//       user: req.user.id,
//     })
//       .populate("products.product")
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       orders,
//     });
//   } catch (error) {
//     console.error(
//       "❌ Get Orders Error:",
//       error
//     );

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ==========================================
// // GET SINGLE ORDER
// // ==========================================

// const getSingleOrder = async (req, res) => {
//   try {
//     const order = await Order.findById(
//       req.params.id
//     )
//       .populate("products.product")
//       .populate("user", "name email");

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order Not Found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       order,
//     });
//   } catch (error) {
//     console.error(
//       "❌ Get Single Order Error:",
//       error
//     );

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ==========================================
// // UPDATE ORDER STATUS
// // ==========================================

// const updateOrderStatus = async (req, res) => {
//   try {
//     const { orderStatus } = req.body;

//     const validStatuses = [
//       "Pending",
//       "Processing",
//       "Shipped",
//       "Delivered",
//       "Cancelled",
//     ];

//     if (!validStatuses.includes(orderStatus)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid Order Status",
//       });
//     }

//     const order = await Order.findById(
//       req.params.id
//     );

//     if (!order) {
//       return res.status(404).json({
//         success: false,
//         message: "Order Not Found",
//       });
//     }

//     // ==========================================
//     // UPDATE STATUS
//     // ==========================================

//     order.orderStatus = orderStatus;

//     await order.save();

//     res.status(200).json({
//       success: true,
//       message:
//         "Order Status Updated Successfully",
//       order,
//     });
//   } catch (error) {
//     console.error(
//       "❌ Update Order Status Error:",
//       error
//     );

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ==========================================
// // EXPORT
// // ==========================================

// module.exports = {
//   createRazorpayOrder,
//   verifyPayment,
//   createOrder,
//   getMyOrders,
//   getSingleOrder,
//   updateOrderStatus,
// };



 