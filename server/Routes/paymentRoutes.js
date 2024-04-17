const express = require('express');
const router = express.Router();
const auth = require('../middleware/authentication');
const { checkoutSession } = require('../Controllers/paymentControllers');

router.post('/create-checkout-session', auth, checkoutSession);

module.exports = router;