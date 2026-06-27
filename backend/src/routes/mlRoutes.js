const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    getTrainingData,
    getRecommendation
} = require("../controllers/mlController");

router.get(
    "/training-data",
    authMiddleware,
    getTrainingData
);

router.get(
    "/recommendation",
    authMiddleware,
    getRecommendation
);

module.exports = router;