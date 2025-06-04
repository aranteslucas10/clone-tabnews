import orchestrator from "tests/orchestrator";
import { version as uuidVersion } from "uuid";
import user from "models/user.js";
import password from "models/password.js";

beforeAll(async () => {
  await orchestrator.waitForAllService();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("PATCH /api/v1/users/[username]", () => {
  describe("Anonymous user", () => {
    test("With nonexistent 'username'", async () => {
      var response = await fetch(
        "http://localhost:3000/api/v1/users/UsuarioInexistente",
        {
          method: "PATCH",
        },
      );
      expect(response.status).toBe(404);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        name: "NotFoundError",
        message: "O username informado não foi encontrado no sistema.",
        action: "Verifique se o username está digitado corretamente.",
        status_code: 404,
      });
    });

    test("With duplicated 'username'", async () => {
      const user1CreateResponse = await fetch(
        "http://localhost:3000/api/v1/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: "user1",
            email: "user1@example.com",
            password: "password",
          }),
        },
      );
      expect(user1CreateResponse.status).toBe(201);

      const user2CreateResponse = await fetch(
        "http://localhost:3000/api/v1/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: "user2",
            email: "user2@example.com",
            password: "password",
          }),
        },
      );
      expect(user2CreateResponse.status).toBe(201);

      const user2UpdateResponse = await fetch(
        "http://localhost:3000/api/v1/users/user2",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: "user1",
          }),
        },
      );

      expect(user2UpdateResponse.status).toBe(400);

      const user2UpdateResponseBody = await user2UpdateResponse.json();

      expect(user2UpdateResponseBody).toEqual({
        name: "ValidationError",
        message: "O usuário informado já está sendo utilizado.",
        action: "Utilize outro usuário para realizar esta operação.",
        status_code: 400,
      });
    });

    test("With duplicated 'email'", async () => {
      const user1CreateResponse = await fetch(
        "http://localhost:3000/api/v1/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: "email1",
            email: "email1@example.com",
            password: "password",
          }),
        },
      );
      expect(user1CreateResponse.status).toBe(201);

      const user2CreateResponse = await fetch(
        "http://localhost:3000/api/v1/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: "email2",
            email: "email2@example.com",
            password: "password",
          }),
        },
      );
      expect(user2CreateResponse.status).toBe(201);

      const user2UpdateResponse = await fetch(
        "http://localhost:3000/api/v1/users/user2",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: "email1@example.com",
          }),
        },
      );

      expect(user2UpdateResponse.status).toBe(400);

      const user2UpdateResponseBody = await user2UpdateResponse.json();

      expect(user2UpdateResponseBody).toEqual({
        name: "ValidationError",
        message: "O email informado já está sendo utilizado.",
        action: "Utilize outro email para realizar esta operação.",
        status_code: 400,
      });
    });

    test("With unique 'username'", async () => {
      const userCreateResponse = await fetch(
        "http://localhost:3000/api/v1/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: "uniqueUser1",
            email: "uniqueUser1@example.com",
            password: "password",
          }),
        },
      );
      expect(userCreateResponse.status).toBe(201);

      const userUpdateResponse = await fetch(
        "http://localhost:3000/api/v1/users/uniqueUser1",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: "uniqueUser2",
          }),
        },
      );

      expect(userUpdateResponse.status).toBe(200);

      const userUpdateResponseBody = await userUpdateResponse.json();

      expect(userUpdateResponseBody).toEqual({
        id: userUpdateResponseBody.id,
        username: "uniqueUser2",
        email: "uniqueUser1@example.com",
        password: userUpdateResponseBody.password,
        created_at: userUpdateResponseBody.created_at,
        updated_at: userUpdateResponseBody.updated_at,
      });

      expect(uuidVersion(userUpdateResponseBody.id)).toBe(4);
      expect(Date.parse(userUpdateResponseBody.created_at)).not.toBeNaN();
      expect(Date.parse(userUpdateResponseBody.updated_at)).not.toBeNaN();
      expect(
        userUpdateResponseBody.updated_at > userUpdateResponseBody.created_at,
      ).toBe(true);
    });

    test("With unique 'email'", async () => {
      const userCreateResponse = await fetch(
        "http://localhost:3000/api/v1/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: "uniqueEmail1",
            email: "uniqueEmail1@example.com",
            password: "password",
          }),
        },
      );
      expect(userCreateResponse.status).toBe(201);

      const userUpdateResponse = await fetch(
        "http://localhost:3000/api/v1/users/uniqueEmail1",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: "uniqueEmail2@example.com",
          }),
        },
      );

      expect(userUpdateResponse.status).toBe(200);

      const userUpdateResponseBody = await userUpdateResponse.json();

      expect(userUpdateResponseBody).toEqual({
        id: userUpdateResponseBody.id,
        username: "uniqueEmail1",
        email: "uniqueEmail2@example.com",
        password: userUpdateResponseBody.password,
        created_at: userUpdateResponseBody.created_at,
        updated_at: userUpdateResponseBody.updated_at,
      });

      expect(uuidVersion(userUpdateResponseBody.id)).toBe(4);
      expect(Date.parse(userUpdateResponseBody.created_at)).not.toBeNaN();
      expect(Date.parse(userUpdateResponseBody.updated_at)).not.toBeNaN();
      expect(
        userUpdateResponseBody.updated_at > userUpdateResponseBody.created_at,
      ).toBe(true);
    });

    test("With new 'password'", async () => {
      const userCreateResponse = await fetch(
        "http://localhost:3000/api/v1/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: "newPassword",
            email: "newPassword@example.com",
            password: "newPassword",
          }),
        },
      );
      expect(userCreateResponse.status).toBe(201);

      const userUpdateResponse = await fetch(
        "http://localhost:3000/api/v1/users/newPassword",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: "newPassword2",
          }),
        },
      );

      expect(userUpdateResponse.status).toBe(200);

      const userUpdateResponseBody = await userUpdateResponse.json();

      expect(userUpdateResponseBody).toEqual({
        id: userUpdateResponseBody.id,
        username: "newPassword",
        email: "newPassword@example.com",
        password: userUpdateResponseBody.password,
        created_at: userUpdateResponseBody.created_at,
        updated_at: userUpdateResponseBody.updated_at,
      });

      expect(uuidVersion(userUpdateResponseBody.id)).toBe(4);
      expect(Date.parse(userUpdateResponseBody.created_at)).not.toBeNaN();
      expect(Date.parse(userUpdateResponseBody.updated_at)).not.toBeNaN();
      expect(
        userUpdateResponseBody.updated_at > userUpdateResponseBody.created_at,
      ).toBe(true);

      const userInDatabase = await user.findOneByUsername("newPassword");
      const correctPasswordMatch = await password.compare(
        "newPassword2",
        userInDatabase.password,
      );

      const incorrectPasswordMatch = await password.compare(
        "newPassword",
        userInDatabase.password,
      );

      expect(correctPasswordMatch).toBe(true);
      expect(incorrectPasswordMatch).toBe(false);
    });
  });
});
