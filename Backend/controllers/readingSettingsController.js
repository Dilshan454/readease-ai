const ReadingSettings = require("../models/ReadingSettings");

const getReadingSettings = async (req, res) => {
    try {
        const settings = await ReadingSettings.findOne({
            user: req.user.id
        });

        if (!settings) {
            return res.status(404).json({
                message: "Reading settings not found"
            });
        }

        res.status(200).json(settings);

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

const createReadingSettings = async (req, res) => {
    try {
        const existingSettings = await ReadingSettings.findOne({
            user: req.user.id
        });

        if (existingSettings) {
            return res.status(400).json({
                message: "Reading settings already exist"
            });
        }

        const settings = await ReadingSettings.create({
            user: req.user.id,
            ...req.body
        });

        res.status(201).json({
            message: "Reading settings created successfully",
            settings
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

module.exports = {
    getReadingSettings,
    createReadingSettings
};