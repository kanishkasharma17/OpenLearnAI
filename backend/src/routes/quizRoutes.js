const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const teacherMiddleware = require("../middleware/teacherMiddleware");

const {
    submit
} = require("../controllers/quizSubmissionController");
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
router.post(
    "/:quizId/submit",
    authMiddleware,
    submit
);
module.exports = router;