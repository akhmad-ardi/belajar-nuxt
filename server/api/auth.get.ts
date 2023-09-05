import jwt from "jsonwebtoken";

// validation
import { ValidationError } from "../validation/ValidationError";

export default defineEventHandler((event) => {
  const { token_user } = parseCookies(event);

  try {
    if (!token_user) throw new ValidationError(403, "you are not authenticate");

    jwt.verify(token_user, process.env.PUBLIC_TOKEN as string);

    return { statusCode: 200, auth: true };
  } catch (error) {
    if (error instanceof ValidationError)
      return { ...error.getStatusCodeAndMessage(), auth: false };

    if (error instanceof jwt.JsonWebTokenError)
      return { statusCode: 403, message: error.message, auth: false };
  }
});
