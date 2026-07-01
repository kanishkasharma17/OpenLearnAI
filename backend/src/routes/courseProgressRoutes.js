const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
    getProgress
} = require("../controllers/courseProgressController");

/**
 * @swagger
 * /api/course-progress:
 *   get:
 *     summary: Get course progress
 *     tags:
 *       - Progress
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Course progress
 */
router.get("/", auth, getProgress);

module.exports = router;