const orderModel = require('../Models/orderModel');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const newOrder = async (req, res) => {
    try {
        const { email, order_data, order_date, totalAmount } = req.body;

        // Generate a new ObjectId for the order
        const orderId = new ObjectId();

        // Prepare the new order data
        const newOrderData = {
            _id: orderId, // Assign the generated ObjectId to _id field
            order_date,
            totalAmount,
            order_items: order_data
        };

        // Find if there's a previous order associated with the user's email
        const previousOrder = await orderModel.findOne({ email });

        if (!previousOrder) {
            // If no previous order exists, create a new order document
            await orderModel.create({ email, order_data: [newOrderData] });
            return res.status(201).json({ message: 'New User Order Created Successfully', data: newOrderData });
        } else {
            // If a previous order exists, update the existing order document
            await orderModel.findOneAndUpdate({ email }, { $push: { order_data: newOrderData } });
            return res.status(200).json({ message: 'User\'s order data updated successfully', data: newOrderData });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const getOrders = async (req, res) => {
    try {
        const { email } = req.body;
        const myOrders = await orderModel.findOne({ email });

        if (!myOrders) {
            return res.status(404).json({ message: 'No orders placed yet' });
        };

        return res.status(200).json({ myOrders: myOrders.order_data });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }

};

module.exports = { newOrder, getOrders };
