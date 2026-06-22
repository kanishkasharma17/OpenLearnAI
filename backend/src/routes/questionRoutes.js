const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const teacherMiddleware = require("../middleware/teacherMiddleware");

const {
    addQuestion,
    getQuizQuestions
} = require("../controllers/questionController");

router.post(
    "/",
    authMiddleware,
    teacherMiddleware,
    addQuestion
);

router.get(
    "/quiz/:quizId",
    authMiddleware,
    getQuizQuestions
);

module.exports = router;