import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },

    phone: {
        type: String,
        required: true,
        // match: /^\d{3}-\d{3}-\d{4}$/, // Validate phone number format
    },
    company: {
        type: String,
    },
    is_active: {
        type: Boolean,
        default: true,
    },
    is_del: {
        type: Boolean,
        default: false,
    },
    role: {
        type: Number,
        default: 1, // 1 for user, 0 for admin
    },
    is_del: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true, // Automatically update createdAt and updatedAt fields
});

const User = mongoose.model("User", userSchema);

export default User;