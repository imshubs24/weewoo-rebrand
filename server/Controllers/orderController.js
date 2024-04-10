const orderModel = require('../Models/orderModel');

const newOrder = async (req, res) => {
    let data = req.body.order_data;
    await data.splice(0, 0, { order_date: req.body.order_date });
    await data.splice(1, 0, { order_date: req.body.totalAmount });

    const { email } = req.body;
    const previousOrder = await orderModel.findOne({ email });
    if (previousOrder === null) {
        try {
            await orderModel.create({ email, order_data: [data] });
            return res.status(201).json({ message: 'New User Order Created Successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        try {
            await orderModel.findOneAndUpdate({ email }, { $push: { order_data: data } });
            return res.status(200).json({ message: 'Users order data updated successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
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
