const {
    calculateStatistics
} = require("../services/statisticsService");

const {
    getRecommendation
} = require("../services/recommendationService");

const getStudentIntelligence = async (req, res,next) => {

    try {
        

        const statistics = await calculateStatistics(req.user.id);

        const recommendation = await getRecommendation(req.user.id);

        res.json({
            statistics,
            recommendation
        });

    } catch (error) {

        next(error);

    }

};



module.exports = {
    getStudentIntelligence
};