const express = require('express');
const router = express.Router();
const { newOrder, getOrders } = require('../Controllers/orderController')
const auth = require('../middleware/authentication');

// order routes
router.post('/neworder', auth, newOrder);
router.get('/getorder', auth, getOrders);

module.exports = router;