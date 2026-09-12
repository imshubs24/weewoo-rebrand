const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders, getOrderById, cancelOrder, updateOrderStatus } = require('../controllers/order.controller')
const authenticate = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');

// order routes
router.post('/', authenticate, createOrder);

router.get('/', authenticate, getMyOrders);

router.put('/cancel/:id', authenticate, cancelOrder);

router.put('/status/:id', authenticate, authorize("admin"), updateOrderStatus);

router.get('/:id', authenticate, getOrderById);

module.exports = router;