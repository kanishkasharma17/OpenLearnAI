const express = require("express");
const cors = require("cors");
const testRoutes = require("./routes/testRoutes");
const courseRoutes = require("./routes/courseRoutes");

require("./config/db");

const authRoutes = require("./routes/authRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("OpenLearn AI Backend Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);
module.exports = app;