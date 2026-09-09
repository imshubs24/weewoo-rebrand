const mongoose = require("mongoose");

const foodCategorySchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minLength: 3,
            maxLength: 30,
        },

        image: {
            type: String,
            trim: true,
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const FoodCategory = mongoose.model("FoodCategory", foodCategorySchema);

module.exports = FoodCategory;