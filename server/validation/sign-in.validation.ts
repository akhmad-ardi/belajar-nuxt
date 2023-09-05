import Joi from "joi";
import { ReqBodySignInUser } from "~/utils/types";

export default async function SignInValidation(payload: ReqBodySignInUser) {
  const schema = Joi.object<ReqBodySignInUser>({
    email: Joi.string().email().required().messages({
      "string.empty": "email is required",
      "string.email": "email is invalid",
      "any.required": "email is required",
    }),
    password: Joi.string().required().messages({
      "string.empty": "password is required",
      "any.required": "password is required",
    }),
  });

  return schema.validateAsync(payload);
}
