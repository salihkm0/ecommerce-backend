import { cloudinaryInstance } from "../config/cloudinary.js";
import SubCategory from "../models/subCategoryModel.js";

//! add sub category
export const addSubCategory = (req, res) => {
  console.log("Add New Sub Category Hitted");

  try {
    if (!req.file) {
      return res.send("file is not visible");
    }
    cloudinaryInstance.uploader.upload(req.file.path, async (err, result) => {
      if (err) {
        console.log(err, "error");
        return res.status(500).json({
          success: false,
          message: "Error",
        });
      }
      const imageUrl = result.url;
      const { name, description, parent } = req.body;

      //check the name
      if (!name) {
        return res.status(400).json({ error: "You must enter name." });
      }

      // category exists
      const categoryExist = await SubCategory.findOne({ name });

      if (categoryExist) {
        return res
          .status(400)
          .json({ message: "Category already exist", success: false });
      }
      // create new Category

      const newCategory = new SubCategory({
        name: name,
        parent: parent,
        description: description,
        imageUrl: imageUrl,
      });

      const newCategoryCreated = await newCategory.save();
      if (!newCategoryCreated) {
        return res.json({ message: "Category not created", success: false });
      }
      return res.json({
        newCategoryCreated,
        message: "Category created successfully",
        success: true,
      });
    });
  } catch (error) {
    console.log(error, "Something wrong");
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

//! update sub category

export const updateSubCategory = async (req, res) => {
  console.log("Hitted Update Sub Category");
  try {
    const category = await SubCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!category) {
      return res.status(400).json({
        message: "No category found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Category updated",
      success: true,
      category: category,
    });
  } catch (error) {
    console.log(error, "Something wrong");
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

//! delete Sub category

export const deleteSubCategory = async (req, res) => {
  console.log("Hitted delete Sub Category");
  try {
    const { id } = req.params;
    const category = await SubCategory.findByIdAndDelete(id);
    if (!category) {
      return res.json({ message: "Category not deleted", success: false });
    }
    return res.json({
      message: "Category deleted successfully",
      success: true,
      category,
    });
  } catch (error) {
    console.log(error, "Something wrong");
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

//! get all sub categories

export const getAllSubCategories = async (req, res) => {
  console.log("Hitted Get All Sub Category");
  try {
    const subCategories = await SubCategory.find();
    if (!subCategories) {
      return res.json({ message: "No sub categories found", success: false });
    }
    return res.json({
      message: "Sub categories found successfully",
      success: true,
      subCategories : subCategories,
    });
  } catch (error) {
    console.log(error, "Something wrong");
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
