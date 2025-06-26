import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


// Register a new user
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone, company } = req.body;

        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Hash the password before saving
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user
        const newUser = new User({
            name, email,
            password: hashedPassword, phone, company
        });
        await newUser.save();

        res.status(201).json({ message: "User created successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
};

// Login a user
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        if (user.is_active === false || user.is_del === true) {
            return res.status(401).json({
                message:
                    "Your account is deactivated or deleted. Please contact support.",
            });
        }

        // If password is hashed, compare using bcrypt
        const isMatch = await bcrypt.compare(password, user.password);

        // If passwords don't match
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });

        res.status(200).json({
            success: true,
            message: "Login successful!",
            token,
            data: user,
            role: user.role,
        });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Error logging in user", error: error.message });
    }
};

//change password
export const changePassword = async (req, res) => {
    const { userId } = req.userId; // Get userId from the authenticated request
    const { oldPassword, newPassword } = req.body;

    try {
        // Find the user by userId
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Check if the old password matches
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Old password is incorrect" });
        }
        // Hash the new password
        const saltRounds = 10;
        const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
        // Update the user's password
        user.password = hashedNewPassword;
        await user.save();
        res.status(200).json({ message: "Password changed successfully", success: true });


    } catch (error) {
        res.status(500).json({ message: "Error changing password", error: error.message });
    }

};
