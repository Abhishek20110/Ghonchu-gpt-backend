import express from 'express';
import multer from 'multer';
import dotenv from 'dotenv';


import {
    registerUser,
    loginUser,
}
    from '../controllers/authController.js'; // Adjust the path according to your project structure

// Initialize dotenv to load environment variables
dotenv.config();

// Initialize router
const authRouter = express.Router();

// Define storage for multer (for file uploads if needed)
// If no file uploads, use `upload.none()` for form data only
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Register a new user
authRouter.post('/register', upload.none(), registerUser);
// Login a user
authRouter.post('/login', upload.none(), loginUser);

export default authRouter;


