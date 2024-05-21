import  express from "express";
import { checkUser, getAllUsers, getUser, logout, signin, signup, updateUser } from "../controllers/userController.js";
import authenticateUser from "../middlewares/userMiddleware.js";

const userRouter = express.Router();

userRouter.post("/signup" ,signup)
userRouter.post("/signin" , signin)
userRouter.get("/get-user" , getUser)
userRouter.get("/all-users" , getAllUsers)
userRouter.put("/update-user/:id" , updateUser)
userRouter.post('/logout',logout)

// userRouter.get("/check" ,authenticateUser,checkUser)

export default userRouter;