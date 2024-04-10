const mongoose = require('mongoose');
const conn = require('../db/connection');

const orderSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    order_data: {
        type: Array,
        required: true
    }
});

const orderModel = conn.weewoo_rebrand_URI.model('order', orderSchema);
module.exports = orderModel;