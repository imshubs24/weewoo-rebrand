const mongoose = require('mongoose');
const conn = require('../db/connection');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30
    },
    email: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 300
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 1024
    },
},
    {
        timestamps: true
    });

const userModel = conn.weewoo_rebrand_URI.model("User", userSchema); // Important: conn.usersDB.model, usually its mongoose.model
module.exports = userModel;