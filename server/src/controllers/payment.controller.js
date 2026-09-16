const razorpay = require("../config/razorpay");
const crypto = require("crypto");

const FoodMenu = require("../models/FoodMenu");
const Order = require("../models/Order");

const createRazorpayOrder = async (req, res, next) => {
    try {
        const { items, deliveryAddress } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Order must contain at least one food item",
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
            const fooditem = await FoodMenu.findById(item.food);

            if (!fooditem) {
                return res.status(404).json({
                    success: false,
                    message: "Food item does not exist"
                });
            }

            if (!fooditem.isAvailable) {
                return res.status(400).json({
                    success: false,
                    message: `${fooditem.name} is currently unavailable`,
                });
            }

            if (!Number.isInteger(item.quantity) || item.quantity < 1) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid item quantity",
                });
            }

            const itemTotal = fooditem.price * item.quantity;

            orderItems.push({
                food: fooditem._id,
                price: fooditem.price,
                quantity: item.quantity,
            });

            totalAmount += itemTotal;
        }

        const razorpayOrder = await razorpay.orders.create({
            amount: Math.round(totalAmount * 100),
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        });

        return res.status(201).json({
            success: true,
            message: "Razorpay order created successfully",
            order: {
                razorpayOrderId: razorpayOrder.id,
                amount: razorpayOrder.amount,
                currency: razorpayOrder.currency,
                items: orderItems,
                deliveryAddress,
            },
        });

    } catch (error) {
        next(error);
    }
}

const verifyPayment = async (req, res, next) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            items,
            deliveryAddress,
        } = req.body;

        // 1. Check payment details
        if (
            !razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature
        ) {
            return res.status(400).json({
                success: false,
                message: "Payment details are required",
            });
        }

        // 2. Check if this Razorpay order and Payment ID was already used
        const existingOrder = await Order.findOne({
            razorpayOrderId: razorpay_order_id,
        });

        if (existingOrder) {
            return res.status(409).json({
                success: false,
                message: "This payment has already been processed",
            });
        }

        const existingPayment = await Order.findOne({
            razorpayPaymentId: razorpay_payment_id,
        });

        if (existingPayment) {
            return res.status(409).json({
                success: false,
                message: "This payment has already been processed",
            });
        }

        // 3. Verify Razorpay signature
        const generatedSignature = crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_KEY_SECRET
            )
            .update(
                `${razorpay_order_id}|${razorpay_payment_id}`
            )
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Payment verification failed",
            });
        }

        // 4. Validate items
        if (!items || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Order must contain at least one food item",
            });
        }

        // 5. Validate delivery address
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

        // 6. Calculate the actual amount from DB
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
                    message: `${foodItem.name} is currently unavailable`,
                });
            }

            if (!Number.isInteger(item.quantity) || item.quantity < 1) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid item quantity",
                });
            }

            orderItems.push({
                food: foodItem._id,
                price: foodItem.price,
                quantity: item.quantity,
            });

            totalAmount += foodItem.price * item.quantity;
        }

        // 7. Fetch Razorpay order
        const razorpayOrder = await razorpay.orders.fetch(
            razorpay_order_id
        );

        // 8. Compare amounts
        const expectedAmount = Math.round(totalAmount * 100);

        if (razorpayOrder.amount !== expectedAmount) {
            return res.status(400).json({
                success: false,
                message: "Payment amount does not match order amount",
            });
        }

        // 9. Fetch Razorpay payment
        const payment = await razorpay.payments.fetch(
            razorpay_payment_id
        );

        // 10. Make sure payment belongs to this Razorpay order
        if (payment.order_id !== razorpay_order_id) {
            return res.status(400).json({
                success: false,
                message: "Payment does not belong to this order",
            });
        }

        // 11. Make sure payment was actually captured
        if (payment.status !== "captured") {
            return res.status(400).json({
                success: false,
                message: "Payment has not been captured",
            });
        }

        // 12. Create our actual order
        const order = await Order.create({
            user: req.user._id,
            items: orderItems,
            totalAmount,
            deliveryAddress,
            paymentStatus: "paid",
            razorpayOrderId: razorpay_order_id,
            razorpayPaymentId: razorpay_payment_id,
        });

        return res.status(201).json({
            success: true,
            message: "Payment verified and order created successfully",
            order,
        });

    } catch (error) {
        next(error);
    }
};

module.exports = { createRazorpayOrder, verifyPayment };