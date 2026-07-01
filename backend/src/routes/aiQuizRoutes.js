const express = require("express");

const router = express.Router();

const {
    generateQuiz
} = require("../controllers/aiQuizController");
/**
 * @swagger
 * /api/ai-quiz/generate/{lessonId}:
 *   post:
 *     summary: Generate AI quiz
 *     tags:
 *       - AI Quiz
 *     parameters:
 *       - in: path
 *         name: lessonId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Quiz generated
 */
router.post(
    "/generate/:lessonId",
    generateQuiz
);

module.exports = router;