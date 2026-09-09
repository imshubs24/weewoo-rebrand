const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");
    } catch (error) {
        console.error("Error connecting mongoDB", error);
        throw error;
    };
};

module.exports = connectDB;