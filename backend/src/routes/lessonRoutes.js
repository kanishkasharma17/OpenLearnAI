const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const teacherMiddleware = require("../middleware/teacherMiddleware");

const {
    createLesson,
    getCourseLessons
} = require("../controllers/lessonController");

router.post(
    "/",
    authMiddleware,
    teacherMiddleware,
    createLesson
);

router.get(
    "/course/:courseId",
    authMiddleware,
    getCourseLessons
);

module.exports = router;