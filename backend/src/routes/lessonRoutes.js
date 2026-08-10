const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const teacherMiddleware = require("../middleware/teacherMiddleware");

const {
    createLesson,
    getCourseLessons,
    getLessonById
} = require("../controllers/lessonController");

/**
 * @swagger
 * /api/lessons:
 *   post:
 *     summary: Create a lesson
 *     tags:
 *       - Lessons
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Lesson created
 */
router.post(
    "/",
    authMiddleware,
    teacherMiddleware,
    createLesson
);
/**
 * @swagger
 * /api/lessons/course/{courseId}:
 *   get:
 *     summary: Get lessons of a course
 *     tags:
 *       - Lessons
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of lessons
 */
router.get(
    "/course/:courseId",
    authMiddleware,
    getCourseLessons
);

/**
 * @swagger
 * /api/lessons/{id}:
 *   get:
 *     summary: Get a single lesson (with completion status and linked quiz)
 *     tags:
 *       - Lessons
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lesson retrieved
 */
router.get(
    "/:id",
    authMiddleware,
    getLessonById
);

module.exports = router;