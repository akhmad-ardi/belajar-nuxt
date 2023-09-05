import { Task } from "~/server/model/task.model";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  const task = await Task.findByIdAndRemove(id);
  if (!task) return { statusCode: 404, message: "task not found" };

  return {
    statusCode: 201,
    message: "task deleted",
  };
});
