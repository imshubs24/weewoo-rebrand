const mongoose = require('mongoose');
const conn = require('../db/connection');

const foodMenuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    image_url: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: Boolean,
        required: true,
    },
});

const foodMenuModel = conn.weewoo_rebrand_URI.model('foodMenu', foodMenuSchema);
module.exports = foodMenuModel;