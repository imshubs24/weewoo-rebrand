const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
    {
        sessionId: {
            type: String,
            required: true,
        },

        cartItems: [
            {
                food: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "FoodMenu",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },
            },
        ],

        deliveryAddress: {
            street: {
                type: String,
                required: true,
                trim: true,
            },
            city: {
                type: String,
                required: true,
                trim: true,
            },
            state: {
                type: String,
                required: true,
                trim: true,
            },
            pincode: {
                type: String,
                required: true,
                trim: true,
            },
        },

        createdAt: {
            type: Date,
            default: Date.now,
            expires: "5m",
        },
    }
);

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;