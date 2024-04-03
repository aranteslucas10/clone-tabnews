import database from "infra/database";

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

beforeAll(async () => {
  await cleanDatabase();
});

test("GET to /api/v1/migrations should return 200", async () => {
  var response = await fetch("http://localhost:3000/api/v1/migrations");
  expect(response.status).toBe(200);
  const responseBody = await response.json();
  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);
});
