const foodCategoryModel = require('../Models/foodCategoryModel');
const foodMenuModel = require('../Models/foodMenuModel');

// add new food category route
const addFoodCategory = async (req, res) => {
    try {
        let { category } = req.body;
        const { user, token } = req;

        if (!category) {
            return res.status(400).json('All fields required!');
        };

        category = category.toLowerCase();

        const categoryExists = await foodCategoryModel.findOne({ category });

        if (categoryExists) {
            return res.status(409).json('Category already exists');
        };

        const newCategory = new foodCategoryModel({ category });
        await newCategory.save();

        return res.status(201).json({ message: 'New category added successfully', category });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    };
};

// fetch all food categories
const getAllFoodCategories = async (req, res) => {
    try {
        const categories = await foodCategoryModel.find();

        if (categories.length === 0) {
            return res.status(409).json('No Food Categories Available');
        };

        return res.status(200).json({ categories });

    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    };
};

// add  new food menu item
const addFoodMenu = async (req, res) => {
    try {
        let { name, category, price, rating, image_url, description, type } = req.body;

        if (!name || !category || !price || !rating || !image_url || !description || !type) {
            return res.status(400).json('All fields required!');
        };

        name = name.toLowerCase();
        category = category.toLowerCase();

        const categoryExists = await foodCategoryModel.findOne({ category });

        if (!categoryExists) {
            const newCategory = new foodCategoryModel({ category });
            await newCategory.save();
        };

        const itemExists = await foodMenuModel.findOne({ $and: [{ name, category }] });

        if (itemExists) {
            return res.status(409).json('This food item already exists');
        };

        const newFoodItem = new foodMenuModel({ name, category, price, rating, image_url, description, type });
        await newFoodItem.save();

        return res.status(201).json({ message: 'New food item added successfully', newFoodItem });

    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    };
};

// get all food items 
const getAllFoodItems = async (req, res) => {
    try {
        const foodItems = await foodMenuModel.find();

        if (foodItems.length === 0) {
            return res.status(409).json('No Food Items Available');
        };

        return res.status(200).json({ foodItems });

    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    };
};

module.exports = { addFoodCategory, getAllFoodCategories, addFoodMenu, getAllFoodItems };