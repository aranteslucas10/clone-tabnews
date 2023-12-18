var response;

beforeAll(async () => {
  response = await fetch("http://localhost:3000/api/v1/status");
});

test("GET to /api/v1/status should return 200", async () => {
  expect(response.status).toBe(200);
});

describe("Verify Status Response Content", () => {
  var responseBody;

  beforeAll(async () => {
    responseBody = await response.json();
  });

  test("Verify UpdateAt Key/Value", () => {
    expect(responseBody.updated_at).toBeDefined();
    const updateAt = new Date(responseBody.updated_at).toISOString();
    expect(responseBody.updated_at).toBe(updateAt);
  });

  test("Verify Database Key/Value", () => {
    expect(responseBody.dependencies.database.version).toBeDefined();
    expect(responseBody.dependencies.database.version).toBe("16.0");
  });

  test("Verify MaxConnections Key/Value", () => {
    expect(responseBody.dependencies.database.max_connections).toBeDefined();
    expect(typeof responseBody.dependencies.database.max_connections).toBe(
      "number",
    );
    expect(responseBody.dependencies.database.max_connections >= 0).toBe(true);
  });

  test("Verify OpenedConnections Key/Value", () => {
    expect(responseBody.dependencies.database.opened_connections).toBeDefined();
    expect(typeof responseBody.dependencies.database.opened_connections).toBe(
      "number",
    );
    expect(responseBody.dependencies.database.opened_connections).toBe(1);
  });
});
