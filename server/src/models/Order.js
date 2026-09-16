const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        items: [
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

                price: {
                    type: Number,
                    required: true,
                    min: 0,
                },
            },
        ],

        totalAmount: {
            type: Number,
            required: true,
            min: 0,
        },

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

        paymentStatus: {
            type: String,
            enum: ["pending", "paid", "failed"],
            default: "pending",
        },

        orderStatus: {
            type: String,
            enum: [
                "placed",
                "confirmed",
                "preparing",
                "out_for_delivery",
                "delivered",
                "cancelled",
            ],
            default: "placed",
        },

        razorpayOrderId: {
            type: String,
            unique: true,
            sparse: true,
        },

        razorpayPaymentId: {
            type: String,
            unique: true,
            sparse: true,
        },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;