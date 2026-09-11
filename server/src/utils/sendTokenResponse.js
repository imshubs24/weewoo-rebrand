const jwt = require("jsonwebtoken");

const sendTokenResponse = (user, res, statusCode, message) => {
    const token = jwt.sign({
        userId: user._id,
        role: user.role,
    },
        process.env.JWT_SECRET,
        {
            expiresIn: "15m"
        }
    );

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
    });

    res.status(statusCode).json({
        success: true,
        message,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    });
};

module.exports = sendTokenResponse