export default defineEventHandler((event) => {
  const cookies = parseCookies(event);
  setCookie(event, "token_user", cookies.token_user, { maxAge: 0 });

  return { statusCode: 200, message: "unauthenticate" };
});
