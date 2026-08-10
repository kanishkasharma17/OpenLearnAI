import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import "./Quiz.css";

const OPTION_KEYS = ["a", "b", "c", "d"];

export default function Quiz() {

    const { quizId } = useParams();

    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchQuestions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quizId]);

    const fetchQuestions = async () => {
        try {
            const res = await api.get(`/questions/quiz/${quizId}`);
            setQuestions(res.data);
        } catch (err) {
            setError(err.response?.data?.message || "Could not load this quiz");
        }
    };

    const selectAnswer = (questionId, option) => {
        setAnswers(prev => ({ ...prev, [questionId]: option }));
    };

    const handleSubmit = async () => {

        setError("");
        setSubmitting(true);

        const payload = {
            answers: Object.entries(answers).map(([questionId, selected]) => ({
                questionId: Number(questionId),
                selected
            }))
        };

        try {
            const res = await api.post(`/quizzes/${quizId}/submit`, payload);
            setResult(res.data);
        } catch (err) {
            setError(err.response?.data?.message || "Could not submit quiz");
        } finally {
            setSubmitting(false);
        }

    };

    if (error && questions.length === 0) {
        return (
            <>
                <Navbar />
                <div className="quiz-page"><p style={{ color: "#c0392b" }}>{error}</p></div>
            </>
        );
    }

    if (result) {
        return (
            <>
                <Navbar />
                <div className="quiz-page">
                    <h1>Quiz Result</h1>
                    <p className="quiz-score">{result.percentage}%</p>
                    <p>{result.correctAnswers} / {result.totalQuestions} correct</p>
                    <Link to="/courses" className="back-link">&larr; Back to courses</Link>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="quiz-page">

                <h1>Quiz</h1>

                {error && <p style={{ color: "#c0392b" }}>{error}</p>}

                {questions.map((q, index) => (
                    <div className="quiz-question" key={q.id}>

                        <p className="question-text">{index + 1}. {q.question_text}</p>

                        <div className="quiz-options">
                            {OPTION_KEYS.map(key => (
                                <label key={key} className="quiz-option">
                                    <input
                                        type="radio"
                                        name={`question-${q.id}`}
                                        value={key}
                                        checked={answers[q.id] === key}
                                        onChange={() => selectAnswer(q.id, key)}
                                    />
                                    {q[`option_${key}`]}
                                </label>
                            ))}
                        </div>

                    </div>
                ))}

                {questions.length > 0 && (
                    <button
                        className="submit-btn"
                        onClick={handleSubmit}
                        disabled={submitting || Object.keys(answers).length !== questions.length}
                    >
                        {submitting ? "Submitting..." : "Submit Quiz"}
                    </button>
                )}

            </div>
        </>
    );
}
