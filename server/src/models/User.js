const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 30,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minLength: 3,
        maxLength: 300
    },

    password: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer"
    },

    phone: {
        type: String,
        trim: true,
    },

    address: {
        street: {
            type: String,
            trim: true,
        },
        city: {
            type: String,
            trim: true,
        },
        state: {
            type: String,
            trim: true,
        },
        pincode: {
            type: String,
            trim: true,
        },
    },
},
    {
        timestamps: true
    }
);

// Hashing password before saving
userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    };

    this.password = await bcrypt.hash(this.password, 10);
});

// Compare Passwords
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;