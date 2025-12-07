const mongoose = require("../db");

const OrderSchema = new mongoose.Schema({
    cart: Array,
    total: Number,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", OrderSchema);
