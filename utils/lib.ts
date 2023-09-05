import jwt, { JwtPayload } from "jsonwebtoken";

export function checkToken(token: string) {
  try {
    const decode = jwt.verify(
      token,
      process.env.PUBLIC_TOKEN as string
    ) as JwtPayload;

    return decode.id_user;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) return error;
  }
}
