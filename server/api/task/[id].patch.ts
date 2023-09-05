import { Task } from "~/server/model/task.model";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  const task = (await Task.findById(id)) as { finished: boolean };
  if (!task) return { statusCode: 404, message: "task not found" };

  await Task.findByIdAndUpdate(id, { $set: { finished: !task.finished } });

  return {
    statusCode: 201,
    message: task.finished ? "task finished" : "task unfinish",
  };
});
