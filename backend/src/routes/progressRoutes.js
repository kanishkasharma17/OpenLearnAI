const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    completeLesson,
    getMyProgress
} = require("../controllers/progressController");

router.post(
    "/complete",
    authMiddleware,
    completeLesson
);

router.get(
    "/my-progress/:courseId",
    authMiddleware,
    getMyProgress
);

module.exports = router;