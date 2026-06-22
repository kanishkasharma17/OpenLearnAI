const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    submitQuiz
} = require("../controllers/attemptController");

router.post(
    "/submit",
    authMiddleware,
    submitQuiz
);

module.exports = router;