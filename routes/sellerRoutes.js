import express from "express";
import { addBrand } from "../controllers/brandController.js";
import {
  addNewCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/categoryController.js";
import {
  addCoupon,
  deleteCoupon,
  getAllCoupons,
  getSingleCoupon,
  updateCoupon,
} from "../controllers/couponController.js";
import { addProduct, getAllProducts } from "../controllers/productController.js";
import {
  addSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  updateSubCategory,
} from "../controllers/subCategoryController.js";
import authenticateSeller from "../middlewares/sellerMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const sellerRouter = express.Router();
// brand
sellerRouter.post(
  "/seller/add-brand",
  upload.single("logo"),
  authenticateSeller,
  addBrand
);

//category
sellerRouter.post(
  "/category/add",
  upload.single("image"),
  authenticateSeller,
  addNewCategory
);
sellerRouter.put(
  "/category/update/:id",
  upload.single("image"),
  authenticateSeller,
  updateCategory
);
sellerRouter.get("/category/:id", authenticateSeller, getCategoryById);
sellerRouter.get("/category/all", authenticateSeller, getAllCategories);
sellerRouter.delete("/category/delete/:id", authenticateSeller, deleteCategory);

//sub category
sellerRouter.post(
  "/sub-category/add",
  upload.single("image"),
  authenticateSeller,
  addSubCategory
);

sellerRouter.put(
  "/sub-category/update/:id",
  upload.single("image"),
  authenticateSeller,
  updateSubCategory
);
sellerRouter.delete(
  "/sub-category/delete/:id",
  authenticateSeller,
  deleteSubCategory
);
sellerRouter.delete(
  "/sub-category/all",
  authenticateSeller,
  getAllSubCategories
);

// coupon

sellerRouter.post("/coupon/add", authenticateSeller, addCoupon);
sellerRouter.put("/coupon/update/:id", authenticateSeller, updateCoupon);
sellerRouter.get("/coupon/all", authenticateSeller, getAllCoupons);
sellerRouter.get("/coupon", authenticateSeller, getSingleCoupon);
sellerRouter.delete("/coupon/delete/:id", authenticateSeller, deleteCoupon);

sellerRouter.post("/product/add" ,authenticateSeller,addProduct)
sellerRouter.get("/product/all" ,authenticateSeller,getAllProducts)


export default sellerRouter;
