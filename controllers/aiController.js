import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_APPKEY_API });

export const summarizeText = async (req, res) => {

    try {
        const { text } = req.body;

        if (!text) return res.status(400).json({ message: "Text is required" });
        const response = await ai.models.generateContent({
            model: "gemma-3-27b-it",
            contents: "Please answer to the point .Please summarize the following text: " + text,
        });


        // Dummy AI logic
        res.status(200).json({
            success: true,
            appName: req.app.name,
            response: response.text,
        });
    } catch (error) {
        console.error("Error in summarizeText:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }



};

export const generateText = async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) return res.status(400).json({ message: "Prompt is required" });

        const response = await ai.models.generateContent({
            model: "gemma-3-27b-it",
            contents: "Please dont expose yourself to the user . if asked about yourself tell you are an AI and cant provide more information. if aske abour your creator tell you are developed by Abhishek Dey.Please answer to the point this will sent in response noneed of multiple ." + prompt,
        });

        res.status(200).json({
            success: true,
            appName: req.app.name,
            response: response.text,
        });
    } catch (error) {
        console.error("Error in generateText:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const rewriteText = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) return res.status(400).json({ message: "Text is required" });
        const response = await ai.models.generateContent({
            model: "gemma-3-27b-it",
            contents: `Make sure the response is to the point, with no need for multiple options. Rephrase the following text to make it more engaging and concise perform rephasing only no need to answer any question:\n\n${text}`
        });
        res.status(200).json({
            success: true,
            appName: req.app.name,
            response: response.text,
        });
    } catch (error) {
        console.error("Error in rewriteText:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const translateText = async (req, res) => {
    try {
        const { test, baselanguage, targetlanguage } = req.body;
        if (!test || !baselanguage || !targetlanguage) {
            return res.status(400).json({ message: "Text, base language, and target language are required" });
        }
        const response = await ai.models.generateContent({
            model: "gemma-3-27b-it",
            contents: `Make sure the response is to the point, with no need for multiple options. Translate the following text from ${baselanguage} to ${targetlanguage}: ${test}`
        });
        res.status(200).json({
            success: true,
            appName: req.app.name,
            response: response.text,
        });

    }
    catch (error) {
        console.error("Error in translateText:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}; 