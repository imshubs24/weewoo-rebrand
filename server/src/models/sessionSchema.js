const mongoose = require('mongoose');

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

const Session = mongoose.model('session', sessionSchema);
module.exports = Session;

// cartItems: [
//     {
//         food: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "FoodMenu",
//             required: true,
//         },
//         name: {
//             type: String,
//             required: true,
//         },
//         price: {
//             type: Number,
//             required: true,
//         },
//         quantity: {
//             type: Number,
//             required: true,
//             min: 1,
//         },
//     },
// ],