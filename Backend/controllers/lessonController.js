
const Lesson = require("../models/Lesson");


const createLesson = async (req, res) => {
    try {
        const { title, description, content, language } = req.body;

        if (!title || !description || !content) {
            return res.status(400).json({
                message: "Please provide title, description and content"
            });
        }

        const lesson = await Lesson.create({
            title,
            description,
            content,
            language,
            createdBy: req.user.id
        });

        res.status(201).json({
            message: "Lesson created successfully",
            lesson
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};



const getLessons = async (req, res) => {
    try {
        const lessons = await Lesson.find();

        res.status(200).json(lessons);

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};



const uploadLearningMaterial = async (req, res) => {
    try {
        
        if (!req.file) {
            return res.status(400).json({
                message: "Please upload a learning material file"
            });
        }

        // Return uploaded file information
        res.status(201).json({
            message: "Learning material uploaded successfully",
            file: {
                originalName: req.file.originalname,
                filename: req.file.filename,
                size: req.file.size,
                mimetype: req.file.mimetype
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to upload learning material",
            error: error.message
        });
    }
};



module.exports = {
    createLesson,
    getLessons,
    uploadLearningMaterial
};
