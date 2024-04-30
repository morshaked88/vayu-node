import type { Request, Response } from "express";
import * as userService from "../services/user.service";
import { QueryParamsGetUsers } from "../types/query.types";
import { User } from "../types/user.type";
import { GetUsersResponse } from "../interfaces/UserResponse";
import { MessageResponse } from "../interfaces/MessageResponse";

//get users with pagination or filter by name or email
export const getUsers = async (
  req: Request<{}, {}, {}, QueryParamsGetUsers>,
  res: Response<GetUsersResponse | MessageResponse>
) => {
  try {
    const { limit = "10", offset = "1", name, email } = req.query;

    //parse limit and offset to integers
    const intLimit: number = parseInt(limit, 10);
    const intOffset: number = parseInt(offset, 10);

    const users: User[] = await userService.getUsers(
      intLimit,
      intOffset,
      name,
      email
    );

    return res.status(200).json({
      success: true,
      message: "users fetched succefuly",
      users: users,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

//update user status
export const updateUserStatus = async (
  req: Request<
    {},
    {},
    { users: { id: number; status: "active" | "pending" | "blocked" }[] }
  >,
  res: Response<GetUsersResponse | MessageResponse>
) => {
  try {
    const { users } = req.body;
    
    const updatedusers = await userService.updateUserStatus(users);
    res.status(200).json({
      success: true,
      message: "Users status updated successfully",
      users: updatedusers,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
