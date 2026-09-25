const express = require('express');
const router = express.Router();
const { getMyOrders, getOrderById, cancelOrder, updateOrderStatus, getAllOrders } = require('../controllers/order.controller')
const authenticate = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');

// order routes

router.get('/', authenticate, getMyOrders);

router.get('/admin', authenticate, authorize("admin"), getAllOrders);

router.put('/cancel/:id', authenticate, cancelOrder);

router.put('/status/:id', authenticate, authorize("admin"), updateOrderStatus);

router.get('/:id', authenticate, getOrderById);

module.exports = router;