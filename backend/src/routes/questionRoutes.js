const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const teacherMiddleware = require("../middleware/teacherMiddleware");

const {
    addQuestion,
    getQuizQuestions
} = require("../controllers/questionController");
/**
 * @swagger
 * /api/questions:
 *   post:
 *     summary: Add a question to a quiz
 *     tags:
 *       - Questions
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Question added successfully
 */
router.post(
    "/",
    authMiddleware,
    teacherMiddleware,
    addQuestion
);


/**
 * @swagger
 * /api/questions/quiz/{quizId}:
 *   get:
 *     summary: Get all questions for a quiz
 *     tags:
 *       - Questions
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
 *         description: Quiz questions retrieved
 */
router.get(
    "/quiz/:quizId",
    authMiddleware,
    getQuizQuestions
);

module.exports = router;