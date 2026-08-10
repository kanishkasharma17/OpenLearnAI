import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import "./Courses.css";

export default function Courses() {

    const { user } = useAuth();

    const [courses, setCourses] = useState([]);
    const [enrolledIds, setEnrolledIds] = useState(new Set());
    const [enrollingId, setEnrollingId] = useState(null);
    const [error, setError] = useState("");

    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newCourse, setNewCourse] = useState({ title: "", description: "" });
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        fetchCourses();
        if (user?.role === "student") {
            fetchMyCourses();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const fetchCourses = async () => {

        try {

            const res = await api.get("/courses");

            setCourses(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    const fetchMyCourses = async () => {

        try {

            const res = await api.get("/enrollments/my-courses");

            setEnrolledIds(new Set(res.data.map(course => course.id)));

        } catch (err) {

            console.log(err);

        }

    };

    const handleEnroll = async (courseId) => {

        setError("");
        setEnrollingId(courseId);

        try {

            await api.post("/enrollments", { course_id: courseId });

            setEnrolledIds(prev => new Set(prev).add(courseId));

        } catch (err) {

            setError(err.response?.data?.message || "Could not enroll in this course");

        } finally {

            setEnrollingId(null);

        }

    };

    const handleCreateCourse = async (e) => {

        e.preventDefault();
        setError("");

        if (!newCourse.title.trim()) {
            setError("Course title is required");
            return;
        }

        setCreating(true);

        try {

            await api.post("/courses", newCourse);

            setNewCourse({ title: "", description: "" });
            setShowCreateForm(false);
            fetchCourses();

        } catch (err) {

            setError(err.response?.data?.message || "Could not create course");

        } finally {

            setCreating(false);

        }

    };

    return (

        <>
            <Navbar />

            <div className="courses-page">

                <h1>Available Courses</h1>

                {user?.role === "teacher" && (
                    <div className="create-course-block">
                        <button
                            className="secondary"
                            onClick={() => setShowCreateForm(prev => !prev)}
                        >
                            {showCreateForm ? "Cancel" : "+ Create a course"}
                        </button>

                        {showCreateForm && (
                            <form className="create-course-form" onSubmit={handleCreateCourse}>
                                <input
                                    type="text"
                                    placeholder="Course title"
                                    value={newCourse.title}
                                    onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                                />
                                <textarea
                                    placeholder="Course description"
                                    value={newCourse.description}
                                    onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                                />
                                <button type="submit" disabled={creating}>
                                    {creating ? "Creating..." : "Create course"}
                                </button>
                            </form>
                        )}
                    </div>
                )}

                {error && <p style={{ color: "#c0392b" }}>{error}</p>}

                <div className="courses-grid">

                    {courses.map(course => {

                        const isEnrolled = enrolledIds.has(course.id);
                        const isOwnCourse = user?.role === "teacher" && course.teacher_id === user.id;

                        return (
                            <div
                                key={course.id}
                                className="course-card"
                            >

                                <h2>{course.title}</h2>

                                <p className="course-teacher">By {course.teacher}</p>

                                <p>{course.description}</p>

                                {user?.role === "student" && (
                                    <>
                                        <button
                                            onClick={() => handleEnroll(course.id)}
                                            disabled={isEnrolled || enrollingId === course.id}
                                        >
                                            {isEnrolled
                                                ? "Enrolled"
                                                : enrollingId === course.id
                                                    ? "Enrolling..."
                                                    : "Enroll"}
                                        </button>

                                        {isEnrolled && (
                                            <Link
                                                to={`/courses/${course.id}/lessons`}
                                                className="risk-link"
                                            >
                                                View lessons
                                            </Link>
                                        )}
                                    </>
                                )}

                                {isOwnCourse && (
                                    <Link
                                        to={`/courses/${course.id}/risk`}
                                        className="risk-link"
                                    >
                                        View student risk
                                    </Link>
                                )}

                            </div>
                        );

                    })}

                </div>

            </div>

        </>

    );

}
