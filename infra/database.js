import { Client } from "pg";
import { options } from "pg/lib/defaults";

async function query(queryObject) {
  const options = {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    database: process.env.POSTGRES_DATABASE,
    ssl: getSSLValues(),
  }
  const client = new Client(options);
  try {
    await client.connect();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await client.end();
  }
}

async function getDatabaseVersion() {
  const databaseVersionQueryResult = await query("SHOW server_version;");
  const databaseVersion = databaseVersionQueryResult.rows[0].server_version;
  return databaseVersion;
}

async function getMaxConnections() {
  const databaseMaxConnectionsQueryResult = await query(
    "SHOW max_connections;",
  );
  const databaseMaxConnections = Number(
    databaseMaxConnectionsQueryResult.rows[0].max_connections,
  );
  return databaseMaxConnections;
}

async function getUsedConnections() {
  const databaseName = process.env.POSTGRES_DATABASE;
  const databaseUsedConnectionsQueryResult = await query({
    text: "SELECT COUNT(*)::int AS opened_connections FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  return databaseUsedConnectionsQueryResult.rows[0].opened_connections;
}

export default {
  query: query,
  getDatabaseVersion: getDatabaseVersion,
  getMaxConnections: getMaxConnections,
  getUsedConnections: getUsedConnections,
};

function getSSLValues() {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    }
  }

  return process.env.NODE_ENV === "development" ? false : true;
}