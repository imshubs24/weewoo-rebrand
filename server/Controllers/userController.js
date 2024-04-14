const userModel = require('../Models/userModel');
const validator = require('email-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET_KEY);
};

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !password || !email)
            return res.status(400).json({ error: 'All fields required!' });

        const userExists = await userModel.findOne({ email });

        if (userExists)
            return res.status(409).json({ error: 'Email already registered' });

        if (!validator.validate(email))
            return res.status(400).json({ error: 'Please enter a valid email!' })

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

        if (!passwordRegex.test(password)) {
            return res.status(400).json({ error: 'Password must be 6 characters or more and contain at least one uppercase and one lowercase character.' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new userModel({ name, email, password: hashedPassword });

        await user.save();

        return res.status(201).json({ message: 'User created successfully', _id: user._id, name, email });

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user)
            return res.status(404).json({ error: 'Invalid login credentials' });

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) return res.status(400).json({ error: 'Invalid login credentials' });

        const token = createToken(user._id.toString());
        return res.status(201).json({ message: 'User Logged in successfully', _id: user._id, name: user.name, email, token });

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { registerUser, loginUser };