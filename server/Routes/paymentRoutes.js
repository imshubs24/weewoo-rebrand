const express = require('express');
const router = express.Router();
const auth = require('../middleware/authentication');
const { checkoutSession, paymentSuccess } = require('../Controllers/paymentControllers');

router.post('/create-checkout-session', auth, checkoutSession);
router.post('/payment-success', auth, paymentSuccess);

module.exports = router;