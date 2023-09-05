import jwt from "jsonwebtoken";

// model
import { Task } from "../model/task.model";

// validation
import { ValidationError } from "../validation/ValidationError";

// lib
import { checkToken } from "~/utils/lib";

export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);

  try {
    const id_user = await checkToken(cookies.token_user);
    if (id_user instanceof jwt.TokenExpiredError || !cookies.token_user)
      throw new ValidationError(403, "your not authenticate");

    const tasks = await Task.find({ id_user });
    if (tasks.length === 0) throw new ValidationError(404, "nothing task");

    return { statusCode: 200, data: tasks };
  } catch (error) {
    if (error instanceof ValidationError)
      return { ...error.getStatusCodeAndMessage(), data: [] };

    console.log("task error", error);
  }
});
