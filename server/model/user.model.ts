import { defineMongooseModel } from "#nuxt/mongoose";

interface IUser {
  username: string;
  email: string;
  password: string;
}

export const User = defineMongooseModel<IUser>({
  name: "User",
  schema: {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  options: {
    timestamps: true,
  },
});
