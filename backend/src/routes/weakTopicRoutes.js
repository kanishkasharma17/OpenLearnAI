const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
    getWeakTopics
} = require("../controllers/weakTopicController");

/**
 * @swagger
 * /api/weak-topics:
 *   get:
 *     summary: Get weak topics identified from quiz attempts
 *     tags:
 *       - Analytics
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Weak topics retrieved successfully
 */
router.get(
    "/",
    auth,
    getWeakTopics
);

module.exports = router;