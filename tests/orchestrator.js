import database from "infra/database";
import retry from "async-retry";
import migrator from "models/migrator"

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

const orchestrator = {
  waitForAllService,
  clearDatabase,
  getNumberOfMigrationOnDatabase,
  runPendingMigrations
};

export default orchestrator;
