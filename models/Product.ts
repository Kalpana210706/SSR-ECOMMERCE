import mongoose, { Schema, models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
  type: String,
  required: true,
},

stock: {
  type: Number,
  required: true,
  default: 0,
},

sales: {
  type: Number,
  default: 0,
},

  },
  { timestamps: true }
);

// Next.js hot reload fix
const Product = models.Product || mongoose.model("Product", ProductSchema);

export default Product;
