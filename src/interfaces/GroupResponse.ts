import { Group } from "../types/group.type";
import { MessageResponse } from "./MessageResponse";

export interface GroupResponse extends MessageResponse {
  group: Group;
}
