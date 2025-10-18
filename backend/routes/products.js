const express = require("express");
const {
  createCategory,
  createProduct,
  createVariant,
  getProducts,
} = require("../controllers/productController");
const { authenticate, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/categories", authenticate, isAdmin, createCategory);
router.post("/", authenticate, isAdmin, createProduct);
router.post("/variants", authenticate, isAdmin, createVariant);
router.get("/", getProducts); // Public for now; protect if needed

module.exports = router;
