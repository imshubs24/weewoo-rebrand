const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { newOrder } = require('./order.controller')
const Session = require('../models/sessionSchema')
const Order = require("../models/Order");
const FoodMenu = require("../models/FoodMenu");

const checkoutSession = async (req, res, next) => {
    try {
        const { cartItems, deliveryAddress } = req.body;

        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No items in the cart",
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

        const lineItems = [];
        const taxRate = 0.05;

        for (const item of cartItems) {
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

            const priceWithTax = foodItem.price * (1 + taxRate);

            lineItems.push({
                price_data: {
                    currency: "INR",
                    product_data: {
                        name: foodItem.name,
                    },
                    unit_amount: Math.round(priceWithTax * 100),
                },
                quantity: item.quantity,
            });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `http://localhost:5173/paymentstatus?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: "http://localhost:5173/cart",
        });

        const newSession = new Session({
            sessionId: session.id,
            cartItems,
            deliveryAddress,
        });

        await newSession.save();

        return res.status(200).json({
            success: true,
            url: session.url,
        });

    } catch (error) {
        next(error);
    }
};

const paymentSuccess = async (req, res, next) => {
    try {

        const { session_id } = req.query;

        if (!session_id) {
            return res.status(400).json({
                success: false,
                message: "Stripe session ID is required",
            });
        }

        // Get the payment session from Stripe using above ID
        const session = await stripe.checkout.sessions.retrieve(session_id);

        if (session.payment_status !== "paid") {
            return res.status(400).json({
                success: false,
                message: "Payment was not successful",
            });
        }

        // Get the temporary cart/session data
        const sessionData = await Session.findOne({
            sessionId: session_id,
        });

        if (!sessionData || sessionData.cartItems.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No cart items found",
            });
        }

        const orderItems = [];

        for (const item of sessionData.cartItems) {
            const foodItem = await FoodMenu.findById(item.food);

            if (!foodItem) {
                return res.status(404).json({
                    success: false,
                    message: "Food item does not exist",
                });
            }

            orderItems.push({
                food: foodItem._id,
                quantity: item.quantity,
                price: foodItem.price,
            });
        }

        const totalAmount = session.amount_total / 100;

        const order = await Order.create({
            user: req.user._id,
            items: orderItems,
            totalAmount,
            deliveryAddress: req.body.deliveryAddress,
            paymentStatus: "paid",
            orderStatus: "placed",
        });

        await Session.deleteOne({
            sessionId: session_id
        });

        return res.status(201).json({
            success: true,
            message: "Payment successful and order created",
            order,
        });

    } catch (error) {
        console.error('Error retrieving session or saving order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = { checkoutSession, paymentSuccess };