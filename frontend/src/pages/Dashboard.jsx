import { useEffect, useState } from "react";
import api from "../api/axios";
import {
    FaChartLine,
    FaClipboardCheck,
    FaClock,
    FaCalendarAlt,
    FaFire,
    FaExclamationTriangle,
    FaBullseye
} from "react-icons/fa";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip
} from "recharts";

import "react-circular-progressbar/dist/styles.css";
import Navbar from "../components/Navbar";
import "./Dashboard.css";
const RISK_COLORS = {
    Low: "#3fa34d",
    Medium: "#d99a2b",
    High: "#c0392b"
};

export default function Dashboard() {

    const [stats, setStats] = useState(null);
    const [recommendation, setRecommendation] = useState(null);
    const [risk, setRisk] = useState(null);
    const [learningPath, setLearningPath] = useState(null);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {

        try {

            const res = await api.get("/student-intelligence");

            setStats(res.data.statistics);
            setRecommendation(res.data.recommendation);
            setRisk(res.data.risk);
            setLearningPath(res.data.learningPath);

        }
        catch (err) {

            console.log(err);

            console.log(err.response);

        }

    };

    if (!stats || !recommendation || !risk) {
        return <h2>Loading Dashboard...</h2>;
    }

    const weeklyData = [
    { day: "Mon", study: 1 },
    { day: "Tue", study: 2 },
    { day: "Wed", study: 3 },
    { day: "Thu", study: 2 },
    { day: "Fri", study: 4 },
    { day: "Sat", study: 5 },
    { day: "Sun", study: 2 },
];
    return (

    <>
        <Navbar />

        <div className="dashboard">

            <h1>Student Dashboard</h1>

            <div className="stats-grid">

                <div className="card">
    <h3>
        <FaChartLine className="card-icon" />
        Completion Rate
    </h3>

    <div className="progress-wrapper">
        <CircularProgressbar
            value={stats.completion_rate}
            text={`${stats.completion_rate}%`}
            styles={buildStyles({
                pathColor: "#74A8A4",
                textColor: "#335765",
                trailColor: "#DBE2DC",
                textSize: "18px",
            })}
        />
    </div>

    <p>{stats.completion_rate}%</p>
</div>
                

                <div className="card">
                    <h3>
    <FaClipboardCheck className="card-icon" />
    Average Quiz Score
</h3>
                    <p>{stats.average_quiz_score}</p>
                </div>

                <div className="card">
                    <h3>
    <FaClock className="card-icon" />
    Total Study Time
</h3>
                    <p>{stats.total_study_time}</p>
                </div>

                <div className="card">
                    <h3>
    <FaCalendarAlt className="card-icon" />
    Weekly Sessions
</h3>
                    <p>{stats.weekly_sessions}</p>
                </div>

                <div className="card">
                    <h3>
    <FaFire className="card-icon" />
    Learning Streak
</h3>
                    <p>{stats.learning_streak}</p>
                </div>

                <div className="card risk-card">
                    <h3>
    <FaExclamationTriangle className="card-icon" />
    Risk Level
</h3>
                    <p style={{ color: RISK_COLORS[risk.risk_level], fontWeight: 700 }}>
                        {risk.risk_level} ({risk.risk_score}/100)
                    </p>
                    {risk.reasons.length > 0 && (
                        <ul className="risk-reasons">
                            {risk.reasons.map(reason => (
                                <li key={reason}>{reason}</li>
                            ))}
                        </ul>
                    )}
                </div>

            </div>

            {learningPath && (learningPath.review.length > 0 || learningPath.next.length > 0) && (
                <div className="learning-path-card">

                    <h2>What to do next</h2>

                    {learningPath.review.length > 0 && (
                        <>
                            <h4>Review these first</h4>
                            <ul>
                                {learningPath.review.map(step => (
                                    <li key={`review-${step.lesson_id}`}>
                                        {step.title} - <span className="step-reason">{step.reason}</span>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}

                    {learningPath.next.length > 0 && (
                        <>
                            <h4>Continue with</h4>
                            <ul>
                                {learningPath.next.map(step => (
                                    <li key={`next-${step.lesson_id}`}>
                                        {step.title} <span className="step-reason">({step.course})</span>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}

                </div>
            )}

            <div className="recommendation-card">

    <h2>
    <FaBullseye className="recommendation-icon"/>
    AI Recommendation
</h2>

    <h3>{recommendation.recommended_course}</h3>

    <p className="confidence">
        <strong>Confidence:</strong> {recommendation.confidence}%
    </p>

    <p className="reason">
        <strong>Reason:</strong> {recommendation.reason}
    </p>

    <div className="recommendation-grid">

        <div>

            <h4>Weak Topics</h4>

<div className="topic-list">
    {recommendation.weak_topics.map(topic => (
        <div className="topic-item" key={topic.title}>
            <span>•</span>
            <span>{topic.title}</span>
            <span>{topic.accuracy}%</span>
        </div>
    ))}
</div>
<div className="chart-card">

    <h2>📈 Weekly Study Activity</h2>

    <ResponsiveContainer
        width="100%"
        height={300}
    >

        <LineChart data={weeklyData}>

            <XAxis dataKey="day" />

            <YAxis />

            <Tooltip />

            <Line
                type="monotone"
                dataKey="study"
                stroke="#74A8A4"
                strokeWidth={4}
            />

        </LineChart>

    </ResponsiveContainer>

</div>

<h4>Top Recommendations</h4>

<div className="recommendation-list">
    {recommendation.filtered_courses.map((course, index) => (
        <div className="recommendation-item" key={course.course}>
            <span>{index + 1}.</span>
            <span>{course.course}</span>
            <span>{course.confidence}%</span>
        </div>
    ))}
</div>

        </div>

    </div>

</div>

        </div>

    </>

);

}