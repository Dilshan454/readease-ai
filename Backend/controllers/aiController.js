const {
    simplifyText: simplifyWithAI,
    generateExercises: generateExercisesWithAI,
    generateSummary: generateSummaryWithAI
} = require("../services/geminiService");

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

const generateExercises = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({
                message: "Please provide text"
            });
        }

        const exercises = await generateExercisesWithAI(text);

        res.status(200).json({
            message: "Exercises generated successfully",
            exercises: exercises
        });

    } catch (error) {
        console.error("AI Exercise Error:", error);

        res.status(500).json({
            message: "AI exercise generation failed",
            error: error.message
        });
    }
};

const generateSummary = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({
                message: "Please provide text"
            });
        }

        const summary = await generateSummaryWithAI(text);

        res.status(200).json({
            message: "Summary generated successfully",
            originalText: text,
            summary: summary
        });

    } catch (error) {
        console.error("AI Summary Error:", error);

        res.status(500).json({
            message: "AI summary generation failed",
            error: error.message
        });
    }
};

module.exports = {
    simplifyText,
    generateExercises,
    generateSummary
};