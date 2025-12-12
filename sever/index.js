const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 5000;

// ✅ REQUIRE ROUTES (BẮT BUỘC)
const productRoutes = require("./routes/productRoutes");
const orderRoutes   = require("./routes/orderRoutes");
const paymentModule = require("./routes/payment");
const paymentRoutes = paymentModule.default || paymentModule;

// 🔍 DEBUG
console.log("productRoutes:", productRoutes);
console.log("orderRoutes:", orderRoutes);
console.log("paymentRoutes:", paymentRoutes);

// Middleware
app.use(cors());
app.use(express.json());
app.use('/images', express.static('images'));

// Routes
app.use("/api/products", productRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/payment", paymentRoutes);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server chạy tại http://0.0.0.0:${PORT}`);
});
