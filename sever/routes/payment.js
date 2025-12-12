import express from "express";
import crypto from "crypto";
import axios from "axios";

const router = express.Router();

router.post("/momo", async (req, res) => {
    const { orderId, amount } = req.body;

    const partnerCode = "MOMOXXXX";
    const accessKey = "ACCESS_KEY";
    const secretKey = "SECRET_KEY";

    const requestId = `${Date.now()}`;
    const orderInfo = `Thanh toan don hang ${orderId}`;
    const redirectUrl = "https://web-cua-ban.com/thanks";
    const ipnUrl = "http://localhost:5000/api/payment/momo/callback";

    const rawSignature =
        `accessKey=${accessKey}&amount=${amount}&extraData=&ipnUrl=${ipnUrl}` +
        `&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}` +
        `&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=captureWallet`;

    const signature = crypto
        .createHmac("sha256", secretKey)
        .update(rawSignature)
        .digest("hex");

    const body = {
        partnerCode,
        requestId,
        amount,
        orderId,
        orderInfo,
        redirectUrl,
        ipnUrl,
        extraData: "",
        requestType: "captureWallet",
        signature,
        lang: "vi",
    };

    try {
        const response = await axios.post(
            "https://test-payment.momo.vn/v2/gateway/api/create",
            body
        );

        return res.json({
            success: true,
            qr: response.data.qrCodeUrl, // URL QR trả về từ Momo
        });

    } catch (error) {
        console.log(error);
        return res.json({ success: false });
    }
});

export default router;
