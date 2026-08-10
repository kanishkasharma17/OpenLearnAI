import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import "./Lessons.css";

// Lists every lesson in a course. Used at /courses/:courseId/lessons.
export function LessonList() {

    const { courseId } = useParams();

    const [lessons, setLessons] = useState([]);
    const [progress, setProgress] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchLessons();
        fetchProgress();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [courseId]);

    const fetchLessons = async () => {
        try {
            const res = await api.get(`/lessons/course/${courseId}`);
            setLessons(res.data);
        } catch (err) {
            setError(err.response?.data?.message || "Could not load lessons");
        }
    };

    const fetchProgress = async () => {
        try {
            const res = await api.get(`/progress/my-progress/${courseId}`);
            setProgress(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Navbar />

            <div className="lessons-page">

                <Link to="/courses" className="back-link">&larr; Back to courses</Link>

                <h1>Course Lessons</h1>

                {progress && (
                    <p className="progress-summary">
                        {progress.completedLessons} / {progress.totalLessons} lessons completed
                        ({progress.progressPercentage}%)
                    </p>
                )}

                {error && <p style={{ color: "#c0392b" }}>{error}</p>}

                <ul className="lesson-list">
                    {lessons.map(lesson => (
                        <li key={lesson.id}>
                            <Link to={`/lessons/${lesson.id}`}>{lesson.title}</Link>
                        </li>
                    ))}
                </ul>

                {lessons.length === 0 && !error && (
                    <p>No lessons published for this course yet.</p>
                )}

            </div>
        </>
    );
}

// Shows a single lesson's content, lets a student mark it complete,
// and links onward to its quiz if one exists. Used at /lessons/:lessonId.
export default function Lessons() {

    const { lessonId } = useParams();
    const navigate = useNavigate();

    const [lesson, setLesson] = useState(null);
    const [error, setError] = useState("");
    const [marking, setMarking] = useState(false);

    useEffect(() => {
        fetchLesson();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lessonId]);

    const fetchLesson = async () => {
        try {
            const res = await api.get(`/lessons/${lessonId}`);
            setLesson(res.data);
        } catch (err) {
            setError(err.response?.data?.message || "Could not load this lesson");
        }
    };

    const markComplete = async () => {
        setMarking(true);
        try {
            await api.post("/progress/complete", { lesson_id: Number(lessonId) });
            await api.post("/activity/log", {
                course_id: lesson.course_id,
                lesson_id: Number(lessonId),
                activity_type: "lesson_complete",
                duration_minutes: 5
            });
            setLesson(prev => ({ ...prev, completed: true }));
        } catch (err) {
            setError(err.response?.data?.message || "Could not save progress");
        } finally {
            setMarking(false);
        }
    };

    if (error) {
        return (
            <>
                <Navbar />
                <div className="lessons-page">
                    <p style={{ color: "#c0392b" }}>{error}</p>
                </div>
            </>
        );
    }

    if (!lesson) {
        return (
            <>
                <Navbar />
                <div className="lessons-page"><p>Loading...</p></div>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="lessons-page">

                <Link to={`/courses/${lesson.course_id}/lessons`} className="back-link">
                    &larr; Back to {lesson.course_title}
                </Link>

                <h1>{lesson.title}</h1>

                <div className="lesson-content">
                    {lesson.content}
                </div>

                <div className="lesson-actions">
                    <button
                        onClick={markComplete}
                        disabled={lesson.completed || marking}
                    >
                        {lesson.completed ? "Completed" : marking ? "Saving..." : "Mark as complete"}
                    </button>

                    {lesson.quiz && (
                        <button
                            className="secondary"
                            onClick={() => navigate(`/quiz/${lesson.quiz.id}`)}
                        >
                            Take quiz: {lesson.quiz.title}
                        </button>
                    )}
                </div>

            </div>
        </>
    );
}
