import mongoose from "mongoose";

const appSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    appkey: {
        type: String,
        required: true,
    },
    appsecret: {
        type: String,
        required: true,
    },
    is_active: {
        type: Boolean,
        default: true,
    },
    is_del: {
        type: Boolean,
        default: false,
    },
    is_admin_approved: {
        type: Boolean,
        default: false, // Indicates if the app is approved by an admin
    },
    enable_generation: {
        type: Boolean,
        default: false,
    }, // Indicates if the app is enabled for generation
    enable_rewrite: {
        type: Boolean,
        default: false,
    }, // Indicates if the app is enabled for chat
    enable_translate: {
        type: Boolean,
        default: false,
    }, // Indicates if the app is enabled for search
}, {
    timestamps: true, // Automatically update createdAt and updatedAt fields

});

const App = mongoose.model("App", appSchema);
export default App;