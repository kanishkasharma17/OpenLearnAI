const axios = require("axios");

const {
    buildFeatures
} = require("./featureEngineeringService");

const {
    filterRecommendations
} = require("./recommendationEngine");

const {
    detectWeakTopics
} = require("./weakTopicService");


const getRecommendation = async (studentId) => {

    const features = await buildFeatures(studentId);
    
    console.log("ML URL:", process.env.ML_SERVICE_URL);
    console.log("Features being sent:");
    console.log(features);

    const response = await axios.post(
    process.env.ML_SERVICE_URL + "/predict",
    features
);

    const filtered = await filterRecommendations(
        studentId,
        response.data.top_recommendations
    );

    const weakTopics = await detectWeakTopics(studentId);
    let reason;

if (weakTopics.length > 0) {

    reason =
        `Your weakest topic is "${weakTopics[0].title}" with an accuracy of ${weakTopics[0].accuracy}%.`;

}
else {

    reason =
        "Not enough quiz attempts to determine weak topics.";

}

    return {

        recommended_course:
            filtered[0]?.course || null,

        confidence:
            filtered[0]?.confidence || 0,

        filtered_courses:
            filtered,
        reason,
        weak_topics:weakTopics

    };

};

module.exports = {
    getRecommendation
};