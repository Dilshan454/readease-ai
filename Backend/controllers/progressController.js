
const mongoose = require("mongoose");
const Progress = require("../models/Progress");
const Lesson = require("../models/Lesson");


const createProgress = async (req, res) => {
    try {
        const {
            lesson,
            exercisesCompleted = 0,
            exercisesAttempted = 0,
            score = 0,
            completed = false
        } = req.body;

        
        if (!lesson || !mongoose.isValidObjectId(lesson)) {
            return res.status(400).json({
                message: "Please provide a valid lesson ID"
            });
        }

       
        if (
            !Number.isInteger(exercisesCompleted) ||
            !Number.isInteger(exercisesAttempted) ||
            exercisesCompleted < 0 ||
            exercisesAttempted < 0 ||
            exercisesCompleted > exercisesAttempted
        ) {
            return res.status(400).json({
                message:
                    "Exercise counts must be non-negative integers, and completed exercises cannot exceed attempted exercises"
            });
        }

      
        if (
            typeof score !== "number" ||
            !Number.isFinite(score) ||
            score < 0 ||
            score > 100
        ) {
            return res.status(400).json({
                message: "Score must be a number between 0 and 100"
            });
        }

        
        if (typeof completed !== "boolean") {
            return res.status(400).json({
                message: "Completed must be true or false"
            });
        }

       
        const lessonExists = await Lesson.findById(lesson);

        if (!lessonExists) {
            return res.status(404).json({
                message: "Lesson not found"
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

        return res.status(201).json({
            message: "Progress created successfully",
            progress
        });

    } catch (error) {
        console.error("Create progress error:", error);

        return res.status(500).json({
            message: "Failed to create progress"
        });
    }
};



const getMyProgress = async (req, res) => {
    try {
        const progress = await Progress.find({
            user: req.user.id
        })
            .populate("lesson", "title")
            .sort({ createdAt: -1 })
            .lean();

        return res.status(200).json({
            count: progress.length,
            progress
        });

    } catch (error) {
        console.error("Get progress error:", error);

        return res.status(500).json({
            message: "Failed to retrieve progress"
        });
    }
};



const getMyProgressSummary = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.user.id)) {
            return res.status(401).json({
                message: "Invalid authenticated user"
            });
        }

        const userId = new mongoose.Types.ObjectId(
            req.user.id
        );

        const [summary] = await Progress.aggregate([
            {
                $match: {
                    user: userId
                }
            },
            {
                $group: {
                    _id: null,

                    totalRecords: {
                        $sum: 1
                    },

                    completedLessons: {
                        $sum: {
                            $cond: ["$completed", 1, 0]
                        }
                    },

                    totalExercisesAttempted: {
                        $sum: "$exercisesAttempted"
                    },

                    totalExercisesCompleted: {
                        $sum: "$exercisesCompleted"
                    },

                    averageScore: {
                        $avg: "$score"
                    }
                }
            }
        ]);

        const totalRecords = summary?.totalRecords || 0;
        const completedLessons = summary?.completedLessons || 0;

        const averageScore = summary
            ? Number(summary.averageScore.toFixed(2))
            : 0;

        const completionRate = totalRecords > 0
            ? Number(
                ((completedLessons / totalRecords) * 100).toFixed(2)
            )
            : 0;

        return res.status(200).json({
            message: "Progress summary retrieved successfully",

            summary: {
                totalRecords,
                completedLessons,
                completionRate,
                totalExercisesAttempted:
                    summary?.totalExercisesAttempted || 0,
                totalExercisesCompleted:
                    summary?.totalExercisesCompleted || 0,
                averageScore
            }
        });

    } catch (error) {
        console.error("Progress summary error:", error);

        return res.status(500).json({
            message: "Failed to retrieve progress summary"
        });
    }
};


module.exports = {
    createProgress,
    getMyProgress,
    getMyProgressSummary
};
