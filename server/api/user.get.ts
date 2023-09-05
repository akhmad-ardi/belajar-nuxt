import jwt from "jsonwebtoken";

// modal
import { User } from "~/server/model/user.model";

// validation
import { ValidationError } from "~/server/validation/ValidationError";

// lib
import { checkToken } from "~/utils/lib";

export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);

  try {
    const id_user = await checkToken(cookies.token_user);
    if (id_user instanceof jwt.TokenExpiredError || !cookies.token_user)
      throw new ValidationError(403, "you are not authenticate");

    const user = await User.findById(id_user);
    if (!user) throw new ValidationError(400, "user not found");

    return { statusCode: 200, data: user };
  } catch (error) {
    if (error instanceof ValidationError)
      return { ...error.getStatusCodeAndMessage(), data: null };

    console.log("user error", error);
    return { statusCode: 500, message: "something error", data: null };
  }
});
