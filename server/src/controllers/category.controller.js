const FoodCategory = require("../models/FoodCategory");
const FoodMenu = require("../models/FoodMenu");

// create category
const createCategory = async (req, res, next) => {
    try {
        const { category, image } = req.body;

        if (!category) {
            return res.status(400).json({
                success: false,
                message: "Category is required",
            });
        };

        const categoryName = category.trim();

        const categoryExists = await FoodCategory.findOne({
            category: categoryName
        });

        if (categoryExists) {
            return res.status(400).json({
                success: false,
                message: "Category already exists",
            });
        };

        const newCategory = await FoodCategory.create({
            category,
            image,
        });

        return res.status(201).json({
            success: true,
            message: "Category created successfully",
            category: newCategory,
        });

    } catch (error) {
        next(error);
    };
};

// get all categories
const getAllCategories = async (req, res, next) => {
    try {
        const categories = await FoodCategory.find().sort({ category: 1 });

        return res.status(200).json({
            success: true,
            categories,
        });

    } catch (error) {
        next(error);
    };
};

// get category by ID 
const getCategoryById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const category = await FoodCategory.findById(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category does not exist",
            });
        };

        return res.status(200).json({
            success: true,
            category,
        });

    } catch (error) {
        next(error);
    };
};

// update category using ID
const updateCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { category, image } = req.body;

        const categoryExists = await FoodCategory.findById(id);

        if (!categoryExists) {
            return res.status(404).json({
                success: false,
                message: "Category doesn't exist",
            });
        }

        const duplicateCategory = await FoodCategory.findOne({ category });

        if (duplicateCategory && duplicateCategory._id.toString() !== id) {
            return res.status(409).json({
                success: false,
                message: "Category already exists",
            });
        }

        categoryExists.category = category;
        categoryExists.image = image;

        await categoryExists.save();

        return res.status(200).json({
            success: true,
            message: "Category updated successfully",
            category: categoryExists,
        });

    } catch (error) {
        next(error);
    }
};

// delete category using ID 
const deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;

        const foodExists = await FoodMenu.exists({ category: id });
        if (foodExists) {
            return res.status(400).json({
                success: false,
                message: "Cannot delete category because food items are using it",
            });
        }

        const deletedCategory = await FoodCategory.findByIdAndDelete(id);
        if (!deletedCategory) {
            return res.status(200).json({
                success: true,
                message: "Category deleted successfully",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Category deleted successfully",
        })

    } catch (error) {
        next(error);
    };
};

module.exports = { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory }