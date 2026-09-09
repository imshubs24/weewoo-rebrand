const mongoose = require("mongoose");

const foodMenuSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minLength: 2,
            maxLength: 100,
        },

        description: {
            type: String,
            trim: true,
            maxLength: 500,
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        image: {
            type: String,
            trim: true,
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "FoodCategory",
            required: true,
        },

        isAvailable: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const FoodMenu = mongoose.model("FoodMenu", foodMenuSchema);

module.exports = FoodMenu;