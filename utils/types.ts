export type Menu = {
  label: string;
  href: string;
};

export type Task = {
  _id: string;
  task: string;
  finished: boolean;
  createdAt: Date;
  udpatedAt: Date;
};

export type User = {
  username: string;
  email: string;
};

// Request Body
export type ReqBodySignUpUser = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type ReqBodySignInUser = {
  email: string;
  password: string;
};

export type ReqBodyTask = {
  id_user: string;
  task: string;
};
