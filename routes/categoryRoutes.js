import express from "express";
import {
  addNewCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/categoryController.js";
import upload from "../middlewares/uploadMiddleware.js";

const categoryRouter = express.Router();

categoryRouter.post("/category/add", upload.single("image"), addNewCategory);
categoryRouter.put(
  "/category/update/:id",
  upload.single("image"),
  updateCategory
);
categoryRouter.get("/category/:id", getCategoryById);
categoryRouter.get("/category/all", getAllCategories);
categoryRouter.delete("/category/delete/:id", deleteCategory);

export default categoryRouter;
