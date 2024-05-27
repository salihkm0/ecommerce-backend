import  express from "express";
import { addToCart, checkout, deleteCart, deleteCartProduct, getCart, updateCart } from "../controllers/cartController.js";
import { checkUser, getAllUsers, getUser, logout, signin, signup, updateUser, userProfile } from "../controllers/userController.js";
import authenticateAdmin from "../middlewares/adminMiddleware.js";
import authenticateUser from "../middlewares/userMiddleware.js";

const userRouter = express.Router();

userRouter.post("/signup" ,signup)
userRouter.post("/signin" , signin)
userRouter.get("/get-user",authenticateUser, getUser)
userRouter.put("/update-user/:id",authenticateUser , updateUser)
userRouter.get("/profile",authenticateUser, userProfile)
userRouter.post('/logout',logout)

userRouter.post('/add-cart/:id',authenticateUser, addToCart)
userRouter.get('/cart',authenticateUser, getCart)
userRouter.post('/update-cart',authenticateUser, updateCart)
userRouter.delete('/delete-cart',authenticateUser, deleteCart)
userRouter.delete('/delete-cart-product/:id',authenticateUser, deleteCartProduct)
userRouter.post('/checkout',authenticateUser, checkout)

export default userRouter;