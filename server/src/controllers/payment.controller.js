const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { newOrder } = require('./order.controller')
const Session = require('../models/sessionSchema')

const checkoutSession = async (req, res) => {
    const { cartItems } = req.body;

    const taxRate = 0.05;
    try {
        // Calculate tax and final amount for each item
        const lineItems = cartItems.map((item) => {
            const taxAmount = item.price * taxRate;
            const finalAmount = item.price + taxAmount;

            return {
                price_data: {
                    currency: 'INR',
                    product_data: {
                        name: item.name
                    },
                    unit_amount: finalAmount * 100 //
                },
                quantity: item.quantity
            };
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `http://localhost:5173/paymentstatus?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: 'http://localhost:5173/cart'
        });

        // Save session data (cart items) in MongoDB
        const newSession = new Session({
            sessionId: session.id,
            cartItems
        });

        await newSession.save();

        return res.json({ url: session.url });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const paymentSuccess = async (req, res) => {
    const { session_id } = req.query; // Extract the session_id from the query params

    try {
        // Retrieve the session from Stripe using the session ID
        const session = await stripe.checkout.sessions.retrieve(session_id);
        const { email } = req.user;

        // Check if payment was successful
        if (session.payment_status === 'paid') {
            // Payment is successful, now we save the order to the database

            // Fetch session data (cart items) from MongoDB
            const sessionData = await Session.findOne({ sessionId: session_id });

            if (!sessionData || sessionData.cartItems.length === 0) {
                return res.status(404).json({ error: 'No items found in the cart' });
            }

            // Extract relevant order data from the session
            const totalAmount = session.amount_total / 100; // Convert back from cents

            const order_date_time = [];
            const date = new Date(Date.now());

            const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
            const dayDate = date.toLocaleDateString('en-US', options);
            order_date_time.push(dayDate);
            const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
            order_date_time.push(time);

            const order_date = [...order_date_time];

            // Use parsedCartItems to create order_data
            const order_data = sessionData.cartItems.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price // Already in the correct format
            }));

            // Call your newOrder function to store the order in the database
            const orderReq = {
                body: { email, order_data, order_date, totalAmount }
            };

            await newOrder(orderReq, res); // Save order to DB

            // Remove session data from MongoDB after successful order
            await Session.deleteOne({ sessionId: session_id });
        } else {
            return res.status(400).json({ error: 'Payment not successful' });
        }
    } catch (error) {
        console.error('Error retrieving session or saving order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = { checkoutSession, paymentSuccess };