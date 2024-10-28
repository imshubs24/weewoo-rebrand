const mongoose = require('mongoose');
const conn = require('../db/connection');

const sessionSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true
    },
    cartItems: [
        {
            name: String,
            price: Number,
            quantity: Number
        }
    ],
    createdAt: { type: Date, default: Date.now, expires: '5m' }
});

const Session = conn.weewoo_rebrand_URI.model('session', sessionSchema);
module.exports = Session;