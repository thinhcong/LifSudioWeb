const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
    const { cart, total } = req.body;

    const newOrder = new Order({ cart, total });
    await newOrder.save();

    res.json({ success: true, message: "Đặt hàng thành công & đã lưu vào MongoDB!" });
};
