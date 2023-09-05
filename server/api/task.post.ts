import jwt from "jsonwebtoken";

// model
import { Task } from "../model/task.model";

// type
import { ReqBodyTask } from "~/utils/types";

// validation
import { ValidationError } from "../validation/ValidationError";

// lib
import { checkToken } from "~/utils/lib";

export default defineEventHandler(async (event) => {
  const body: ReqBodyTask = await readBody(event);
  const cookies = parseCookies(event);

  try {
    const id_user = await checkToken(cookies.token_user);
    if (id_user instanceof jwt.TokenExpiredError || !cookies.token_user)
      throw new ValidationError(400, "you are not authenticate");

    if (!body.task) throw new ValidationError(400, "task is required");

    if (typeof body.task !== "string")
      throw new ValidationError(400, "task should be string");

    await Task.create({ id_user: id_user, task: body.task });

    return {
      statusCode: 201,
      message: "task added",
    };
  } catch (error) {
    if (error instanceof ValidationError)
      return error.getStatusCodeAndMessage();

    return { statusCode: 500, message: "something error" };
  }
});
