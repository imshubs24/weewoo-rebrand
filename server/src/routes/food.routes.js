const express = require('express');
const router = express.Router();
const auth = require('../middleware/authentication');
const { addFoodCategory, getAllFoodCategories, addFoodMenu, getAllFoodItems } = require('../controllers/food.controller')

// add and get food category routes
router.post('/addfoodcategory', auth, addFoodCategory);
router.get('/getallfoodcategories', getAllFoodCategories);


// add and get food menu routes
router.post('/addfoodmenuitem', auth, addFoodMenu);
router.get('/getallfooditems', getAllFoodItems);

module.exports = router;