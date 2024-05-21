import express from "express";
import {
  addSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  updateSubCategory,
} from "../controllers/subCategoryController.js";
import upload from "../middlewares/uploadMiddleware.js";

const subCategoryRouter = express.Router();

subCategoryRouter.post(
  "/sub-category/add",
  upload.single("image"),
  addSubCategory
);
subCategoryRouter.put(
  "/sub-category/update/:id",
  upload.single("image"),
  updateSubCategory
);
subCategoryRouter.delete("/sub-category/delete/:id", deleteSubCategory);
subCategoryRouter.delete("/sub-category/all", getAllSubCategories);

export default subCategoryRouter;
