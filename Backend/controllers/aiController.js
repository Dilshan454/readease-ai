const { simplifyText: simplifyWithAI } = require("../services/geminiService");

const simplifyText = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({
                message: "Please provide text"
            });
        }

        const simplifiedText = await simplifyWithAI(text);

        res.status(200).json({
            message: "Text simplified successfully",
            originalText: text,
            simplifiedText: simplifiedText
        });

    } catch (error) {
        console.error("AI Error:", error);

        res.status(500).json({
            message: "AI processing failed",
            error: error.message
        });
    }
};

module.exports = {
    simplifyText
};