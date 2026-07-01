const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    getTrainingData,
    getRecommendation
} = require("../controllers/mlController");


/**
 * @swagger
 * /api/ml/training-data:
 *   get:
 *     summary: Get training data for the recommendation model
 *     tags:
 *       - Machine Learning
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Training data retrieved successfully
 */

router.get(
    "/training-data",
    authMiddleware,
    getTrainingData
);


/**
 * @swagger
 * /api/ml/recommendation:
 *   get:
 *     summary: Get AI course recommendations
 *     tags:
 *       - Machine Learning
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Course recommendations generated
 */
router.get(
    "/recommendation",
    authMiddleware,
    getRecommendation
);

module.exports = router;