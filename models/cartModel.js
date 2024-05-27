import mongoose from "mongoose";

// Cart Item Schema
const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: Number,
  price: {
    type: Number,
    default: 0,
  },
  // totalPrice: {
  //   type: Number,
  //   default: 0,
  // },
  // priceWithTax: {
  //   type: Number,
  //   default: 0,
  // },
  // totalTax: {
  //   type: Number,
  //   default: 0,
  // },
  image: {
    type: String,
  },
  //   status: {
  //     type: String,
  //     default: "Not_processed",
  //     enum: ["Not_processed", "Processing", "Shipped", "Delivered", "Cancelled"],
  //   },
});

export const CartItem = mongoose.model("CartItem", cartItemSchema);

// Cart Schema

const cartSchema = new mongoose.Schema(
  {
    products: [cartItemSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    totalQuantity:{
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    totalTax: {
      type: Number,
      default: 0,
    },
    totalDiscount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Cart = mongoose.model("Cart", cartSchema);
