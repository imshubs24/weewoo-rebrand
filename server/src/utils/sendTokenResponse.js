const jwt = require("jsonwebtoken");

const sendTokenResponse = (user, res, statusCode, message) => {

    const accessToken = jwt.sign(
        {
            userId: user._id,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "15m"
        }
    );

    const refreshToken = jwt.sign(
        {
            userId: user._id,
        },
        process.env.JWT_REFRESH_SECRET,
        {
            expiresIn: "7d",
        }
    );


    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(statusCode).json({
        success: true,
        message,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            address: user.address,
        },
    });
};

module.exports = sendTokenResponse