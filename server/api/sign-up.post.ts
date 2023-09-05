import Joi from "joi";
import bcrypt from "bcrypt";

// utils
import { ReqBodySignUpUser } from "~/utils/types";

// validation
import { User } from "../model/user.model";

// validation
import SignUpValidation from "../validation/sign-up.validation";
import { ValidationError } from "../validation/ValidationError";

export default defineEventHandler(async (event) => {
  const body: ReqBodySignUpUser = await readBody(event);
  console.log(body);

  try {
    const bodyValidated = await SignUpValidation(body);

    if (bodyValidated.confirmPassword !== bodyValidated.password)
      throw new ValidationError(400, "password is invalid");

    const userAlreadyExist = await User.findOne({ email: bodyValidated.email });
    if (userAlreadyExist) throw new ValidationError(400, "user already exist");

    const hashPassword = await bcrypt.hash(bodyValidated.password, 10);

    await User.create({
      username: bodyValidated.username,
      email: bodyValidated.email,
      password: hashPassword,
    });

    return {
      statusCode: 201,
      message: "user registered",
    };
  } catch (error) {
    if (error instanceof Joi.ValidationError)
      return { statusCode: 400, message: error.details[0].message };

    if (error instanceof ValidationError)
      return error.getStatusCodeAndMessage();

    return { statusCode: 500, message: "something error" };
  }
});
