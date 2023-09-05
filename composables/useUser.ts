import { User } from "~/utils/types";

export async function useUser() {
  const userState = useState<User>("useUser", () => ({
    username: "",
    email: "",
  }));

  const res = await useFetch("/api/user", {
    method: "GET",
    credentials: "include",
  });

  if (res.data.value?.statusCode === 200)
    userState.value = res.data.value.data as User;

  return userState;
}
