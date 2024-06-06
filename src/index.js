import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connect } from "../config/db.js";
import userRouter from "../routes/userRoutes.js";
import adminRouter from "../routes/adminRoutes.js";
import sellerRouter from "../routes/sellerRoutes.js";
import cookieParser from "cookie-parser";
import paymentRouter from "../routes/paymentRoutes.js";
const app = express();
const port = process.env.PORT || 3000;
connect();
// http://localhost:5173
// https://ecommerce-frontend-olive-beta.vercel.app
// https://6661ca817d1f5f0adcc78cc8--glistening-kataifi-010c4b.netlify.app
// http://localhost:4173
const corsOptions = {
  origin: "https://ecommerce-frontend-pzmt2rvyd-salih-kms-projects.vercel.app",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/api/v1/", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/", sellerRouter);
app.use("/api/v1/payment", paymentRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
