const express = require("express");
const {
  createCategory,
  createProduct,
  createVariant,
  getProducts,
  updateProduct,
  deleteProduct,
  updateVariant,
  deleteVariant,
} = require("../../controllers/productController");
const { authenticate, isAdmin } = require("../../middleware/authMiddleware");

const router = express.Router();

router.post("/categories", authenticate, isAdmin, createCategory);
router.post("/", authenticate, isAdmin, createProduct);
router.put("/:id", authenticate, isAdmin, updateProduct);
router.delete("/:id", authenticate, isAdmin, deleteProduct);
router.post("/variants", authenticate, isAdmin, createVariant);
router.put("/variants/:id", authenticate, isAdmin, updateVariant);
router.delete("/variants/:id", authenticate, isAdmin, deleteVariant);
router.get("/", getProducts); // Public

module.exports = router;
