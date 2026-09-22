const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
    },

    password: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },

    // New fields for email verification
    isVerified: {
        type: Boolean,
        default: false
    },

    otp: {
        type: String,
        default: null
    },

    otpExpire: {
        type: Date,
        default: null
    }

}, {
    timestamps: true,
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;