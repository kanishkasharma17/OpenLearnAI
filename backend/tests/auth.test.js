const request = require("supertest");
const app = require("../src/app");

describe("Authentication API", () => {

    test("GET invalid route should return 404", async () => {

        const res = await request(app)
            .get("/invalid-route");

        expect(res.statusCode).toBe(404);

    });

});