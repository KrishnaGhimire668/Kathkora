import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    price: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    stock: {
      type: Number,
      default: 0,
    },
    
    sizes: {
      type: [String],
      default: ["S", "M", "L", "XL"]
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);