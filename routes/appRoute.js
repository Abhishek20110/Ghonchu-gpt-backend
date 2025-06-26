import express from 'express';
import multer from 'multer';
import dotenv from 'dotenv';

import { createApp, getUserApps, changeAppStatus } from '../controllers/appController.js';

import userAuth from '../middleware/authMiddleware.js'; // Ensure you have user authentication middleware

dotenv.config();

// Initialize router
const appRouter = express.Router();

// Define storage for multer (for file uploads if needed)
// If no file uploads, use `upload.none()` for form data only
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Create a new app
appRouter.post('/create', userAuth, upload.none(), createApp);
// Get all apps for a user
appRouter.get('/user-apps', userAuth, getUserApps);
// Change app status (enable/disable)
appRouter.put('/change-status', userAuth, upload.none(), changeAppStatus);

export default appRouter;