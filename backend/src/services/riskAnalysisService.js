const {
    calculateStatistics
} = require("./statisticsService");

/**
 * Each factor maps a raw statistic to a 0-100 "risk contribution"
 * (100 = worst / highest risk) plus a human-readable explanation
 * when it is the one dragging the score up. This is intentionally
 * a transparent, rule-based scorer rather than a black-box model —
 * every number in the final output can be traced back to a reason,
 * which matters for an academic risk tool a teacher has to trust.
 */
const FACTORS = [
    {
        key: "completion_rate",
        weight: 0.30,
        label: "course completion",
        // 0% completion => 100 risk, 100% completion => 0 risk
        score: (value) => clamp(100 - value),
        reason: (value) =>
            `Low course completion (${round(value)}% of lessons finished)`
    },
    {
        key: "average_quiz_score",
        weight: 0.30,
        label: "quiz performance",
        score: (value) => clamp(100 - value),
        reason: (value) =>
            `Low average quiz score (${round(value)}%)`
    },
    {
        key: "weekly_sessions",
        weight: 0.15,
        label: "recent activity",
        // 0 sessions/week => 100 risk, 5+ sessions/week => 0 risk
        score: (value) => clamp(100 - (value / 5) * 100),
        reason: (value) =>
            value === 0
                ? "No study sessions logged this week"
                : `Only ${round(value)} study session(s) this week`
    },
    {
        key: "learning_streak",
        weight: 0.15,
        label: "consistency",
        // 0 day streak => 100 risk, 14+ day streak => 0 risk
        score: (value) => clamp(100 - (value / 14) * 100),
        reason: (value) =>
            value === 0
                ? "No active learning streak"
                : `Short learning streak (${round(value)} day(s))`
    },
    {
        key: "quiz_attempts",
        weight: 0.10,
        label: "engagement",
        // 0 attempts => 100 risk, 10+ attempts => 0 risk
        score: (value) => clamp(100 - (value / 10) * 100),
        reason: (value) =>
            value === 0
                ? "Hasn't attempted any quizzes yet"
                : `Few quiz attempts so far (${round(value)})`
    }
];

function clamp(value) {
    return Math.min(100, Math.max(0, value));
}

function round(value) {
    return Math.round(Number(value) * 100) / 100;
}

function bucketFor(score) {
    if (score >= 60) return "High";
    if (score >= 35) return "Medium";
    return "Low";
}

/**
 * Computes an explainable risk score/level for a student from their
 * current statistics. Accepts optional pre-fetched stats so callers
 * that already have them (e.g. a teacher iterating many students)
 * don't hit the DB twice.
 */
const analyzeRisk = async (studentId, statsOverride = null) => {

    const stats = statsOverride || await calculateStatistics(studentId);

    const contributions = FACTORS.map(factor => {
        const rawValue = Number(stats[factor.key]) || 0;
        const factorScore = factor.score(rawValue);

        return {
            factor: factor.label,
            value: rawValue,
            contribution: round(factorScore * factor.weight),
            reason: factor.reason(rawValue),
            weightedScore: factorScore * factor.weight
        };
    });

    const riskScore = round(
        contributions.reduce((sum, c) => sum + c.weightedScore, 0)
    );

    const riskLevel = bucketFor(riskScore);

    const topReasons = [...contributions]
        .sort((a, b) => b.weightedScore - a.weightedScore)
        .slice(0, 2)
        .map(c => c.reason);

    return {
        student_id: Number(studentId),
        risk_score: riskScore,
        risk_level: riskLevel,
        reasons: topReasons,
        factors: contributions.map(({ factor, value, contribution, reason }) => ({
            factor,
            value: round(value),
            contribution,
            reason
        }))
    };
};

module.exports = {
    analyzeRisk
};
