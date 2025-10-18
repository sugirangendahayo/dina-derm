const express = require("express");
const { createOrder, getOrders } = require("../controllers/orderController");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authenticate, createOrder);
router.get("/", authenticate, getOrders);

module.exports = router;
