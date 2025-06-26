// middlewares/rateLimiter.js
import rateLimit from "express-rate-limit";

const createRateLimiter = (options = {}) =>
    rateLimit({
        windowMs: options.windowMs || 15 * 60 * 1000, // 15 minutes
        max: options.max || 100, // Limit each app to 100 requests per windowMs
        keyGenerator: (req, res) => {
            return req.app?.appkey || req.headers["x-app-key"] || req.ip;
        },
        standardHeaders: true,
        legacyHeaders: false,
        message: {
            message: "Too many requests from this app. Please wait before retrying.",
        },
    });

export default createRateLimiter;
