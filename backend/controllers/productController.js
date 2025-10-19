// backend/controllers/productController.js
import { getPool } from "../config/mysql.js";
const pool = getPool();
import ProductVariant from "../models/ProductVariant.js";

export const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    await pool.query("INSERT INTO Categories (name) VALUES (?)", [name]);
    res.status(201).json({ message: "Category created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const [categories] = await pool.query("SELECT * FROM Categories");
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// backend/controllers/productController.js
export const createProduct = async (req, res) => {
  const { name, category_id, base_price } = req.body;
  
  // Files will now have proper extensions like: default_image-1234567890.jpg
  const default_image =
    req.files && req.files.default_image
      ? `/uploads/${req.files.default_image[0].filename}`
      : "";
  
  const additional_images =
    req.files && req.files.additional_images
      ? req.files.additional_images.map((f) => `/uploads/${f.filename}`)
      : [];
  
  try {
    const [result] = await pool.query(
      "INSERT INTO Products (name, category_id, default_image, additional_images, base_price) VALUES (?, ?, ?, ?, ?)",
      [
        name,
        category_id,
        default_image,
        JSON.stringify(additional_images),
        base_price,
      ]
    );
    res.status(201).json({ product_id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const [products] = await pool.query("SELECT * FROM Products");
    const variants = await ProductVariant.find();
    res.json({ products, variants });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const [products] = await pool.query("SELECT * FROM Products WHERE id = ?", [
      id,
    ]);
    const product = products[0];
    const variants = await ProductVariant.find({ product_id: parseInt(id) });
    res.json({ product, variants });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, category_id, base_price, kept_additional } = req.body;
  let default_image = req.body.existing_default || "";
  if (req.files && req.files.default_image) {
    default_image = `/uploads/${req.files.default_image[0].filename}`;
  }
  const parsedKept = kept_additional ? JSON.parse(kept_additional) : [];
  const new_additional =
    req.files && req.files.additional_images
      ? req.files.additional_images.map((f) => `/uploads/${f.filename}`)
      : [];
  const additional_images = [...parsedKept, ...new_additional];
  try {
    await pool.query(
      "UPDATE Products SET name = ?, category_id = ?, default_image = ?, additional_images = ?, base_price = ? WHERE id = ?",
      [
        name,
        category_id,
        default_image,
        JSON.stringify(additional_images),
        base_price,
        id,
      ]
    );
    res.json({ message: "Product updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM Products WHERE id = ?", [id]);
    await ProductVariant.deleteMany({ product_id: parseInt(id) });
    res.json({ message: "Product and variants deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createVariant = async (req, res) => {
  const { product_id, variant_name, price, stock, attributes } = req.body;
  const images = req.files
    ? req.files.map((f) => `/uploads/${f.filename}`)
    : [];
  try {
    const variant = new ProductVariant({
      product_id: parseInt(product_id),
      variant_name,
      price: parseFloat(price),
      stock: parseInt(stock),
      attributes: JSON.parse(attributes),
      images,
    });
    await variant.save();
    res.status(201).json(variant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateVariant = async (req, res) => {
  const { id } = req.params;
  const { variant_name, price, stock, attributes, kept_images } = req.body;
  const new_images = req.files
    ? req.files.map((f) => `/uploads/${f.filename}`)
    : [];
  const images = [...(JSON.parse(kept_images) || []), ...new_images];
  try {
    const variant = await ProductVariant.findByIdAndUpdate(
      id,
      {
        variant_name,
        price: parseFloat(price),
        stock: parseInt(stock),
        attributes: JSON.parse(attributes),
        images,
      },
      { new: true }
    );
    if (!variant) return res.status(404).json({ message: "Variant not found" });
    res.json(variant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteVariant = async (req, res) => {
  const { id } = req.params;
  try {
    await ProductVariant.findByIdAndDelete(id);
    res.json({ message: "Variant deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
