import { defineMongooseModel } from "#nuxt/mongoose";
import mongoose from "mongoose";

interface ITask {
  id_user: string;
  task: string;
  finished: boolean;
}

export const Task = defineMongooseModel<ITask>({
  name: "Task",
  schema: {
    id_user: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    task: {
      type: String,
      required: true,
    },
    finished: {
      type: Boolean,
      default: false,
    },
  },
  options: {
    timestamps: true,
  },
});
