import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    type: { type: String, enum: ["percentage", "price"], required: true },
    value: { type: Number, required: true },
    expiryDate: { type: Date, default : Date.now() * 60 * 60 * 60},
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;
