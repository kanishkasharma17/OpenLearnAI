const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const teacherMiddleware = require("../middleware/teacherMiddleware");

const {
    logActivity,
    getMyActivity
} = require("../controllers/activityController");

/**
 * @swagger
 * /api/activity/log:
 *   post:
 *     summary: Log learning activity
 *     tags:
 *       - Activity
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Activity logged
 */
router.post(
    "/log",
    authMiddleware,
    logActivity
);
/**
 * @swagger
 * /api/activity/my:
 *   get:
 *     summary: Get my learning activity
 *     tags:
 *       - Activity
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Learning activity
 */
router.get(
    "/my",
    authMiddleware,
    getMyActivity
);

module.exports = router;