
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    // ==========================================
    // USER
    // ==========================================

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ==========================================
    // CUSTOMER DETAILS
    // ==========================================

    customerName: {
      type: String,
      default: "",
    },

    customerEmail: {
      type: String,
      default: "",
    },

    customerPhone: {
      type: String,
      default: "",
    },

    // ==========================================
    // PRODUCTS
    // ==========================================

    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },

        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],

    // ==========================================
    // PRICE DETAILS
    // ==========================================

    subtotal: {
      type: Number,
      default: 0,
    },

    deliveryCharge: {
      type: Number,
      default: 0,
    },

    gst: {
      type: Number,
      default: 0,
    },

    discount: {
      type: Number,
      default: 0,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    // ==========================================
    // PAYMENT
    // ==========================================

    paymentMethod: {
      type: String,
      default: "COD",
    },

    razorpayOrderId: {
      type: String,
      default: "",
    },

    razorpayPaymentId: {
      type: String,
      default: "",
    },

    paymentStatus: {
      type: String,
      enum: [
        "Pending",
        "Paid",
        "Failed",
      ],
      default: "Pending",
    },

    // ==========================================
    // ORDER STATUS
    // ==========================================

    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },

    // ==========================================
    // SHIPPING ADDRESS
    // ==========================================

    shippingAddress: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Order",
  orderSchema
);
 
