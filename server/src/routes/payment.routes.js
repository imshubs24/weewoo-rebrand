const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth.middleware');
const { createRazorpayOrder, verifyPayment } = require("../controllers/payment.controller");

router.post("/create-order", authenticate, createRazorpayOrder);

router.post("/verify", authenticate, verifyPayment);

module.exports = router;