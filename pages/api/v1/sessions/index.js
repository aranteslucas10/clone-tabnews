import { createRouter } from "next-connect";
import controller from "infra/controller";
import authentication from "models/authentication";
import session from "models/session";
import * as cookie from "cookie";

const router = createRouter();

router.post(postHandler);

export default router.handler(controller.errorHandlers);

async function postHandler(request, response) {
  const userInputValues = request.body;

  const authenticatedUser = await authentication.getAuthenticatedUser(
    userInputValues.email,
    userInputValues.password,
  );

  const newSession = await session.create(authenticatedUser.id);

  const setCookie = cookie.serialize("session_id", newSession.token, {
    path: "/",
    // expires: new Date(newSession.expires_at),  // data exata em que o client vai deletar o cookie
    maxAge: session.EXPIRATION_IN_MILLISECONDS / 1000, // expira n segundos a partir do horario do client
    secure: process.env.NODE_ENV === "production", // cookie so pode ser trafegado em https
    httpOnly: true, // pede para que o client não deixe o cookie disponível no document.cookie
  });

  response.setHeader("Set-Cookie", setCookie);

  return response.status(201).json(newSession);
}
