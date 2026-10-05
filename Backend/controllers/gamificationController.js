const {
    calculatePoints,
    getLevel,
    getBadge
} = require("../services/gamificationService");


const getGamificationResult = async (req, res) => {

    try {

        const { activity, score, totalPoints } = req.body;


        
        if (!activity) {
            return res.status(400).json({
                message: "Please provide an activity"
            });
        }


        
        const earnedPoints = calculatePoints(activity, score || 0);


        
        const updatedTotalPoints =
            (totalPoints || 0) + earnedPoints;


        
        const level = getLevel(updatedTotalPoints);


        
        const badge = getBadge(updatedTotalPoints);


        res.status(200).json({

            message: "Gamification result generated successfully",

            activity: activity,

            earnedPoints: earnedPoints,

            totalPoints: updatedTotalPoints,

            level: level,

            badge: badge

        });

    } catch (error) {

        console.error("Gamification Error:", error);

        res.status(500).json({
            message: "Gamification processing failed",
            error: error.message
        });

    }
};


module.exports = {
    getGamificationResult
};