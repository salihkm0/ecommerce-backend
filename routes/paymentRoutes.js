import express from "express";
import dotenv from "dotenv";
import crypto from "crypto";
import razorpayInstance from "../config/payment.js";
import Payment from "../models/paymentModel.js";

dotenv.config();

const paymentRouter = express.Router();

//! payment router

paymentRouter.post("/", (req, res) => {
  console.log("hitted payment");
  const { amount } = req.body;

//   try {
//     const options = {
//       amount: Number(amount * 100),
//       currency: "INR",
//       receipt: crypto.randomBytes(10).toString("hex"),
//     };

//     razorpayInstance.orders.create(options, (error, order) => {
//       if (error) {
//         console.log(error);
//         return res.status(500).json({ message: "somthing went wrong!" });
//       }
//       res.status(200).json({ data: order });
//       console.log('order :' ,order);
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error!" });
//     console.log(error);
//   }
});

//!Verifying the payment

paymentRouter.post("/verify", async (req, res) => {
  console.log("hitted verify");

//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//     req.body;
//   try {
//     const sign = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedSign = crypto
//       .createHmac("sha256", process.env.KEY_SECRET)
//       .update(sign.toString())
//       .digest("hex");

//     const isAuthentic = expectedSign === razorpay_signature;
//     console.log(isAuthentic);

//     if (isAuthentic) {
//       const payment = new Payment({
//         razorpay_order_id,
//         razorpay_payment_id,
//         razorpay_signature,
//       });
//       await Payment.save();
//       res.json({ message: "Payment Successfully" });
//     }

//     if (razorpay_signature == expectedSign) {
//       return res.status(200).json({ message: "Payment verified successfully" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error!" });
//     console.log(error);
//   }
});

export default paymentRouter;