import express from "express";
import {
  createCategory,
  createProduct,
  createVariant,
  getProducts,
  updateProduct,
  deleteProduct,
  updateVariant,
  deleteVariant,
} from "../controllers/productController.js";
import { authenticate, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/categories", authenticate, isAdmin, createCategory);
router.post("/", authenticate, isAdmin, createProduct);
router.put("/:id", authenticate, isAdmin, updateProduct);
router.delete("/:id", authenticate, isAdmin, deleteProduct);
router.post("/variants", authenticate, isAdmin, createVariant);
router.put("/variants/:id", authenticate, isAdmin, updateVariant);
router.delete("/variants/:id", authenticate, isAdmin, deleteVariant);
router.get("/", getProducts); // Public

export default router;
