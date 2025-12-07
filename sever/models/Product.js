const mongoose = require("../db");

const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String
});

module.exports = mongoose.model("Product", ProductSchema);
