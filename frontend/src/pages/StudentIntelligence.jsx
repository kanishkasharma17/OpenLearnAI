import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import "./StudentIntelligence.css";

const RISK_COLORS = {
    Low: "#3fa34d",
    Medium: "#d99a2b",
    High: "#c0392b"
};

// Teacher-facing view: every student enrolled in this course, sorted
// by risk score, with the top factors driving each student's score.
export default function StudentIntelligence() {

    const { courseId } = useParams();

    const [data, setData] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchOverview();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [courseId]);

    const fetchOverview = async () => {

        try {

            const res = await api.get(`/student-intelligence/course/${courseId}/risk`);

            setData(res.data);

        } catch (err) {

            setError(err.response?.data?.message || "Could not load risk data for this course");

        }

    };

    return (
        <>
            <Navbar />

            <div className="risk-overview">

                <Link to="/courses" className="back-link">&larr; Back to courses</Link>

                {error && <p style={{ color: "#c0392b" }}>{error}</p>}

                {!error && !data && <p>Loading...</p>}

                {data && (
                    <>
                        <h1>{data.course}: Student Risk Overview</h1>

                        {data.students.length === 0 && (
                            <p>No students enrolled in this course yet.</p>
                        )}

                        <div className="risk-table">

                            {data.students.map(student => (
                                <div className="risk-row" key={student.student_id}>

                                    <div className="risk-row-main">
                                        <span className="student-name">{student.name}</span>
                                        <span className="student-email">{student.email}</span>
                                    </div>

                                    <div className="risk-badge-wrap">
                                        <span
                                            className="risk-badge"
                                            style={{ background: RISK_COLORS[student.risk_level] }}
                                        >
                                            {student.risk_level} risk ({student.risk_score}/100)
                                        </span>
                                    </div>

                                    {student.reasons.length > 0 && (
                                        <ul className="risk-row-reasons">
                                            {student.reasons.map(reason => (
                                                <li key={reason}>{reason}</li>
                                            ))}
                                        </ul>
                                    )}

                                </div>
                            ))}

                        </div>
                    </>
                )}

            </div>
        </>
    );
}
