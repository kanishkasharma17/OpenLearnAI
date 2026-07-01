const {
    detectWeakTopics
} = require("../services/weakTopicService");

const getWeakTopics = async (req, res,next) => {

    try {

        const topics = await detectWeakTopics(req.user.id);

        res.json(topics);

    }

    catch (error) {

        next(error);

    }

};

module.exports = {
    getWeakTopics
};