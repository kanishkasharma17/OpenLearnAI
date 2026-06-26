const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const teacherMiddleware = require("../middleware/teacherMiddleware");

const {
    logActivity,
    getMyActivity
} = require("../controllers/activityController");

router.post(
    "/log",
    authMiddleware,
    logActivity
);

router.get(
    "/my",
    authMiddleware,
    getMyActivity
);

module.exports = router;