import type { Request, Response } from "express";
import * as groupService from "../services/group.service";
import { Group } from "../types/group.type";
import { GroupResponse } from "../interfaces/GroupResponse";
import { MessageResponse } from "../interfaces/MessageResponse";

export const removeUserFromGroup = async (
  req: Request<{}, {}, { groupId: number; userId: number }>,
  res: Response<GroupResponse | MessageResponse>
) => {
  try {
    const { groupId, userId } = req.body;

    const group: Group = await groupService.removeUserFromGroup(
      groupId,
      userId
    );

    return res.status(200).json({
      success: true,
      message: "User removed from group successfully",
      group: group,
    });

    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
