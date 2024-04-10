const mongoose = require('mongoose');
const conn = require('../db/connection');

const foodCategorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 15
    },
});

const foodCategoryModel = conn.weewoo_rebrand_URI.model('foodcategorie', foodCategorySchema);
module.exports = foodCategoryModel;