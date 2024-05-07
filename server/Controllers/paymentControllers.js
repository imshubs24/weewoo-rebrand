const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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
            success_url: 'http://localhost:5173/paymentsuccess',
            cancel_url: 'http://localhost:5173/cart'
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { checkoutSession };
