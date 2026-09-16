require("dotenv").config({
    path: "../../.env",
});

const crypto = require("crypto");

const orderId = "order_TbQ9MD1GOLBHRT";
const paymentId = "pay_test1234";

const signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

console.log(signature);