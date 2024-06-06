import { cloudinaryInstance } from "../config/cloudinary.js";
import Product from "../models/productModel.js";

//! add product
export const addProduct = async (req, res) => {
  console.log("Product Add Hitted");
  // try {
  //   console.log("image : ", req.files);
  //   if (!req.files || req.files.length === 0) {
  //     return res.status(400).json({ message: "No files uploaded", success: false });
  //   }

  //   cloudinaryInstance.uploader.upload(req.file.path, async (err, result) => {
  //     if (err) {
  //       console.log(err, "error");
  //       return res.status(500).json({
  //         success: false,
  //         message: "Error",
  //       });
  //     }
  //     const imageUrl = result.url;
  //   const {
  //     sku,
  //     title,
  //     slug,
  //     price,
  //     description,
  //     brand,
  //     sizes,
  //     offer,
  //     category,
  //     subCategory,
  //     subSubCategory,
  //     seller,
  //   } = req.body;

  //   const skuExist = await Product.findOne({ sku });
  //   if (skuExist) {
  //     return res
  //       .status(400)
  //       .json({ message: "SKU already exist", success: false });
  //   }
  //   const titleExist = await Product.findOne({ title });
  //   if (titleExist) {
  //     return res
  //       .status(400)
  //       .json({ message: "Product already exist", success: false });
  //   }
  //   const product = new Product({
  //     sku,
  //     title,
  //     price,
  //     slug,
  //     description,
  //     brand,
  //     sizes,
  //     offer,
  //     imageUrl,
  //     category,
  //     subCategory,
  //     subSubCategory,
  //     seller,
  //   });
  //   const saveProduct = await product.save();

  //   if (!saveProduct) {
  //     return res
  //       .status(400)
  //       .json({ message: "Product not saved", success: false });
  //   }
  //   console.log(product);
  //   return res
  //     .status(200)
  //     .json({ message: "Product saved successfully", success: true, product });
  // })
  // } catch (error) {
  //   console.log(error, "Something wrong");
  //   res.status(500).json({
  //     message: "Internal Server Error",
  //     success: false,
  //   });
  // }

  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded", success: false });
    }

    // console.log("images :" ,req.files);
    const imageUrls = [];
    for (const file of req.files) {
      const result = await cloudinaryInstance.uploader.upload(file.path);
      console.log("image path :" , result.url);
      imageUrls.push(result.url);
    }

    const {
      sku,
      title,
      slug,
      price,
      description,
      brand,
      sizes,
      offer,
      category,
      subCategory,
      subSubCategory,
      seller,
    } = req.body;

    const skuExist = await Product.findOne({ sku });
    if (skuExist) {
      return res.status(400).json({ message: "SKU already exist", success: false });
    }
    const titleExist = await Product.findOne({ title });
    if (titleExist) {
      return res.status(400).json({ message: "Product already exist", success: false });
    }

    const product = new Product({
      sku,
      title,
      price,
      slug,
      description,
      brand,
      sizes,
      offer,
      imageUrls: imageUrls, // Array of image URLs
      category,
      subCategory,
      subSubCategory,
      seller,
    });

    const saveProduct = await product.save();
    if (!saveProduct) {
      return res.status(400).json({ message: "Product not saved", success: false });
    }

    console.log(product);
    return res.status(200).json({ message: "Product saved successfully", success: true, product });
  } catch (error) {
    console.log(error, "Something wrong");
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

//! get products

export const getAllProducts = async (req, res) => {
  console.log("Get All Product Hitted");
  try {
    const products = await Product.find();

    if (!products) {
      return res
        .status(400)
        .json({ message: "No products found", success: false });
    }
    return res
      .status(200)
      .json({
        message: "Products found successfully",
        success: true,
        products,
      });
  } catch (error) {
    console.log(error, "Something wrong");
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
//! delete product
export const deleteProduct = async (req, res) => {
  console.log("Delete Product Hitted");
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(400)
        .json({ message: "No product found", success: false });
    }
    const deleteProduct = await Product.findByIdAndDelete(id);
    if (!deleteProduct) {
      return res
        .status(400)
        .json({ message: "Product not deleted", success: false });
    }
    return res
      .status(200)
      .json({ message: "Product deleted successfully", success: true ,product});
  } catch (error) {
    console.log(error, "Something wrong");
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
//! update product
export const updateProduct = async (req, res) => {
  console.log("Update Product Hitted");
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(400)
        .json({ message: "No product found", success: false });
    }
    const updateProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updateProduct) {
      return res
        .status(400)
        .json({ message: "Product not updated", success: false });
    }
    return res
      .status(200)
      .json({ message: "Product updated successfully", success: true ,updateProduct});
  } catch (error) {
    console.log(error, "Something wrong");
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
//! get product by id
export const getProductById = async (req, res) => {
  console.log("Get Product by Id Hitted");
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(400)
        .json({ message: "No product found", success: false });
    }
    return res
      .status(200)
      .json({ message: "Product found successfully", success: true, product });
  } catch (error) {
    console.log(error, "Something wrong");
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
