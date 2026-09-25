const User = require("../models/User");
const FoodMenu = require("../models/FoodMenu");
const Order = require("../models/Order");

const getDashboardStats = async (req, res, next) => {
    try {
        const [totalOrders, totalUsers, totalFoodItems, revenueData, recentOrders] = await Promise.all([
            Order.countDocuments(),
            User.countDocuments(),
            FoodMenu.countDocuments(),
            Order.aggregate([
                {
                    $match: {
                        paymentStatus: "paid",
                    },
                },
                {
                    $group: {
                        _id: null,
                        totalRevenue: { $sum: "$totalAmount" },
                    },
                },
            ]),
            Order.find()
                .populate("user", "name email")
                .sort({ createdAt: -1 })
                .limit(5),
        ]);

        const totalRevenue = revenueData[0]?.totalRevenue || 0;

        return res.status(200).json({
            success: true,
            stats: {
                totalOrders,
                totalUsers,
                totalFoodItems,
                totalRevenue,
            },
            recentOrders,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { getDashboardStats };