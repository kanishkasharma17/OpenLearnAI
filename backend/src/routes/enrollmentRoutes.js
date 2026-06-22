const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    enrollCourse,
    getMyCourses,
    getCourseStudents
} = require("../controllers/enrollmentController");

router.post(
    "/",
    authMiddleware,
    enrollCourse
);

router.get(
    "/my-courses",
    authMiddleware,
    getMyCourses
);

router.get(
    "/course/:id/students",
    authMiddleware,
    getCourseStudents
);

module.exports = router;