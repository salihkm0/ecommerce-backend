import express from "express";
import { addBrand } from "../controllers/brandController.js";
import upload from "../middlewares/uploadMiddleware.js";

const sellerRouter = express.Router()

sellerRouter.post('/seller/add-brand',upload.single("logo") ,addBrand)

export default sellerRouter