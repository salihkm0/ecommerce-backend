import express from "express";
import { logout, signup ,signin, adminProfile} from "../controllers/adminController.js";
import { getAllUsers } from "../controllers/userController.js";
import authenticateAdmin from "../middlewares/adminMiddleware.js";
import preventAuthenticatedAccess from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";


const adminRouter = express.Router()

adminRouter.post("/register",upload.single("image"), signup)
adminRouter.post("/signin" , signin)
adminRouter.post('/logout',logout)
adminRouter.get("/all-users", authenticateAdmin,getAllUsers)
adminRouter.get("/profile",authenticateAdmin, adminProfile)
export default adminRouter