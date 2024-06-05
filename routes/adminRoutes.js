import express from "express";
import { logout, signup ,signin, adminProfile} from "../controllers/adminController.js";
import { getAllUsers } from "../controllers/userController.js";
import authenticateAdmin from "../middlewares/adminMiddleware.js";
import preventAuthenticatedAccess from "../middlewares/authMiddleware.js";


const adminRouter = express.Router()

adminRouter.post("/signup" ,preventAuthenticatedAccess, signup)
adminRouter.post("/signin" ,preventAuthenticatedAccess, signin)
adminRouter.post('/logout',logout)
adminRouter.get("/all-users", authenticateAdmin,getAllUsers)
adminRouter.get("/profile",authenticateAdmin, adminProfile)
export default adminRouter