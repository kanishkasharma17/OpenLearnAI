require("dotenv").config();

const request = require("supertest");

const app = require("../src/app");

describe("Authentication API", () => {

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

    test("Login with invalid credentials should fail", async () => {

        const res = await request(app)
            .post("/api/auth/login")
            .send({
                email: "fake@example.com",
                password: "wrongpassword"
            });

        expect(res.statusCode).toBe(401);

    });

});

const pool = require("../src/config/db");

afterAll(async () => {
    await pool.end();
});