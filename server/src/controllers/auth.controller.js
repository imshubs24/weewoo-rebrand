const User = require('../models/User');
const validator = require('email-validator');
const jwt = require('jsonwebtoken');
const sendTokenResponse = require('../utils/sendTokenResponse');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET_KEY);
};

const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the details",
            });
        };

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'User already exists'
            });
        };

        if (!validator.validate(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please enter a valid email!'
            });
        };

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                success: false,
                message: 'Password must be 6 characters or more and contain at least one uppercase and one lowercase character.'
            });
        };

        const user = await User.create({
            _id,
            name,
            email,
            role,
        });

        sendTokenResponse(user, res, 201, "User created successfully");

    } catch (error) {
        next(error);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        };

        sendTokenResponse(user, res, 200, "User login successful");

    } catch (error) {
        next(error);
    }
}

const getUserDetails = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await userModel.findOne({ email });
        if (!user)
            return res.status(404).json({ error: 'User Not Found' });

        res.status(200).json({ message: 'User Found', user: { name: user.name, email: user.email } })

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updateUserDetails = async (req, res) => {
    try {
        const { email, updates } = req.body;

        // Define allowed updates
        const allowedUpdates = ['name', 'contact', 'address'];

        const user = await userModel.findOne({ email });
        if (!user)
            return res.status(404).json({ error: 'User Not Found' });

        // Validate updates
        const updateKeys = Object.keys(updates);

        const isValidOperation = updateKeys.every(update => allowedUpdates.includes(update));
        if (!isValidOperation) return res.status(400).json({ error: 'Invalid updates' });

        // Apply the updates
        updateKeys.forEach(update => {
            if (user[update] !== updates[update]) {
                user[update] = updates[update];
            }
        });

        // Save the updated user
        await user.save();

        return res.status(200).json({ message: 'User information updated successfully' });

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

module.exports = { registerUser, loginUser, getUserDetails, updateUserDetails };