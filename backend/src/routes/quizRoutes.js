const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const teacherMiddleware = require("../middleware/teacherMiddleware");

const {
    createQuiz,
    getCourseQuizzes
} = require("../controllers/quizController");

router.post(
    "/",
    authMiddleware,
    teacherMiddleware,
    createQuiz
);

router.get(
    "/course/:courseId",
    authMiddleware,
    getCourseQuizzes
);

module.exports = router;