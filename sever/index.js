const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/images', express.static('images')); 

app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/order", require("./routes/orderRoutes"));
app.use("/api/payment", require("./routes/payment"));
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server chạy tại http://0.0.0.0:${PORT}`);
});
