import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  imageUrl: {
    type: String,
  },
  // slug: { type: String, required: true, unique: true },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

const SubCategory = mongoose.model("SubCategory" ,subCategorySchema)

export default SubCategory