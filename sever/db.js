require("dotenv").config();     // Đọc biến môi trường từ .env
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Kết nối MongoDB Atlas thành công!"))
  .catch(err => console.log("Lỗi kết nối MongoDB:", err));

module.exports = mongoose;
