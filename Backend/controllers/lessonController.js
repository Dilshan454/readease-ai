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


module.exports = {
    createLesson,
    getLessons
};