import express from "express";
import { signup } from "../controllers/adminController.js";
import { signin } from "../controllers/adminController.js";

const adminRouter = express.Router()

adminRouter.post("/signup" , signup)
adminRouter.post("/signin" , signin)


export default adminRouter