import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import { connect } from "../config/db.js";
import userRouter from "../routes/userRoutes.js";
import adminRouter from "../routes/adminRoutes.js";
import sellerRouter from "../routes/sellerRoutes.js";
import cookieParser from "cookie-parser";
const app = express();
const port = process.env.PORT || 3000;
connect();
// http://localhost:5173
// https://ecommerce-frontend-olive-beta.vercel.app/
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

dotenv.config();
app.use(express.json());
app.use(cookieParser())
app.use(cors(corsOptions));
app.use("/api/v1/", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/", sellerRouter);




app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
