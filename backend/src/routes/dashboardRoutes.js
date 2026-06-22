const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    getStudentDashboard
} = require("../controllers/dashboardController");

router.get(
    "/student",
    authMiddleware,
    getStudentDashboard
);

module.exports = router;