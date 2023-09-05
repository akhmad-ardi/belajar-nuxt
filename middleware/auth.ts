export default defineNuxtRouteMiddleware(async (to, from) => {
  const res = await useFetch("/api/auth", {
    method: "GET",
    credentials: "include",
  });

  if (!res.data.value?.auth) {
    if (to.fullPath === "/sign-in" || to.fullPath === "/sign-up") return;

    return navigateTo("/sign-in");
  }

  if (
    res.data.value?.auth &&
    (to.fullPath === "/sign-in" || to.fullPath === "/sign-up")
  )
    return navigateTo("/");

  return;
});
