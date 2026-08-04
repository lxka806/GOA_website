const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 50,
        },

        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 2,
            maxlength: 30,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 8,
        },

        // Profile
        avatar: {
            type: String,
            default: "",
        },

        bio: {
            type: String,
            maxlength: 300,
            default: "",
        },

        country: {
            type: String,
            default: "",
        },

        github: {
            type: String,
            default: "",
        },

        portfolio: {
            type: String,
            default: "",
        },

        // Role
        role: {
            type: String,
            enum: ["student", "admin"],
            default: "student",
        },

        // Learning
        xp: {
            type: Number,
            default: 0,
        },

        level: {
            type: Number,
            default: 1,
        },

        achievements: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Achievement",
        },
        ],
    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model("User", userSchema);