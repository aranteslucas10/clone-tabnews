import { createRouter } from "next-connect";
import database from "infra/database.js";
import controller from "infra/controller.js";

const router = createRouter();

router.get(getHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
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
}
