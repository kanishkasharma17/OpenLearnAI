require("dotenv").config();

const request = require("supertest");
const app = require("../src/app");
const pool = require("../src/config/db");

describe("Authentication & Authorization API", () => {

    const studentEmail = `student${Date.now()}@mail.com`;
    const teacherEmail = `teacher${Date.now()}@mail.com`;

    let studentToken;
    let teacherToken;

    afterAll(async () => {
        await pool.end();
    });

    test("Register a new student successfully", async () => {

        const res = await request(app)
            .post("/api/auth/register")
            .send({
                name: "Jest Student",
                email: studentEmail,
                password: "password123",
                role: "student"
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("message");

    });

    test("Register a new teacher successfully", async () => {

        const res = await request(app)
            .post("/api/auth/register")
            .send({
                name: "Jest Teacher",
                email: teacherEmail,
                password: "password123",
                role: "teacher"
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("message");

    });

    test("Register without email should fail", async () => {

        const res = await request(app)
            .post("/api/auth/register")
            .send({
                name: "Test User",
                password: "password123",
                role: "student"
            });

        expect(res.statusCode).toBe(400);

    });

    test("Student login successfully", async () => {

        const res = await request(app)
            .post("/api/auth/login")
            .send({
                email: studentEmail,
                password: "password123"
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("token");

        studentToken = res.body.token;

    });

    test("Teacher login successfully", async () => {

        const res = await request(app)
            .post("/api/auth/login")
            .send({
                email: teacherEmail,
                password: "password123"
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("token");

        teacherToken = res.body.token;

    });

    test("Login with invalid credentials should fail", async () => {

        const res = await request(app)
            .post("/api/auth/login")
            .send({
                email: "fake@example.com",
                password: "wrongpassword"
            });

        expect(res.statusCode).toBe(401);

    });

    test("Access protected route without token", async () => {

        const res = await request(app)
            .get("/api/courses");

        expect(res.statusCode).toBe(401);

    });

    test("Access protected route with valid student token", async () => {

        const res = await request(app)
            .get("/api/courses")
            .set("Authorization", `Bearer ${studentToken}`);

        expect(res.statusCode).toBe(200);

    });

    test("Student cannot create a course", async () => {

        const res = await request(app)
            .post("/api/courses")
            .set("Authorization", `Bearer ${studentToken}`)
            .send({
                title: "Student Test Course"
            });

        expect(res.statusCode).toBe(403);

    });

    test("Teacher can create a course", async () => {

        const res = await request(app)
            .post("/api/courses")
            .set("Authorization", `Bearer ${teacherToken}`)
            .send({
                title: `Jest Course ${Date.now()}`
            });

        expect(res.statusCode).toBe(201);

    });

    test("Get all courses", async () => {

        const res = await request(app)
            .get("/api/courses")
            .set("Authorization", `Bearer ${studentToken}`);

        expect(res.statusCode).toBe(200);

    });

});