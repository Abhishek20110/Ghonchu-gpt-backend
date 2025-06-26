// middlewares/validateAppCredentials.js
import App from "../models/appModel.js";

const validateAppCredentials = async (req, res, next) => {
    try {
        const appkey = req.headers["x-app-key"];
        const appsecret = req.headers["x-app-secret"];



        if (!appkey || !appsecret) {
            return res.status(401).json({ message: "Missing app credentials" });
        }

        const app = await App.findOne({ appkey, appsecret, is_active: true, is_del: false });

        if (!app) {
            return res.status(403).json({ message: "Invalid or inactive app credentials" });
        }

        if (!app.is_admin_approved) {
            return res.status(403).json({ message: "App not approved by admin yet" });
        }

        req.app = app; // Attach app to request for later use
        next();
    } catch (error) {
        return res.status(500).json({ message: "Error validating app", error: error.message });
    }
};

export default validateAppCredentials;
