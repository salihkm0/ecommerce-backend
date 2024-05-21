import Coupon from "../models/couponModel.js";

//! add coupon
export const addCoupon = async (req, res) => {
  console.log("Add coupon Hitted");
  try {
    const { code, type, value, expiryDate, isActive } = req.body;
    const couponExist = await Coupon.findOne({ code });

    if (couponExist) {
      return res
        .status(400)
        .json({ message: "Coupon already exist", success: false });
    }
    const coupon = await Coupon.create({
      code,
      type,
      value,
      expiryDate,
      isActive,
    });

    if (!coupon) {
      return res
        .status(400)
        .json({ message: "Coupon not created", success: false });
    }
    return res.status(200).json({
      message: "Coupon added successfully",
      success: true,
      coupon: coupon,
    });
  } catch (error) {
    console.log(error, "Something wrong");
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
//! get all coupons
export const getAllCoupons = async (req, res) => {
  console.log("Get all coupons Hitted");
  try {
    const coupons = await Coupon.find();
    if (coupons.length === 0) {
      return res.status(400).json({
        message: "Coupons not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Coupons found",
      success: true,
      coupons: coupons,
    });
  } catch (error) {
    console.log(error, "Something wrong");
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
//! get single coupon
export const getSingleCoupon = async (req, res) => {
  console.log("Get single coupon Hitted");
  try {
    const {code} = req.body
    const coupon = await Coupon.findOne({code});
    if (!coupon) {
      return res.status(400).json({
        message: "Coupon not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Coupon found",
      success: true,
      coupon: coupon,
    });
  } catch (error) {
    console.log(error, "Something wrong");
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
//! delete coupon
export const deleteCoupon = async (req, res) => {
  console.log("Delete coupon Hitted");
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);
    if (!coupon) {
      return res.status(400).json({
        message: "Coupon not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Coupon deleted",
      success: true,
      coupon: coupon,
    });
  } catch (error) {
    console.log(error, "Something wrong");
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
//! update coupon
export const updateCoupon = async (req, res) => {
  console.log("Update coupon Hitted");
  try {
    const coupon = await Coupon.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!coupon) {
      return res.status(400).json({
        message: "Coupon not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Coupon updated",
      success: true,
      coupon: coupon,
    });
  } catch (error) {
    console.log(error, "Something wrong");
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

