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
const dashboardRoutes=require("./routes/dashboardRoutes");
const activityRoutes=require("./routes/activityRoutes");
const mlRoutes=require("./routes/mlRoutes");
const studentIntelligenceRoutes=require("./routes/studentIntelligenceRoutes")
const courseProgressRoutes=require("./routes/courseProgressRoutes");
const aiQuizRoutes=require("./routes/aiQuizRoutes");
const quizSubmissionRoutes=require("./routes/quizSubmissionRoutes");
const weakTopicRoutes=require("./routes/weakTopicRoutes");
const errorHandler=require("./middleware/errorMiddleware");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
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
app.use("/api/dashboard",dashboardRoutes);
app.use("/api/activity",activityRoutes);
app.use("/api/ml",mlRoutes);
app.use("/api/student-intelligence",studentIntelligenceRoutes);
app.use("/api/course-progress",courseProgressRoutes);
app.use("/api/ai",aiQuizRoutes);
app.use("/api/weak-topics",weakTopicRoutes);
app.use(errorHandler);
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec)
);


module.exports = app;
