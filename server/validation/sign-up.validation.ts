import Joi from "joi";
import { ReqBodySignUpUser } from "~/utils/types";

export default async function SignUpValidation(payload: ReqBodySignUpUser) {
  const schema = Joi.object<ReqBodySignUpUser>({
    username: Joi.string().max(24).required().messages({
      "string.empty": "username is required",
      "string.max": "username max 24",
      "any.required": "username is required",
    }),
    email: Joi.string().email().required().messages({
      "string.empty": "email is required",
      "string.email": "email is invalid",
      "any.required": "email is required",
    }),
    password: Joi.string().required().messages({
      "string.empty": "password is required",
      "any.required": "password is required",
    }),
    confirmPassword: Joi.string().required().messages({
      "string.empty": "confirm password is required",
      "any.required": "confirm password is required",
    }),
  });

  return schema.validateAsync(payload);
}
