import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import "./TeacherDashboard.css";

const RISK_COLORS = {
    Low: "#3fa34d",
    Medium: "#d99a2b",
    High: "#c0392b"
};

export default function TeacherDashboard() {

    const [data, setData] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchOverview();
    }, []);

    const fetchOverview = async () => {
        try {
            const res = await api.get("/student-intelligence/teacher/overview");
            setData(res.data);
        } catch (err) {
            setError(err.response?.data?.message || "Could not load your dashboard");
        }
    };

    if (error) {
        return (
            <>
                <Navbar />
                <div className="teacher-dashboard">
                    <p style={{ color: "#c0392b" }}>{error}</p>
                </div>
            </>
        );
    }

    if (!data) {
        return (
            <>
                <Navbar />
                <div className="teacher-dashboard"><h2>Loading Dashboard...</h2></div>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="teacher-dashboard">

                <h1>Teacher Dashboard</h1>

                <div className="summary-grid">

                    <div className="summary-card">
                        <span className="summary-value">{data.total_courses}</span>
                        <span className="summary-label">Courses</span>
                    </div>

                    <div className="summary-card">
                        <span className="summary-value">{data.total_students}</span>
                        <span className="summary-label">Students</span>
                    </div>

                    <div className="summary-card at-risk">
                        <span className="summary-value">{data.total_at_risk}</span>
                        <span className="summary-label">High Risk Students</span>
                    </div>

                </div>

                {data.courses.length === 0 && (
                    <p className="empty-state">
                        You haven't created any courses yet. Head to
                        {" "}<Link to="/courses">Courses</Link> to create one.
                    </p>
                )}

                <div className="course-overview-list">

                    {data.courses.map(course => (
                        <div className="course-overview-card" key={course.id}>

                            <div className="course-overview-header">
                                <h2>{course.title}</h2>
                                <Link
                                    to={`/courses/${course.id}/risk`}
                                    className="risk-link"
                                >
                                    View full roster &rarr;
                                </Link>
                            </div>

                            <div className="course-overview-stats">
                                <div>
                                    <span className="stat-value">{course.enrolled_count}</span>
                                    <span className="stat-label">enrolled</span>
                                </div>
                                <div>
                                    <span className="stat-value">{course.avg_completion_rate}%</span>
                                    <span className="stat-label">avg. completion</span>
                                </div>
                                <div>
                                    <span className="stat-value">{course.total_lessons}</span>
                                    <span className="stat-label">lessons</span>
                                </div>
                            </div>

                            <div className="risk-breakdown">
                                {["High", "Medium", "Low"].map(level => (
                                    course.risk_counts[level] > 0 && (
                                        <span
                                            key={level}
                                            className="risk-chip"
                                            style={{ background: RISK_COLORS[level] }}
                                        >
                                            {course.risk_counts[level]} {level}
                                        </span>
                                    )
                                ))}
                                {course.enrolled_count === 0 && (
                                    <span className="risk-chip empty">No students yet</span>
                                )}
                            </div>

                            {course.top_risk_students.length > 0 && (
                                <div className="top-risk-students">
                                    <h4>Needs attention</h4>
                                    <ul>
                                        {course.top_risk_students.map(student => (
                                            <li key={student.student_id}>
                                                <span>{student.name}</span>
                                                <span
                                                    className="mini-risk-badge"
                                                    style={{ color: RISK_COLORS[student.risk_level] }}
                                                >
                                                    {student.risk_level} ({student.risk_score}/100)
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                        </div>
                    ))}

                </div>

            </div>
        </>
    );
}
