// server/index.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Cho phép Frontend gọi API
app.use(express.json());

// Dữ liệu giả lập (Database)
const products = [
    { id: 1, name: "Áo Thun Basic", price: 150000, image: "https://via.placeholder.com/150" },
    { id: 2, name: "Quần Jeans", price: 350000, image: "https://via.placeholder.com/150" },
    { id: 3, name: "Giày Sneaker", price: 800000, image: "https://via.placeholder.com/150" },
    { id: 4, name: "Mũ Lưỡi Trai", price: 90000, image: "https://via.placeholder.com/150" },
];

// API Lấy danh sách sản phẩm
app.get('/api/products', (req, res) => {
    res.json(products);
});

// API Đặt hàng (Giả lập)
app.post('/api/order', (req, res) => {
    const { cart, total } = req.body;
    console.log("Đơn hàng mới:", cart);
    // Ở đây bạn sẽ lưu vào database thật
    res.json({ success: true, message: "Đặt hàng thành công!" });
});

app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});