// server/index.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Cho phép Frontend gọi API
app.use(express.json());
app.use('/images', express.static('images')); 
// Dữ liệu giả lập (Database)
const products = [
    { id: 1, name: "Áo Thun BROKENBLADE", price: 150000, image: "http://localhost:5000/images/BROKENBLADE1.jpg" },
    { id: 2, name: "Áo Thun LIFSTU", price: 150000, image: "https://via.placeholder.com/150" },
    { id: 3, name: "Áo Thun LS", price: 150000, image: "https://via.placeholder.com/150" },
    { id: 4, name: "Áo Thun RALLY", price: 150000, image: "https://via.placeholder.com/150" },
    { id: 5, name: "Áo Thun RICHWRLD", price: 150000, image: "https://via.placeholder.com/150" },
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