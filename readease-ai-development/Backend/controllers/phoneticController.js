const {
    generatePhonetic
} = require("../services/phoneticService");

const getPhonetic = async (req, res) => {
    try {
        const { word } = req.body;

        
        if (!word) {
            return res.status(400).json({
                message: "Please provide a word"
            });
        }

        
        const phoneticResult = await generatePhonetic(word);

        res.status(200).json({
            message: "Phonetic assistance generated successfully",
            result: phoneticResult
        });

    } catch (error) {
        console.error("Phonetic Error:", error);

        res.status(500).json({
            message: "Phonetic assistance failed",
            error: error.message
        });
    }
};

module.exports = {
    getPhonetic
};