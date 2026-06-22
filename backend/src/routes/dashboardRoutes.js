const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    getStudentDashboard,
    getLeaderboard,
    getCourseAnalytics
} = require("../controllers/dashboardController");

router.get(
    "/student",
    authMiddleware,
    getStudentDashboard
);
router.get(
    "/leaderboard",
    authMiddleware,
    getLeaderboard
);
router.get(
    "/course/:courseId",
    authMiddleware,
    getCourseAnalytics
);
module.exports = router;