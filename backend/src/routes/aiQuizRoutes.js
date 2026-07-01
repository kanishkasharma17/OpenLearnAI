const express = require("express");

const router = express.Router();

const {
    generateQuiz
} = require("../controllers/aiQuizController");

router.post(
    "/generate/:lessonId",
    generateQuiz
);

module.exports = router;