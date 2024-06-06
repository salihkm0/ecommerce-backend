import mongoose from "mongoose";
import slug from "mongoose-slug-generator";

// const options = {
//   separator: "-",
//   lang: "en",
//   truncate: 120,
// };

// mongoose.plugin(slug);

const sizeSchema = new mongoose.Schema({
  size: { type: String, required: true },
  quantity: { type: Number, required: true },
});

// const mainCategory = new mongoose.Schema({
//   name: { type: String, required: true },
//   // slug: { type: String, slug: "name", unique: true },
//   description: {
//     type: String,
//     trim: true,
//   },
// });
const productSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
    },
    title: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      slug: "title",
      unique: true,
    },
    imageUrl: [String],
    // imageKey: {
    //   type: String,
    // },
    description: {
      type: String,
      trim: true,
    },
    brand: {
      type: String,
    },
    // quantity: {
    //   type: Number,
    // },
    sizes: { type: [sizeSchema], required: true },
    price: {
      type: Number,
    },
    offer: {
      type: {
        type: String,
        enum: ["percentage", "amount"],
        default: "percentage",
      },
      value: Number,
    },
    isTaxable: {
      type: Boolean,
      default: false,
    },
    // isStock: {
    //   type: Boolean,
    //   default: true,
    // },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    sold: {
      type: Number,
      default: 0,
    },
    category: {
      //   type: mainCategory,
      type: String,
      required: true,
      enum: ["men", "women", "kids"],
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
    subSubCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubSubCategory",
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
