import database from "infra/database";
import orchestrator from "tests/orchestrator";

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

beforeAll(async () => {
  await orchestrator.waitForAllService();
  cleanDatabase();
});

test("POST to /api/v1/migrations should return 200", async () => {
  var response = await fetch("http://localhost:3000/api/v1/migrations", {method: 'POST'});
  expect(response.status).toBe(201);
  const responseBody = await response.json();
  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);

  const data = await database.query("SELECT COUNT(*) FROM pgmigrations;");
  expect(parseInt(data.rows[0].count)).toBe(responseBody.length);

  var response1 = await fetch("http://localhost:3000/api/v1/migrations", {method: 'POST'});
  expect(response1.status).toBe(200);
  const responseBody1 = await response1.json();
  expect(Array.isArray(responseBody1)).toBe(true);
  expect(responseBody1.length).toBe(0);
});
