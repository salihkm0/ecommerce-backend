import Product from "../models/productModel.js";
import Review from "../models/reviewModel.js";

// !add review
export const addReview = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(400)
        .json({ message: "Product not found", success: false });
    }
    const { rating, review } = req.body;

    const newReview = new Review({
      user: req.user.data,
      product: req.params.id,
      rating: rating,
      review: review,
    });

    await newReview.save();
    return res.json({
      newCategoryCreated,
      message: "Review created successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

//!delete
export const deleteReview = async (req, res) => {
  try {
    const deleteReview = await Review.findByIdAndDelete(req.params.id);
    if (!deleteReview) {
      return res
        .status(400)
        .json({ message: "Review not found", success: false });
    }
    res.status(200).json({ message: "Review deleted", success: true });
  } catch (error) {
    res.status(500).json(error);
  }
};

//! update
export const updateReview = async (req, res) => {
  try {
    const updateReview = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updateReview) {
      return res
        .status(400)
        .json({ message: "Review not found", success: false });
    }
    res.status(200).json({ message: "Review updated", success: true });
  } catch (error) {
    res.status(500).json(error);
  }
};

//!get all review
export const getAllReview = async (req, res) => {
  try {
    const review = await Review.find();
    if (!review) {
      return res
        .status(400)
        .json({ message: "Review not found", success: false });
    }
    res.status(200).json({ message: "Review found", success: true, review });
  } catch (error) {
    res.status(500).json(error);
  }
};

//! get user review 

export const getUserReviews = async (req, res) => {
  try {
    const userId = req.user.data
    const review = await Review.findOne({user : userId});
    if (!review) {
      return res
        .status(400)
        .json({ message: "Review not found", success: false });
    }
    res.status(200).json({ message: "Review found", success: true, review });
  } catch (error) {
    res.status(500).json(error);
  }
};



//! get review by product
export const getReviewByProduct = async (req, res) => {
  try {
    const review = await Review.find({ product: req.params.id });
    if (!review) {
      return res
        .status(400)
        .json({ message: "Review not found", success: false });
    }
    res.status(200).json({ message: "Review found", success: true, review });
  } catch (error) {
    res.status(500).json(error);
  }
};


