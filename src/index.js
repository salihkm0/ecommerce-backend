import express from "express";
import dotenv from "dotenv";
import { connect } from "../config/db.js";
import userRouter from "../routes/userRoutes.js";
import categoryRouter from "../routes/categoryRoutes.js";
import subCategoryRouter from "../routes/subCategoryRoutes.js";
import couponRouter from "../routes/couponRoutes.js";
import adminRouter from "../routes/adminRoutes.js";
import sellerRouter from "../routes/sellerRoutes.js";
const app = express();
const port = process.env.PORT || 3000;
connect();

dotenv.config();
app.use(express.json());

app.use("/api/v1/", userRouter);
app.use("/api/v1/", categoryRouter);
app.use("/api/v1/", subCategoryRouter);
app.use("/api/v1/", couponRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/", sellerRouter);




app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
