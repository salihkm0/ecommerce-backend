import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    //   username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
    imageUrl: { type: String },
    phoneNumber: String,
    role: { type: String, default: "customer", enum: ["customer", "seller"] },
    // brand: { type: mongoose.Schema.ObjectId, ref: "Brand", default: null },
    // isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
