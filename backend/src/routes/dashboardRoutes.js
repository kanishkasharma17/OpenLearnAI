const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    getStudentDashboard,
    getLeaderboard,
    getCourseAnalytics,
    getTopStudents
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
router.get(
    "/course/:courseId/top-students",
    authMiddleware,
    getTopStudents
);
module.exports = router;