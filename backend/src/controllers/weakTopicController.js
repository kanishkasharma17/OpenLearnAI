const {
    detectWeakTopics
} = require("../services/weakTopicService");

const getWeakTopics = async (req, res) => {

    try {

        const topics = await detectWeakTopics(req.user.id);

        res.json(topics);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    getWeakTopics
};