const User = require('../models/User');
const validator = require('email-validator');
const jwt = require("jsonwebtoken");
const sendTokenResponse = require('../utils/sendTokenResponse');

const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the details",
            });
        };

        const existingUser = await User.findOne({ email });

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
            name,
            email,
            password,
        });

        sendTokenResponse(user, res, 201, "User created successfully");

    } catch (error) {
        next(error);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
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

const getUserDetails = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);

        if (!user)
            return res.status(404).json({
                success: false,
                message: "User does not exist"
            });

        res.status(200).json({
            success: false,
            user
        })

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updateUserDetails = async (req, res, next) => {
    try {
        const { name, phone, address } = req.body;

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (name !== undefined) {
            user.name = name;
        }

        if (phone !== undefined) {
            const phoneRegex = /^[6-9]\d{9}$/;

            if (!phoneRegex.test(phone)) {
                return res.status(400).json({
                    success: false,
                    message: "Please enter a valid 10-digit Indian phone number",
                });
            }

            user.phone = phone;
        }

        if (address !== undefined) {
            user.address = address;
        }

        await user.save();

        return res.status(200).json({
            success: true,
            message: "User information updated successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
                address: user.address,
            },
        });

    } catch (error) {
        next(error);
    }
};

const getCurrentUser = async (req, res) => {
    return res.status(200).json(req.user);
};

const logout = (req, res) => {
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/",
    };

    res.clearCookie("accessToken", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);

    res.status(200).json({
        success: true,
        message: "Logout successful",
    });
};

const changePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Current password and new password are required",
            });
        }

        if (currentPassword === newPassword) {
            return res.status(400).json({
                success: false,
                message: "New password must be different from current password",
            });
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

        if (!passwordRegex.test(newPassword)) {
            return res.status(400).json({
                success: false,
                message: "Password must be 6 characters or more and contain at least one uppercase and one lowercase character.",
            });
        }

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const isMatch = await user.comparePassword(currentPassword);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Current password is incorrect",
            });
        }

        user.password = newPassword;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password changed successfully",
        });

    } catch (error) {
        next(error);
    }
}

const refreshAccessToken = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Refresh token required",
            });
        }

        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User no longer exists"
            });
        };

        const accessToken = jwt.sign(
            {
                userId: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "15m",
            }
        );

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 15 * 60 * 1000
        });

        res.status(200).json({
            success: true,
            message: "Access token refreshed"
        });

    } catch (error) {
        next(error);
    }
}

module.exports = { registerUser, loginUser, getUserDetails, updateUserDetails, getCurrentUser, logout, changePassword, refreshAccessToken };