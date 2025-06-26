// routes/aiRoutes.js
import express from "express";
import validateAppCredentials from "../middleware/validateAppCredentials.js";
import createRateLimiter from "../middleware/rateLimiter.js";

import {
    summarizeText,
    generateText,
    rewriteText,
    translateText
} from "../controllers/aiController.js";
const airouter = express.Router();

// Apply middleware stack
airouter.post(
    "/summarize",
    validateAppCredentials,
    createRateLimiter({ windowMs: 15 * 60 * 1000, max: 50 }), // 50 requests per 15 mins per app
    summarizeText
);
airouter.post(
    "/generate",
    validateAppCredentials,
    createRateLimiter({ windowMs: 15 * 60 * 1000, max: 50 }), // 50 requests per 15 mins per app
    generateText
);
airouter.post(
    "/rewrite",
    validateAppCredentials,
    createRateLimiter({ windowMs: 15 * 60 * 1000, max: 50 }), // 50 requests per 15 mins per app
    rewriteText
);
airouter.post(
    "/translate",
    validateAppCredentials,
    createRateLimiter({ windowMs: 15 * 60 * 1000, max: 50 }), // 50 requests per 15 mins per app
    translateText
);

export default airouter;
