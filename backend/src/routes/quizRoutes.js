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
/**
 * @swagger
 * /api/quizzes:
 *   post:
 *     summary: Create a quiz
 *     tags:
 *       - Quizzes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Quiz created successfully
 */
router.post(
    "/",
    authMiddleware,
    teacherMiddleware,
    createQuiz
);
/**
 * @swagger
 * /api/quizzes/course/{courseId}:
 *   get:
 *     summary: Get quizzes for a course
 *     tags:
 *       - Quizzes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of quizzes
 */
router.get(
    "/course/:courseId",
    authMiddleware,
    getCourseQuizzes
);
/**
 * @swagger
 * /api/quizzes/{quizId}/submit:
 *   post:
 *     summary: Submit quiz answers
 *     tags:
 *       - Quizzes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: quizId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Quiz submitted successfully
 */
router.post(
    "/:quizId/submit",
    authMiddleware,
    submit
);
module.exports = router;