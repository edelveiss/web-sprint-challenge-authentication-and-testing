const server = require("./server.js");
const request = require("supertest");

describe("server.js", () => {
  test("should be the testing environment", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });
  describe("GET /", () => {
    it("should return 200 OK", async () => {
      const res = await request(server).get("/");
      expect(res.status).toBe(200);
    });
    it("should be html", async () => {
      const res = await request(server).get("/");

      expect(res.type).toBe("text/html");
    });
    it("should return the right text", async () => {
      const res = await request(server).get("/");

      expect(res.text).toBe(`<h2>Welcome to the Lambda Jokes API</h2>`);
    });
  });
});
