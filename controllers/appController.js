import App from "../models/appModel.js";
import User from "../models/userModel.js";
import crypto from "crypto";

// Create a new app
export const createApp = async (req, res) => {
    try {
        const userId = req.userId; // usually set by auth middleware
        console.log("User ID from request:", userId);
        const { name, enable_generation, enable_rewrite, enable_translate } = req.body;

        if (!name) {
            return res.status(400).json({ message: "App name is required" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Generate appKey and appSecret
        const appkey = crypto.randomBytes(16).toString("hex");
        const appsecret = crypto.randomBytes(32).toString("hex");

        // Create new app
        const newApp = new App({
            name,
            userId,
            appkey,
            appsecret,
            enable_generation: !!enable_generation,
            enable_rewrite: !!enable_rewrite,
            enable_translate: !!enable_translate,
        });

        await newApp.save();

        res.status(201).json({
            message: "App created successfully",
            data: newApp,
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating app",
            error: error.message,
        });
    }
};

// Get all apps for a user
export const getUserApps = async (req, res) => {
    try {
        const userId = req.userId;

        const apps = await App.find({ userId }).populate("userId", "name email");

        res.status(200).json({
            message: "Apps retrieved successfully",
            data: apps,
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving apps",
            error: error.message,
        });
    }
};

//change app is_active
export const changeAppStatus = async (req, res) => {
    try {

        const { is_active, _id } = req.body;

        if (typeof is_active !== "boolean") {
            return res.status(400).json({ message: "is_active must be a boolean" });
        }

        const app = await App.findByIdAndUpdate(
            _id,
            { is_active },
            { new: true }
        );

        if (!app) {
            return res.status(404).json({ message: "App not found" });
        }

        res.status(200).json({
            message: "App status updated successfully",
            data: app,
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating app status",
            error: error.message,
        });
    }
};
