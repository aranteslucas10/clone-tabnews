import database from "infra/database.js";
import { InternalServerError } from "infra/errors";

async function status(request, response) {
  try {
    const updatedAt = new Date().toISOString();
    response.status(200).json({
      updated_at: updatedAt,
      dependencies: {
        database: {
          version: await database.getDatabaseVersion(),
          max_connections: await database.getMaxConnections(),
          opened_connections: await database.getUsedConnections(),
        },
      },
    });
  } catch (error) {
    const publicErrorObject = new InternalServerError({
      cause: error,
    });

    console.log("\n Erro dentro do catch do controller:");
    console.error(publicErrorObject);

    response.status(500).json(publicErrorObject);
  }
}

export default status;
