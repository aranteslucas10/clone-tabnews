import retry from "async-retry";
import { faker } from "@faker-js/faker";

import database from "infra/database.js";
import migrator from "models/migrator.js";
import user from "models/user.js";

async function waitForAllService() {
  await waitForWebServer();

  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 100,
      maxTimeout: 1000,
    });

    async function fetchStatusPage() {
      const response = await fetch("http://localhost:3000/api/v1/status");
      if (response.status !== 200) {
        throw Error();
      }
    }
  }
}

async function clearDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

async function runPendingMigrations() {
  await migrator.runPendingMigrations();
}

async function getNumberOfMigrationOnDatabase() {
  return await database.query("SELECT COUNT(*) FROM pgmigrations;");
}

async function createUser(userObject) {
  const defaultUser = {
    username: faker.internet
      .username()
      .replace("_", "")
      .replace(".", "")
      .replace("-", ""),
    password: "defaultPassword",
    email: faker.internet.email(),
  };
  const finalUser = { ...defaultUser, ...userObject };
  return await user.create(finalUser);
}

const orchestrator = {
  waitForAllService,
  clearDatabase,
  getNumberOfMigrationOnDatabase,
  runPendingMigrations,
  createUser,
};

export default orchestrator;
