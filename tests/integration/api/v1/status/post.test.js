import orchestrator from "tests/orchestrator";

var response;

beforeAll(async () => {
  await orchestrator.waitForAllService();

  response = await fetch("http://localhost:3000/api/v1/status", {
    method: "POST",
  });
});

describe("POST /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    describe("Retrieving current system status", () => {
      test("POST to /api/v1/status should return 405", async () => {
        expect(response.status).toBe(405);
      });

      test("POST to /api/v1/status response body should return", async () => {
        const responseBody = await response.json();

        expect(responseBody).toEqual({
          name: "MethodNotAllowedError",
          message: "Método não permitido para esse endpoint.",
          action:
            "Verifique se o método HTTP enviado é válido para esse endpoint.",
          status_code: 405,
        });
      });
    });
  });
});
