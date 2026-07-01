const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    submitQuiz
} = require("../controllers/attemptController");

/**
 * @swagger
 * /api/attempts/submit:
 *   post:
 *     summary: Submit a quiz attempt
 *     tags:
 *       - Attempts
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Quiz attempt submitted successfully
 */
router.post(
    "/submit",
    authMiddleware,
    submitQuiz
);

module.exports = router;