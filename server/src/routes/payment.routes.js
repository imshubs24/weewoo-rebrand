const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth.middleware');
const { checkoutSession, paymentSuccess } = require('../controllers/payment.controller');

router.post('/create-checkout-session', authenticate, checkoutSession);

router.get('/payment-success', authenticate, paymentSuccess);

module.exports = router;