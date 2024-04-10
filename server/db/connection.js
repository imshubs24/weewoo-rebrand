const mongoose = require('mongoose');
require('dotenv').config();

// UsersDB URI 
const weewoo_rebrand_URI = process.env.MONGO_WEEWOO_REBRAND_URI;
mongoose.weewoo_rebrand_URI = mongoose.createConnection(weewoo_rebrand_URI);   // mongoose.usersDB is mandatory as its a syntax

// If any error while connection, execute below code
mongoose.weewoo_rebrand_URI.on('error', (error) => {
    console.error('Error connecting to UsersData database:', error);
    throw error;
});

// on successful connection
mongoose.weewoo_rebrand_URI.once('open', async () => {
    console.log('Connected to UsersData database');
});

// FoodDB URI
const weewoo_old_URI = process.env.MONGO_WEEWOO_OLD_URI;
mongoose.weewoo_old_URI = mongoose.createConnection(weewoo_old_URI);

// If any error while connection, execute below code
mongoose.weewoo_old_URI.on('error', (error) => {
    console.error('Error connecting to Food database:', error);
    throw error;
});

// on successful conncetion
mongoose.weewoo_old_URI.once('open', async () => {
    console.log('Connected to FoodData database');
});

module.exports = mongoose;