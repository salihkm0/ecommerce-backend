import express from "express";
import {
  addAddress,
  deleteAddress,
  getUserAddress,
  updateAddress,
} from "../controllers/addressController.js";
import {
  addToCart,
  checkout,
  deleteCart,
  deleteCartProduct,
  getCart,
  updateCart,
} from "../controllers/cartController.js";
import { getAllOrders } from "../controllers/orderController.js";
import {
  addReview,
  deleteReview,
  getReviewByProduct,
  getUserReviews,
  updateReview,
} from "../controllers/reviewController.js";
import {
  checkUser,
  getUser,
  logout,
  signin,
  signup,
  updateUser,
  userProfile,
} from "../controllers/userController.js";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../controllers/wishlistController.js";
import preventAuthenticatedAccess from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";
import authenticateUser from "../middlewares/userMiddleware.js";

const userRouter = express.Router();

userRouter.post("/signup", upload.single("image"), signup);
userRouter.post("/signin", signin);
userRouter.get("/get-user", authenticateUser, getUser);
userRouter.put("/update-user/:id", authenticateUser, updateUser);
userRouter.get("/profile", authenticateUser, userProfile);
userRouter.post("/logout", logout);

userRouter.post("/address/add", authenticateUser, addAddress);
userRouter.get("/address", authenticateUser, getUserAddress);
userRouter.put("/address/update/:addressId", authenticateUser, updateAddress);
userRouter.delete(
  "/address/dalete/:addressId",
  authenticateUser,
  deleteAddress
);

userRouter.get("/wishlist", authenticateUser, getWishlist);
userRouter.post("/wishlist/add", authenticateUser, addToWishlist);
userRouter.delete("/wishlist", authenticateUser, removeFromWishlist);

userRouter.post("/add-cart/:id", authenticateUser, addToCart);
userRouter.get("/cart", authenticateUser, getCart);
userRouter.post("/update-cart", authenticateUser, updateCart);
userRouter.delete("/delete-cart", authenticateUser, deleteCart);
userRouter.delete(
  "/delete-cart-product/:id",
  authenticateUser,
  deleteCartProduct
);
userRouter.post("/checkout", authenticateUser, checkout);
userRouter.get("/my-orders", authenticateUser, getAllOrders);

userRouter.get("/my-reviews", authenticateUser, getUserReviews);
// userRouter.get("/product/my-reviews/", authenticateUser, getReviewByProduct);
userRouter.post("/my-reviews/add", authenticateUser, addReview);
userRouter.put("/my-reviews/update/:id", authenticateUser, updateReview);
userRouter.delete("/my-reviews/delete/:id", authenticateUser, deleteReview);

userRouter.get("/check-user", preventAuthenticatedAccess, checkUser);

export default userRouter;
