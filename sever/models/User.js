const mongoose = require("../db"); // Import kết nối db cũ của bạn
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Vui lòng nhập tên"],
    },
    email: {
        type: String,
        required: [true, "Vui lòng nhập email"],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Email không hợp lệ",
        ],
    },
    password: {
        type: String,
        required: [true, "Vui lòng nhập mật khẩu"],
        minlength: 6,
        select: false, // Không trả về password khi query bình thường
    },
    role: {
        type: String,
        default: "user", // user hoặc admin
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

// Mã hóa mật khẩu trước khi lưu
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Phương thức so sánh mật khẩu
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Phương thức tạo token reset password
UserSchema.methods.getResetPasswordToken = function () {
    // Tạo token ngẫu nhiên
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hash token và lưu vào field resetPasswordToken
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    // Token hết hạn sau 10 phút
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

module.exports = mongoose.model("User", UserSchema);