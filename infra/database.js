import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    database: process.env.POSTGRES_DATABASE,
  });
  await client.connect();
  const result = await client.query(queryObject);
  await client.end();
  return result;
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
  const databaseUsedConnectionsQueryResult = await query(
    "SELECT COUNT(*)::int AS opened_connections FROM pg_stat_activity WHERE datname = 'local_database';",
  );
  return databaseUsedConnectionsQueryResult.rows[0].opened_connections;
}

export default {
  query: query,
  getDatabaseVersion: getDatabaseVersion,
  getMaxConnections: getMaxConnections,
  getUsedConnections: getUsedConnections,
};
