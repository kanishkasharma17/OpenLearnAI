require("dotenv").config();


const axios = require("axios");
jest.mock("axios");
beforeAll(() => {
    axios.post.mockResolvedValue({
        data: {
            top_recommendations: [
                {
                    course: "Machine Learning",
                    confidence: 0.97
                },
                {
                    course: "Data Structures",
                    confidence: 0.90
                }
            ]
        }
    });
});
const request = require("supertest");
const app = require("../src/app");
const pool = require("../src/config/db");

describe("OpenLearn Integration Test", () => {

    const teacherEmail = `teacher${Date.now()}@mail.com`;
    const studentEmail = `student${Date.now()}@mail.com`;

    let teacherToken;
    let studentToken;

    let courseId;
    let lessonId;
    let quizId;
    let questionId;

    afterAll(async () => {
        await pool.end();
    });


    test("Register teacher", async () => {

    const res = await request(app)
        .post("/api/auth/register")
        .send({
            name: "Integration Teacher",
            email: teacherEmail,
            password: "password123",
            role: "teacher"
        });

    expect(res.statusCode).toBe(201);

});

    test("Teacher login", async () => {

    const res = await request(app)
        .post("/api/auth/login")
        .send({
            email: teacherEmail,
            password: "password123"
        });

    expect(res.statusCode).toBe(200);

    teacherToken = res.body.token;

});


    test("Teacher creates course", async () => {

    const res = await request(app)
        .post("/api/courses")
        .set("Authorization", `Bearer ${teacherToken}`)
        .send({
            title: "Integration Testing Course",
            description: "Course created by integration test"
        });

    expect(res.statusCode).toBe(201);

    expect(res.body).toHaveProperty("course");

    courseId = res.body.course.id;

});

    test("Teacher creates lesson", async () => {

    const res = await request(app)
        .post("/api/lessons")
        .set("Authorization", `Bearer ${teacherToken}`)
        .send({
            course_id: courseId,
            title: "Lesson 1",
            content: "Introduction to Integration Testing"
        });

    expect(res.statusCode).toBe(201);

    lessonId = res.body.id;

});

    test("Teacher creates quiz", async () => {

    const res = await request(app)
        .post("/api/quizzes")
        .set("Authorization", `Bearer ${teacherToken}`)
        .send({
            course_id: courseId,
            title: "Integration Quiz"
        });

    expect(res.statusCode).toBe(201);

    quizId = res.body.id;

});


    test("Teacher adds question", async () => {

    const res = await request(app)
        .post("/api/questions")
        .set("Authorization", `Bearer ${teacherToken}`)
        .send({
            quiz_id: quizId,
            question_text: "What is 2 + 2?",
            option_a: "3",
            option_b: "4",
            option_c: "5",
            option_d: "6",
            correct_option: "B"
        });

    expect(res.statusCode).toBe(201);

    questionId = res.body.id;

});
        test("Register student", async () => {

    const res = await request(app)
        .post("/api/auth/register")
        .send({
            name: "Integration Student",
            email: studentEmail,
            password: "password123",
            role: "student"
        });

    expect(res.statusCode).toBe(201);

});


    test("Student login", async () => {

    const res = await request(app)
        .post("/api/auth/login")
        .send({
            email: studentEmail,
            password: "password123"
        });

    expect(res.statusCode).toBe(200);

    studentToken = res.body.token;

});

    test("Student enrolls in course", async () => {

    const res = await request(app)
        .post("/api/enrollments")
        .set("Authorization", `Bearer ${studentToken}`)
        .send({
            course_id: courseId
        });

    expect(res.statusCode).toBe(201);

});


    test("Student submits quiz", async () => {

    const res = await request(app)
        .post(`/api/quizzes/${quizId}/submit`)
        .set("Authorization", `Bearer ${studentToken}`)
        .send({
            answers: [
                {
                    questionId: questionId,
                    selected: "B"
                }
            ]
        });

    expect(res.statusCode).toBe(200);

    expect(res.body).toHaveProperty("percentage");

});

    test("Student intelligence generated", async () => {

    const res = await request(app)
        .get("/api/student-intelligence")
        .set("Authorization", `Bearer ${studentToken}`);

    expect(res.statusCode).toBe(200);

    expect(res.body).toHaveProperty("statistics");

    expect(res.body).toHaveProperty("recommendation");

});
});