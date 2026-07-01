const {
    calculateStatistics
} = require("../services/statisticsService");

const {
    getRecommendation
} = require("../services/recommendationService");

const getStudentIntelligence = async (req, res) => {

    try {

        const statistics = await calculateStatistics(req.user.id);

        const recommendation = await getRecommendation(req.user.id);

        res.json({
            statistics,
            recommendation
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

module.exports = {
    getStudentIntelligence
};