import jwt from "jsonwebtoken";
import Joi from "joi";
import bcrypt from "bcrypt";

// utils
import { ReqBodySignInUser } from "~/utils/types";

// model
import { User } from "../model/user.model";

// validation
import SignInValidation from "../validation/sign-in.validation";
import { ValidationError } from "../validation/ValidationError";

export default defineEventHandler(async (event) => {
  const body: ReqBodySignInUser = await readBody(event);

  try {
    const bodyValidated = await SignInValidation(body);

    const user = await User.findOne({ email: bodyValidated.email });
    if (!user) throw new ValidationError(404, "user not found");

    const checkPassword = await bcrypt.compare(
      bodyValidated.password,
      user.password
    );

    if (!checkPassword)
      throw new ValidationError(400, "email or password is invalid");

    const totalDay = 3;
    const tokenJwt = jwt.sign(
      { id_user: user._id },
      process.env.PUBLIC_TOKEN as string,
      { expiresIn: `${totalDay}d` }
    );

    setCookie(event, "token_user", tokenJwt, {
      maxAge: totalDay * 24 * 60 * 60,
    });

    return {
      statusCode: 200,
      message: "authenticated",
    };
  } catch (error) {
    if (error instanceof Joi.ValidationError)
      return { statusCode: 400, message: error.details[0].message };

    if (error instanceof ValidationError)
      return error.getStatusCodeAndMessage();

    return { statusCode: 500, message: "somehting error" };
  }
});
