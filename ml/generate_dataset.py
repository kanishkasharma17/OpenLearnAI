import random
import pandas as pd

random.seed(42)

domain_recommendations = {

    "Programming": {
        "Beginner": [
            "Programming Basics",
            "Introduction to C++"
        ],
        "Intermediate": [
            "Object-Oriented Programming",
            "Data Structures"
        ],
        "Advanced": [
            "Competitive Programming",
            "System Design"
        ]
    },

    "DSA": {
        "Beginner": [
            "Programming Basics",
            "Data Structures"
        ],
        "Intermediate": [
            "Algorithms",
            "Advanced Data Structures"
        ],
        "Advanced": [
            "Advanced Algorithms",
            "Competitive Programming"
        ]
    },

    "Database": {
        "Beginner": [
            "Database Fundamentals",
            "SQL Basics"
        ],
        "Intermediate": [
            "Database Systems",
            "NoSQL Databases"
        ],
        "Advanced": [
            "Database Optimization",
            "Distributed Databases"
        ]
    },

    "Web Development": {
        "Beginner": [
            "HTML CSS JavaScript",
            "Frontend Basics"
        ],
        "Intermediate": [
            "React Development",
            "Node.js Backend"
        ],
        "Advanced": [
            "Full Stack Development",
            "Cloud Deployment"
        ]
    },

    "Machine Learning": {
        "Beginner": [
            "Python for ML",
            "Machine Learning Basics"
        ],
        "Intermediate": [
            "Machine Learning",
            "Feature Engineering"
        ],
        "Advanced": [
            "Deep Learning",
            "MLOps"
        ]
    },

    "Computer Networks": {
        "Beginner": [
            "Networking Basics",
            "Internet Fundamentals"
        ],
        "Intermediate": [
            "Computer Networks",
            "Network Security"
        ],
        "Advanced": [
            "Cloud Networking",
            "Distributed Systems"
        ]
    },

    "Operating Systems": {
        "Beginner": [
            "Operating System Basics",
            "Linux Fundamentals"
        ],
        "Intermediate": [
            "Operating Systems",
            "Process Management"
        ],
        "Advanced": [
            "Kernel Programming",
            "System Programming"
        ]
    }

}


def assign_recommendation(domain, difficulty):
    return random.choice(domain_recommendations[domain][difficulty])

domains = [
    "Programming",
    "DSA",
    "Database",
    "Web Development",
    "Machine Learning",
    "Computer Networks",
    "Operating Systems"
]

profiles = [
    "High Achiever",
    "Consistent Learner",
    "Casual Learner",
    "Struggling Student",
    "Inactive Student"
]

rows = []

for student_id in range(1, 10001):

    profile = random.choices(
        profiles,
        weights=[15, 25, 30, 20, 10],
        k=1
    )[0]

    preferred_domain = random.choice(domains)

    if profile == "High Achiever":

        courses_enrolled = random.randint(4,5)
        lessons_completed = random.randint(55,80)
        completion_rate = random.randint(90,100)
        quiz_attempts = random.randint(12,20)
        average_quiz_score = random.randint(88,100)
        total_study_time = random.randint(700,1200)
        weekly_sessions = random.randint(6,7)
        learning_streak = random.randint(40,120)
        preferred_difficulty = "Advanced"
        risk_level = "Low"

    elif profile == "Consistent Learner":

        courses_enrolled = random.randint(3,4)
        lessons_completed = random.randint(35,55)
        completion_rate = random.randint(75,90)
        quiz_attempts = random.randint(8,14)
        average_quiz_score = random.randint(75,90)
        total_study_time = random.randint(400,700)
        weekly_sessions = random.randint(4,6)
        learning_streak = random.randint(20,60)
        preferred_difficulty = "Intermediate"
        risk_level = "Low"

    elif profile == "Casual Learner":

        courses_enrolled = random.randint(2,3)
        lessons_completed = random.randint(15,35)
        completion_rate = random.randint(50,75)
        quiz_attempts = random.randint(4,8)
        average_quiz_score = random.randint(60,75)
        total_study_time = random.randint(180,400)
        weekly_sessions = random.randint(2,4)
        learning_streak = random.randint(5,25)
        preferred_difficulty = "Intermediate"
        risk_level = "Medium"

    elif profile == "Struggling Student":

        courses_enrolled = random.randint(1,2)
        lessons_completed = random.randint(5,18)
        completion_rate = random.randint(20,50)
        quiz_attempts = random.randint(2,6)
        average_quiz_score = random.randint(40,60)
        total_study_time = random.randint(60,180)
        weekly_sessions = random.randint(1,2)
        learning_streak = random.randint(1,8)
        preferred_difficulty = "Beginner"
        risk_level = "High"

    else:

        courses_enrolled = 1
        lessons_completed = random.randint(0,5)
        completion_rate = random.randint(0,20)
        quiz_attempts = random.randint(0,2)
        average_quiz_score = random.randint(0,40)
        total_study_time = random.randint(0,60)
        weekly_sessions = random.randint(0,1)
        learning_streak = random.randint(0,2)
        preferred_difficulty = "Beginner"
        risk_level = "High"

    recommended_course = assign_recommendation(
        preferred_domain,
        preferred_difficulty
    )

    if average_quiz_score >= 90:

        recommendation = random.choice([
            "Machine Learning",
            "Deep Learning",
            "Advanced Algorithms"
        ])

    elif average_quiz_score >= 80:

        recommendation = random.choice([
            "Algorithms",
            "Machine Learning",
            "Operating Systems"
        ])

    elif average_quiz_score >= 70:

        recommendation = random.choice([
            "Data Structures",
            "Database Systems",
            "Computer Networks"
        ])

    elif average_quiz_score >= 60:

        recommendation = random.choice([
            "Object-Oriented Programming",
            "Database Systems",
            "Web Development"
        ])

    else:

        recommendation = random.choice([
            "Programming Basics",
            "Introduction to C++",
            "Programming Fundamentals"
        ])

    rows.append([
        student_id,
        profile,
        preferred_domain,
        courses_enrolled,
        lessons_completed,
        completion_rate,
        quiz_attempts,
        average_quiz_score,
        total_study_time,
        weekly_sessions,
        learning_streak,
        preferred_difficulty,
        recommended_course,
        risk_level
    ])

df = pd.DataFrame(
    rows,
    columns=[
        "student_id",
        "profile",
        "preferred_domain",
        "courses_enrolled",
        "lessons_completed",
        "completion_rate",
        "quiz_attempts",
        "average_quiz_score",
        "total_study_time",
        "weekly_sessions",
        "learning_streak",
        "preferred_difficulty",
        "recommended_course",
        "risk_level"
    ]
)

df.to_csv("data/synthetic_students.csv", index=False)

print(df.head())

print("\nTotal Students:", len(df))

print("\nProfile Distribution")
print(df["profile"].value_counts())

print("\nRecommendation Distribution")
print(df["recommended_course"].value_counts())

print("\nRisk Distribution")
print(df["risk_level"].value_counts())