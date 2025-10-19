// backend/routes/orders.js (Update existing)
const express = require("express");
const {
  createOrder,
  getOrders,
  deleteOrder,
} = require("../controllers/orderController");
const { authenticate, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authenticate, createOrder);
router.get("/", authenticate, getOrders);
router.delete("/:id", authenticate, isAdmin, deleteOrder);

module.exports = router;
