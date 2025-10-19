// backend/models/ProductVariant.js
import mongoose from "mongoose";

const productVariantSchema = new mongoose.Schema({
  product_id: { type: Number, required: true },
  variant_name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  attributes: {
    type: Map,
    of: String,
  },
  images: [String],
});

const ProductVariant = mongoose.model("ProductVariant", productVariantSchema);

export default ProductVariant;