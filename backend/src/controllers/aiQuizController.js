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

        console.error(error);

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    generateQuiz
};