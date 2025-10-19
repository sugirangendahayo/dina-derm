const pool = require("../config/mysql")();
const ProductVariant = require("../models/ProductVariant");

exports.createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    await pool.query("INSERT INTO Categories (name) VALUES (?)", [name]);
    res.status(201).json({ message: "Category created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createProduct = async (req, res) => {
  const { name, category_id, default_image } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO Products (name, category_id, default_image) VALUES (?, ?, ?)",
      [name, category_id, default_image]
    );
    res.status(201).json({ product_id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createVariant = async (req, res) => {
  const { product_id, variant_name, price, stock, attributes, images } =
    req.body;
  try {
    const variant = new ProductVariant({
      product_id,
      variant_name,
      price,
      stock,
      attributes,
      images,
    });
    await variant.save();
    res.status(201).json(variant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const [products] = await pool.query("SELECT * FROM Products");
    const variants = await ProductVariant.find(); // Fetch all variants
    // Merge logic if needed (e.g., group variants by product_id)
    res.json({ products, variants });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, category_id, default_image } = req.body;
    try {
      await pool.query('UPDATE Products SET name = ?, category_id = ?, default_image = ? WHERE id = ?', [name, category_id, default_image, id]);
      res.json({ message: 'Product updated' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
      await pool.query('DELETE FROM Products WHERE id = ?', [id]);
      await ProductVariant.deleteMany({ product_id: parseInt(id) });
      res.json({ message: 'Product and variants deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.updateVariant = async (req, res) => {
    const { id } = req.params;
    const { variant_name, price, stock, attributes, images } = req.body;
    try {
      const variant = await ProductVariant.findByIdAndUpdate(id, { variant_name, price, stock, attributes, images }, { new: true });
      if (!variant) return res.status(404).json({ message: 'Variant not found' });
      res.json(variant);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.deleteVariant = async (req, res) => {
    const { id } = req.params;
    try {
      await ProductVariant.findByIdAndDelete(id);
      res.json({ message: 'Variant deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
