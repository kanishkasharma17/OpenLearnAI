const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    completeLesson,
    getMyProgress
} = require("../controllers/progressController");

/**
 * @swagger
 * /api/progress/complete:
 *   post:
 *     summary: Mark a lesson as completed
 *     tags:
 *       - Progress
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lesson marked as completed
 */
router.post(
    "/complete",
    authMiddleware,
    completeLesson
);
/**
 * @swagger
 * /api/progress/my-progress/{courseId}:
 *   get:
 *     summary: Get progress for a course
 *     tags:
 *       - Progress
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
 *         description: Course progress retrieved
 */
router.get(
    "/my-progress/:courseId",
    authMiddleware,
    getMyProgress
);

module.exports = router;