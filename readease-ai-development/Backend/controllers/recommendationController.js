const {
    getRecommendations
} = require("../services/recommendationService");

const getMyRecommendations = async (req, res) => {
    try {
        const result = await getRecommendations(req.user.id);

        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

module.exports = {
    getMyRecommendations
};