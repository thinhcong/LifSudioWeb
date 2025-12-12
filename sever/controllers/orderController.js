const Order = require("../models/Order");

// Tạo đơn hàng
exports.createOrder = async (req, res) => {
    const { cart, total } = req.body;

    const newOrder = new Order({ cart, total });
    await newOrder.save();

    res.json({ 
        success: true,
        message: "Đặt hàng thành công!",
        orderId: newOrder._id              // <- gửi ID về frontend
    });
};

// Lấy tất cả đơn hàng
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ date: -1 });
        res.json({ success: true, data: orders });
    } catch (err) {
        res.status(500).json({ success: false, message: "Lỗi server", error: err });
    }
};

// Lấy đúng 1 đơn hàng theo ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ success: false, message: "Không tìm thấy đơn hàng" });
        }

        res.json({ success: true, data: order });

    } catch (err) {
        res.status(500).json({ success: false, message: "Lỗi server", error: err });
    }
};
