const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const teacherMiddleware = require("../middleware/teacherMiddleware");

const {
    createCourse,
    getCourses
} = require("../controllers/courseController");

router.post(
    "/",
    authMiddleware,
    teacherMiddleware,
    createCourse
);

router.get(
    "/",
    authMiddleware,
    getCourses
);

module.exports = router;