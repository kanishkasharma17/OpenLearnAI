import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/DashboardGate";
import Courses from "./pages/Courses";
import Lessons, { LessonList } from "./pages/Lessons";
import Quiz from "./pages/Quiz";
import Profile from "./pages/Profile";
import StudentIntelligence from "./pages/StudentIntelligence";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/courses"
                element={
                    <ProtectedRoute>
                        <Courses />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/courses/:courseId/lessons"
                element={
                    <ProtectedRoute>
                        <LessonList />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/lessons/:lessonId"
                element={
                    <ProtectedRoute>
                        <Lessons />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/quiz/:quizId"
                element={
                    <ProtectedRoute>
                        <Quiz />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/courses/:courseId/risk"
                element={
                    <ProtectedRoute role="teacher">
                        <StudentIntelligence />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default App;
