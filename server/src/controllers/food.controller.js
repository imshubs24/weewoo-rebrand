const FoodMenu = require('../models/FoodMenu');
const FoodCategory = require("../models/FoodCategory");

// add  new food menu item
const createFood = async (req, res, next) => {
    try {
        const { name, category, price, image, description } = req.body;

        if (!name || !category || price === undefined) {
            return res.status(400).json({
                success: false,
                message: "Name, category and price are required",
            });
        }

        const categoryExists = await FoodCategory.findById(category);

        if (!categoryExists) {
            return res.status(404).json({
                success: false,
                message: "Category does not exist",
            });
        }

        const foodExists = await FoodMenu.findOne({
            name: name.trim(),
            category,
        });

        if (foodExists) {
            return res.status(409).json({
                success: false,
                message: "Food already exists",
            });
        }

        const newFood = await FoodMenu.create({
            name: name.trim(),
            category,
            price,
            image,
            description,
        });

        return res.status(201).json({
            success: false,
            message: "Food item created successfully",
            newFood
        });

    } catch (error) {
        next(error);
    };
};

// get all food items 
const getAllFoods = async (req, res, next) => {
    try {
        const foodItems = await FoodMenu.find()
            .populate("category");

        return res.status(200).json({
            success: true,
            foodItems,
        });

    } catch (error) {
        next(error);
    };
};

const getFoodById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const foodItem = await FoodMenu.findById(id)
            .populate("category");

        if (!foodItem) {
            return res.status(404).json({
                success: false,
                message: "Food item does not exist",
            });
        }

        return res.status(200).json({
            success: true,
            foodItem,
        });

    } catch (error) {
        next(error);
    }
}

const updateFood = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, category, price, image, description } = req.body;

        const foodItem = await FoodMenu.findById(id);

        if (!foodItem) {
            return res.status(404).json({
                success: false,
                message: "Food item does not exist",
            });
        }

        if (category) {
            const categoryExists = await FoodCategory.findById(category);

            if (!categoryExists) {
                return res.status(404).json({
                    success: false,
                    message: "Category does not exist",
                });
            }

            foodItem.category = category;
        }

        if (name) foodItem.name = name.trim();
        if (price !== undefined) foodItem.price = price;
        if (image !== undefined) foodItem.image = image;
        if (description !== undefined) foodItem.description = description;

        await foodItem.save();

        return res.status(200).json({
            success: true,
            message: "Food item updated successfully",
            food: foodItem,
        });

    } catch (error) {
        next(error);
    }
}

const deleteFood = async (req, res, next) => {
    try {
        const { id } = req.params;

        const foodItem = await FoodMenu.findByIdAndDelete(id);

        if (!foodItem) {
            return res.status(404).json({
                success: false,
                message: "Food item does not exist",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Food item deleted successfully",
        });

    } catch (error) {
        next(error);
    }
}

module.exports = { createFood, getAllFoods, getFoodById, updateFood, deleteFood };