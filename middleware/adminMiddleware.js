// middleware/adminMiddleware.js
export default function adminMiddleware(req, res, next) {
    const origin = req.headers.origin || "";
    const allowedDomain = process.env.ALLOWED_DOMAIN;

    if (origin.includes(allowedDomain)) {
        return next(); // Allow
    }

    return res.status(403).json({ message: "Access denied: Invalid origin." });
}
