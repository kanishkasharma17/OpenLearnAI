# OpenLearn AI

**AI-powered Learning Management System with personalized recommendations, student risk analysis, weak-topic detection, and AI-generated quizzes.**

OpenLearn AI extends a traditional Learning Management System into an intelligent learning platform by using student learning behavior and assessment performance to provide personalized insights and recommendations.

## ✨ Key Features

### 🤖 AI Quiz Generation

Teachers can generate multiple-choice questions automatically from lesson content using **Google Gemini**.

**Pipeline:**

```text
Lesson Content
      ↓
Backend
      ↓
Gemini API
      ↓
Structured MCQ Response
      ↓
Validation & Parsing
      ↓
PostgreSQL
```

The generated questions contain:

* Question text
* Four answer options
* Correct answer

---

### 📊 Student Intelligence

The system aggregates student activity into meaningful learning signals:

* Course enrollment
* Lesson completion
* Quiz attempts
* Average quiz score
* Question-level performance
* Study time
* Weekly activity
* Learning streak

These signals are used to generate personalized student insights.

---

### ⚠️ Explainable Risk Analysis

Instead of using an opaque ML model for student risk, OpenLearn AI currently uses an **explainable weighted scoring model**.

Risk is based on factors such as:

| Factor            | Weight |
| ----------------- | -----: |
| Course completion |    30% |
| Quiz performance  |    30% |
| Weekly sessions   |    15% |
| Learning streak   |    15% |
| Quiz attempts     |    10% |

Students are categorized into:

* **Low Risk**
* **Medium Risk**
* **High Risk**

The system also provides human-readable reasons behind the risk assessment.

> The rule-based approach was chosen as an interpretable baseline because reliable historical labels for outcomes such as dropout or course completion may not initially be available.

---

### 🎯 Weak Topic Detection

Question-level quiz attempts are aggregated back to their corresponding lessons.

For example:

```text
Arrays        → 91%
Linked Lists  → 82%
Trees         → 58%
Graphs        → 43%
```

Topics below the configured accuracy threshold are identified as weak topics.

These topics are then used to generate actionable learning recommendations.

---

### 🧠 ML-Based Course Recommendations

Student behavior is transformed into a feature vector containing information such as:

```text
Courses enrolled
Lessons completed
Completion rate
Quiz attempts
Average quiz score
Study time
Weekly sessions
Learning streak
Preferred domain
Preferred difficulty
Risk level
```

The backend sends these features to a **separate ML inference service**.

```text
Student Activity
       ↓
Feature Engineering
       ↓
ML Recommendation Service
       ↓
Top-K Course Recommendations
       ↓
Remove Already-Enrolled Courses
       ↓
Personalized Recommendations
```

Keeping ML inference separate from the Node.js backend allows the model service to be developed, deployed, and scaled independently.

---

### 🛤️ Personalized Learning Path

The learning-path system combines:

1. Weak-topic detection
2. Incomplete lessons
3. Student course progress

to generate actionable next steps.

Example:

```text
Recommended Learning Path

1. Review Trees
2. Complete Binary Search Tree lesson
3. Attempt the associated quiz
4. Continue with the next incomplete lesson
```

---

# 🏗️ System Architecture

```text
                         ┌──────────────────────┐
                         │    React + Vite      │
                         │      Frontend        │
                         └──────────┬───────────┘
                                    │
                               REST API
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   Node.js + Express  │
                         │       Backend        │
                         └──────┬───────┬───────┘
                                │       │
                       ┌────────▼───┐   │
                       │ PostgreSQL │   │
                       │  Database  │   │
                       └────────────┘   │
                                        │
                              ┌─────────▼─────────┐
                              │ ML Recommendation │
                              │      Service      │
                              └───────────────────┘


          Lesson Content
                 │
                 ▼
          ┌─────────────┐
          │   Gemini    │
          │  2.5 Flash  │
          └──────┬──────┘
                 │
                 ▼
          AI Generated Quiz
```

---

# 🧰 Technology Stack

## Frontend

* React
* Vite
* React Router
* Axios
* Recharts
* React Icons
* React Circular Progressbar

## Backend

* Node.js
* Express.js
* PostgreSQL
* `pg`
* JWT
* bcrypt
* Express Validator
* Swagger

## AI / ML

* Google Gemini API
* Gemini 2.5 Flash
* Separate ML recommendation service
* Python-based model artifacts

## Testing

* Jest
* Supertest
* Axios mocking for external ML inference

---

# 🔐 Authentication & Authorization

Authentication is implemented using JWT.

### Registration

```text
User
 ↓
Password
 ↓
bcrypt hashing
 ↓
PostgreSQL
```

### Login

```text
Email + Password
       ↓
bcrypt comparison
       ↓
JWT generation
       ↓
Authenticated requests
```

Protected API requests use:

```http
Authorization: Bearer <JWT>
```

Middleware verifies the token and attaches authenticated user information to the request.

Role-based authorization is used for teacher-specific operations.

---

# 🗄️ Data Model

The application stores relationships between:

```text
Users
 │
 ├── Enrollments ─── Courses
 │                      │
 │                      └── Lessons
 │                             │
 │                             └── Quizzes
 │                                    │
 │                                    └── Questions
 │
 ├── Student Progress
 │
 ├── Quiz Attempts
 │
 ├── Question Attempts
 │
 └── Learning Activity
```

This relational structure makes PostgreSQL particularly suitable for the application because analytics frequently require joins and aggregations across these entities.

---

# 📁 Project Structure

```text
OpenLearnAI/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   │   └── ai/
│   │   └── app.js
│   │
│   ├── tests/
│   └── server.js
│
├── frontend/
│   └── src/
│       ├── api/
│       ├── components/
│       ├── context/
│       ├── pages/
│       └── routes/
│
├── ml/
│   └── models/
│
├── database/
│
├── package.json
├── package-lock.json
└── README.md
```

---

# 🚀 Running the Project Locally

## Prerequisites

Install:

* Node.js
* npm
* PostgreSQL
* Python 3.x
* Git

---

## 1. Clone the repository

```bash
git clone https://github.com/kanishkasharma17/OpenLearnAI.git
cd OpenLearnAI
```

---

## 2. Backend setup

```bash
cd backend
npm install
```

Create:

```text
backend/.env
```

using:

```text
backend/.env.example
```

Configure the required environment variables:

```env
PORT=3000
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
DATABASE_URL=your_postgresql_connection_string
ML_SERVICE_URL=http://localhost:5000
```

Start the backend:

```bash
npm run dev
```

---

## 3. Frontend setup

Open another terminal:

```bash
cd frontend
npm install
```

Create:

```text
frontend/.env
```

based on:

```text
frontend/.env.example
```

Example:

```env
VITE_API_URL=http://localhost:3000/api
```

Start the frontend:

```bash
npm run dev
```

---

## 4. ML Service

The recommendation component uses a separate ML inference service.

The backend communicates with the configured:

```text
ML_SERVICE_URL
```

The trained recommendation model is intentionally **not stored in this repository** because the model artifact is approximately 187 MB and exceeds GitHub's standard 100 MB file limit.

For deployment, the model artifact should be provided separately or stored using an appropriate model/artifact storage solution.

---

# 🧪 Testing

Backend tests use **Jest** and **Supertest**.

The test suite covers areas including:

* User registration
* Login
* Invalid authentication
* Protected routes
* Student authorization
* Teacher authorization
* Course creation
* Course enrollment
* Quiz submission
* Student intelligence
* ML service integration

External ML inference can be mocked during testing so that tests remain deterministic and do not depend on an external service.

Run tests with:

```bash
cd backend
npm test
```

---

# 🔄 Intelligence Pipeline

The overall student intelligence pipeline is:

```text
                    Student Activity
                           │
          ┌────────────────┼────────────────┐
          │                │                │
          ▼                ▼                ▼
      Progress        Quiz Attempts     Activity
          │                │                │
          └────────────────┼────────────────┘
                           ▼
                   Feature Engineering
                           │
            ┌──────────────┼──────────────┐
            ▼              ▼              ▼
       Risk Analysis   Weak Topics   Recommendations
            │              │              │
            └──────────────┼──────────────┘
                           ▼
                  Personalized Learning
```

---

# 🔬 Engineering Decisions

### Why PostgreSQL?

The LMS domain is highly relational. Students, courses, lessons, quizzes, attempts and progress have well-defined relationships, making relational queries and aggregations important.

### Why Gemini?

Quiz generation is a generative task where lesson content needs to be transformed into contextual questions. Gemini provides an efficient way to perform this task while keeping the API integration behind the backend.

### Why a separate ML service?

Recommendation inference is separated from the transactional Node.js backend so that the ML component can be developed, deployed and scaled independently.

### Why rule-based risk scoring?

The current system prioritizes interpretability and works without requiring a large historical dataset of labeled student outcomes. The rule-based approach also provides transparent reasons that teachers can understand.

---

# 📈 Future Improvements

## Recommendation System

* Add recommendation feedback collection
* Measure Precision@K, Recall@K and NDCG@K
* Introduce learning-to-rank approaches
* Handle cold-start users with content-based recommendations
* Add recommendation explanations

## LLM Reliability

* Add JSON schema validation
* Validate generated questions against lesson content
* Detect duplicate questions
* Detect ambiguous answer choices
* Add retry/fallback strategies
* Add LLM evaluation metrics

## Scalability

* Eliminate N+1 analytics queries
* Cache frequently requested student statistics
* Precompute aggregate learning metrics
* Introduce asynchronous event processing
* Add ML inference timeouts and fallbacks

## Risk Prediction

Once sufficient historical outcome data becomes available, compare the current explainable baseline against:

* Logistic Regression
* Random Forest
* Gradient Boosting
* Calibrated classification models

using historical outcomes such as course completion or dropout.

---

# 🔒 Security

Secrets are intentionally excluded from the repository.

Never commit:

```text
.env
API keys
Database credentials
JWT secrets
Private model credentials
```

Use the provided `.env.example` files as templates.

---

# 🎯 Project Objective

OpenLearn AI aims to move an LMS from simply **tracking what students do** to **understanding how they learn and helping them decide what to do next**.

The system combines:

```text
Traditional LMS
      +
Generative AI
      +
Machine Learning
      +
Explainable Analytics
      =
Personalized Learning Platform
```

---

## Author

**Kanishka Sharma**

