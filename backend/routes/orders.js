// backend/routes/orders.js (Update existing)
import express from "express";
import {
  createOrder,
  getOrders,
  deleteOrder,
} from "../controllers/orderController.js";
import { authenticate, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticate, createOrder);
router.get("/", authenticate, getOrders);
router.delete("/:id", authenticate, isAdmin, deleteOrder);

export default router;
