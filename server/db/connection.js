const mongoose = require('mongoose');
require('dotenv').config();

const connection = async () => {
    try {
        const userdbURI = process.env.MONGO_DB_URI;
        await mongoose.connect(userdbURI);
        console.log('DB Connection Successful');
    } catch (error) {
        console.log(error);
    }
};

module.exports = connection;