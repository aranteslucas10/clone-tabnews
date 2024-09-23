import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllService();
  await orchestrator.clearDatabase();
});

describe("POST /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    describe("Running pending migrations", () => {
      test("For the first time", async () => {
        var response = await fetch("http://localhost:3000/api/v1/migrations", {
          method: "POST",
        });
        expect(response.status).toBe(201);
        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBe(true);
        expect(responseBody.length).toBeGreaterThan(0);
        const data = await orchestrator.getNumberOfMigrationOnDatabase();
        expect(parseInt(data.rows[0].count)).toBe(responseBody.length);
      });
      test("For the second time", async () => {
        var response = await fetch("http://localhost:3000/api/v1/migrations", {
          method: "POST",
        });
        expect(response.status).toBe(200);
        const responseBody1 = await response.json();
        expect(Array.isArray(responseBody1)).toBe(true);
        expect(responseBody1.length).toBe(0);
      });
    });
  });
});
