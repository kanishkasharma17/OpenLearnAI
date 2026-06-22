const express = require("express");
const cors = require("cors");
const testRoutes = require("./routes/testRoutes");
const courseRoutes = require("./routes/courseRoutes");

require("./config/db");

const authRoutes = require("./routes/authRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const app = express();
const quizRoutes = require("./routes/quizRoutes");
const questionRoutes = require("./routes/questionRoutes");
const attemptRoutes= require("./routes/attemptRoutes");
const lessonRoutes=require("./routes/lessonRoutes");
const progressRoutes=require("./routes/progressRoutes");
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("OpenLearn AI Backend Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/questions",questionRoutes);
app.use("/api/attempts",attemptRoutes);
app.use("/api/lessons",lessonRoutes);
app.use("/api/progress",progressRoutes);
module.exports = app;