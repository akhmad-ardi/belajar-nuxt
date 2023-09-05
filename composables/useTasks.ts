import { Task } from "~/utils/types";

export async function useTasks() {
  const tasksState = useState<Task[]>("tasks", () => []);

  const res = await useFetch("/api/task", {
    method: "get",
    credentials: "include",
  });
  if (res.data.value?.statusCode === 200)
    tasksState.value = res.data.value.data as Task[];

  return tasksState;
}
