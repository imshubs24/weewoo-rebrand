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
            success: true,
            message: "Food item created successfully",
            newFood
        });

    } catch (error) {
        next(error);
    };
};

// Get food items with optional search, category filtering, and pagination
const getAllFoods = async (req, res, next) => {
    try {
        const { page = 1, limit = 12, search = "", category = "" } = req.query;

        const pageNumber = Number(page);
        const limitNumber = Number(limit);

        if (pageNumber < 1 || limitNumber < 1 || limitNumber > 50) {
            return res.status(400).json({
                success: false,
                message: "Invalid pagination parameters",
            });
        }

        const filter = {};

        // $regex allows partial matching and $options: "i" makes it case-insensitive.
        if (search) {
            filter.name = {
                $regex: search,
                $options: "i",
            };
        }

        // FoodMenu stores the category's ObjectId, not the category name.
        if (category) {
            const categoryNames = category
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean);

            const categoryData = await FoodCategory.find({
                category: {
                    $in: categoryNames.map(
                        (name) => new RegExp(`^${name}$`, "i")
                    ),
                },
            });

            const categoryIds = categoryData.map((item) => item._id);

            if (categoryIds.length === 0) {
                return res.status(200).json({
                    success: true,
                    foodItems: [],
                    pagination: {
                        page: pageNumber,
                        limit: limitNumber,
                        totalItems: 0,
                        hasMore: false,
                    },
                });
            }

            filter.category = {
                $in: categoryIds,
            };
        }

        const skip = (pageNumber - 1) * limitNumber;

        // Run both database operations at the same time.
        // 1. Get the food items for the current page.
        // 2. Count how many total items match our filters.
        const [foodItems, totalItems] = await Promise.all([
            FoodMenu.find(filter)
                .populate("category")
                .skip(skip)
                .limit(limitNumber),

            FoodMenu.countDocuments(filter),
        ]);

        // Determine whether there are more food items available.
        // The frontend can use this to decide whether to show
        // the "Load More" button.
        const hasMore = skip + foodItems.length < totalItems;

        // Send the food items along with pagination information.
        res.status(200).json({
            success: true,
            foodItems,
            pagination: {
                page: pageNumber,
                limit: limitNumber,
                totalItems,
                hasMore,
            },
        });
    } catch (error) {
        next(error);
    }
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
        const { name, category, price, image, description, isAvailable } = req.body;

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
        if (isAvailable !== undefined) foodItem.isAvailable = isAvailable;

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