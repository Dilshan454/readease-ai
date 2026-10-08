const Progress = require("../models/Progress");

const getRecommendations = async (userId) => {
    const progress = await Progress.find({
        user: userId
    }).populate("lesson", "title");

    
    if (progress.length === 0) {
        return {
            analytics: {
                totalLessons: 0,
                completedLessons: 0,
                averageScore: 0,
                totalExercisesAttempted: 0,
                totalExercisesCompleted: 0
            },
            recommendations: [
                "Start your first lesson to begin tracking your learning progress."
            ]
        };
    }

    
    const totalLessons = progress.length;

    const completedLessons = progress.filter(
        item => item.completed === true
    ).length;

    const totalExercisesAttempted = progress.reduce(
        (total, item) => total + (item.exercisesAttempted || 0),
        0
    );

    const totalExercisesCompleted = progress.reduce(
        (total, item) => total + (item.exercisesCompleted || 0),
        0
    );

    const totalScore = progress.reduce(
        (total, item) => total + (item.score || 0),
        0
    );

    const averageScore = Math.round(totalScore / totalLessons);

    
    const recommendations = [];

    if (averageScore < 50) {
        recommendations.push(
            "Your average score is low. Practice more exercises and review the lessons again."
        );
    } else if (averageScore < 75) {
        recommendations.push(
            "You are making good progress. Continue practicing to improve your score."
        );
    } else {
        recommendations.push(
            "Excellent performance! Try more challenging exercises to strengthen your skills."
        );
    }

    if (completedLessons < totalLessons) {
        recommendations.push(
            "Complete your unfinished lessons to improve your overall learning progress."
        );
    }

    if (
        totalExercisesAttempted > 0 &&
        totalExercisesCompleted < totalExercisesAttempted
    ) {
        recommendations.push(
            "Practice more exercises to improve your exercise completion rate."
        );
    }

    
    const weakestLesson = [...progress].sort(
        (a, b) => a.score - b.score
    )[0];

    if (weakestLesson && weakestLesson.lesson) {
        recommendations.push(
            `Consider reviewing "${weakestLesson.lesson.title}" because it has your lowest score.`
        );
    }

    return {
        analytics: {
            totalLessons,
            completedLessons,
            averageScore,
            totalExercisesAttempted,
            totalExercisesCompleted
        },
        recommendations
    };
};

module.exports = {
    getRecommendations
};