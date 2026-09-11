const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth.middleware');
const authorize = require("../middleware/role.middleware")
const { createFood, getAllFoods, getFoodById, updateFood, deleteFood } = require('../controllers/food.controller');

router.post('/', authenticate, authorize("admin"), createFood);

router.get('/', getAllFoods);

router.get('/:id', getFoodById);

router.put('/:id', authenticate, authorize("admin"), updateFood);

router.delete('/:id', authenticate, authorize("admin"), deleteFood);

module.exports = router;