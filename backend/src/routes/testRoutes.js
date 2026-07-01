const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
    test
} = require("../controllers/testController");


/**
 * @swagger
 * /api/test:
 *   get:
 *     summary: Test authenticated API access
 *     tags:
 *       - Testing
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Test endpoint successful
 */

router.get("/", auth, test);

module.exports = router;