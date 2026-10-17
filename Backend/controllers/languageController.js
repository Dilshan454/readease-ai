
const User = require("../models/User");


const getLanguage = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .select("language");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            language: user.language
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve language"
        });
    }
};



const updateLanguage = async (req, res) => {
    try {
        const { language } = req.body;

        const supportedLanguages = [
            "English",
            "Sinhala",
            "Tamil"
        ];

        if (!supportedLanguages.includes(language)) {
            return res.status(400).json({
                message: "Unsupported language"
            });
        }

        
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { language },
            {
                new: true,
                runValidators: true
            }
        ).select("language");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "Language updated successfully",
            language: user.language
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update language"
        });
    }
};

module.exports = {
    getLanguage,
    updateLanguage
};
