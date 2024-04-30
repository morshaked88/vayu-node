import { User } from "./user.type";

export type Group = {
  id: number;
  name: string;
  isEmpty: boolean;
  users: User[];
};
