const mongoose = require("mongoose");

const productVariantSchema = new mongoose.Schema({
  product_id: { type: Number, required: true }, // References MySQL product id
  variant_name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  attributes: {
    size: String,
    scent: String,
    // Add more as needed
  },
  images: [String],
});

module.exports = mongoose.model("ProductVariant", productVariantSchema);
