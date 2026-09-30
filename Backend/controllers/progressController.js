const Progress = require("../models/Progress");

const createProgress = async (req, res) => {
    try {
        const {
            lesson,
            exercisesCompleted,
            exercisesAttempted,
            score,
            completed
        } = req.body;

        if (!lesson) {
            return res.status(400).json({
                message: "Please provide lesson ID"
            });
        }

        const progress = await Progress.create({
            user: req.user.id,
            lesson,
            exercisesCompleted,
            exercisesAttempted,
            score,
            completed
        });

        res.status(201).json({
            message: "Progress created successfully",
            progress
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


const getMyProgress = async (req, res) => {
    try {
        const progress = await Progress.find({
            user: req.user.id
        }).populate("lesson", "title");

        res.status(200).json(progress);

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


module.exports = {
    createProgress,
    getMyProgress
};