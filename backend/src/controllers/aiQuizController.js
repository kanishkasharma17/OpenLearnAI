const {
    generateQuestionsForLesson
} = require("../services/ai/questionGenerationService");

const generateQuiz = async (req, res) => {

    try {

        const result = await generateQuestionsForLesson(
            req.params.lessonId
        );

        res.json(result);

    }

    catch (error) {

        next(error);

    }

};

module.exports = {
    generateQuiz
};