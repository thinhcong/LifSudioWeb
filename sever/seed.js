const Product = require("./models/Product");

async function seed() {
    await Product.create([
        { name: "Áo Thun Basic", price: 150000, image: "https://via.placeholder.com/150" },
        { name: "Quần Jeans", price: 350000, image: "https://via.placeholder.com/150" },
        { name: "Giày Sneaker", price: 800000, image: "https://via.placeholder.com/150" },
        { name: "Mũ Lưỡi Trai", price: 90000, image: "https://via.placeholder.com/150" },
    ]);

    console.log("Seed dữ liệu thành công!");
}

seed();
