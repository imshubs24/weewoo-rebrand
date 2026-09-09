const jwt = require('jsonwebtoken');
const userModel = require('../models/User');
require('dotenv').config();

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        if (!token) {
            return res.status(400).json({ error: 'Token not found! Please Authenticate' });
        };
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await userModel.findById({ _id: decoded._id });

        if (!user) {
            throw new Error({ error: error.message });
        }

        req.user = user;
        req.token = token;
        next();

    } catch (error) {
        res.status(401).send({ error: 'Please Authenticate' });
    }
}

module.exports = auth;