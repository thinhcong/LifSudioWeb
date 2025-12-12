const express = require("express");
const router = express.Router();
const { createOrder, getOrders, getOrderById } = require("../controllers/orderController");

// Tạo đơn hàng
router.post("/", createOrder);

// Lấy tất cả đơn hàng
router.get("/", getOrders);

// Lấy 1 đơn theo ID
router.get("/:id", getOrderById);

module.exports = router;
