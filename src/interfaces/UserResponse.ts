import { User } from "../types/user.type";
import { MessageResponse } from "./MessageResponse";

export interface GetUsersResponse extends MessageResponse {
  users: User[];
}
