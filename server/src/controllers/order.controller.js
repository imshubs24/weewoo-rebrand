const Order = require('../models/Order');
const FoodMenu = require("../models/FoodMenu");

const createOrder = async (req, res, next) => {
    try {
        const { items, deliveryAddress } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Order must contain atleast one food item",
            });
        }

        if (
            !deliveryAddress?.street ||
            !deliveryAddress?.city ||
            !deliveryAddress?.state ||
            !deliveryAddress?.pincode
        ) {
            return res.status(400).json({
                success: false,
                message: "Complete delivery address is required",
            });
        }

        const orderItems = [];
        let totalAmount = 0;

        for (const item of items) {
            const foodItem = await FoodMenu.findById(item.food);

            if (!foodItem) {
                return res.status(404).json({
                    success: false,
                    message: "Food item does not exist",
                });
            }

            if (!foodItem.isAvailable) {
                return res.status(400).json({
                    success: false,
                    message: `${foodItem} is currently unavailable`,
                });
            }

            const itemTotal = foodItem.price * item.quantity;

            orderItems.push({
                food: foodItem._id,
                quantity: item.quantity,
                price: foodItem.price,
            });

            totalAmount += itemTotal;
        }

        const order = await Order.create({
            user: req.user._id,
            items: orderItems,
            totalAmount,
            deliveryAddress,
        });

        return res.status(201).json({
            success: false,
            message: "Order created successfully",
            order,
        });

    } catch (error) {
        next(error);
    }
};

const getMyOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({
            user: req.user._id,
        })
            .populate("items.food");

        return res.status(200).json({
            success: true,
            orders,
        });

    } catch (error) {
        next(error);
    }
};

const getOrderById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const order = await Order.findOne({
            _id: id,
            user: req.user._id,
        })
            .populate("items.food");

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order does not exist",
            });
        }

        return res.status(200).json({
            success: true,
            order,
        });

    } catch (error) {
        next(error);
    }
}

const cancelOrder = async (req, res, next) => {
    try {
        const { id } = req.params;

        const order = await Order.findOne({
            _id: id,
            user: req.user._id,
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order does not exist"
            });
        }

        if (order.orderStatus !== "placed" && order.orderStatus !== "confirmed") {
            return res.status(400).json({
                success: false,
                message: "Order cannot be cancelled at this stage",
            });
        }

        order.orderStatus = "cancelled";
        await order.save();

        return res.status(200).json({
            success: true,
            message: "Order cancelled successfully",
        });

    } catch (error) {
        next(error);
    }
}

const updateOrderStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { orderStatus } = req.body;

        const validStatuses = [
            "placed",
            "confirmed",
            "preparing",
            "out_for_delivery",
            "delivered",
            "placed"
        ];

        if (!validStatuses.includes(orderStatus)) {
            return res.status(400).json({
                success: false,
                message: "Invalid order status",
            });
        }

        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order does not exist",
            });
        }

        order.orderStatus = orderStatus;
        await order.save();

        return res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            order,
        });

    } catch (error) {
        next(error);
    }
}

module.exports = { createOrder, getMyOrders, getOrderById, cancelOrder, updateOrderStatus};
