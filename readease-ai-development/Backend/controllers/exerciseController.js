const Exercise = require("../models/Exercise");

const createExercise = async (req, res) => {
    try {
        const {
            title,
            question,
            options,
            correctAnswer,
            language,
            difficulty
        } = req.body;

        if (!title || !question || !options || !correctAnswer) {
            return res.status(400).json({
                message: "Please provide title, question, options and correct answer"
            });
        }

        const exercise = await Exercise.create({
            title,
            question,
            options,
            correctAnswer,
            language,
            difficulty,
            createdBy: req.user.id
        });

        res.status(201).json({
            message: "Exercise created successfully",
            exercise
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


const getExercises = async (req, res) => {
    try {
        const exercises = await Exercise.find();

        res.status(200).json(exercises);

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


module.exports = {
    createExercise,
    getExercises
};