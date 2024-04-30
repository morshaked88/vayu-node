import { db } from "../utils/db.server";
import { User } from "../types/user.type";

const userClient = db.user;

type userFilter = {
  name?: string;
  email?: string;
};
export const getUsers = async (
  limit: number,
  offset: number,
  name?: string,
  email?: string
): Promise<User[]> => {
  const whereClause: userFilter = {};

  if (name) {
    whereClause["name"] = name;
  }

  if (email) {
    whereClause["email"] = email;
  }

  return await userClient.findMany({
    where: whereClause,
    take: limit * 1,
    skip: offset - 1,
  });
};

//im not sure about handling large scale of users changes, maybe we can use batch update and split the array into chunks
export const updateUserStatus = async (
  users: {
    id: number;
    status: "active" | "pending" | "blocked";
  }[]
): Promise<User[]> => {
  const updatedUsers = await Promise.all(
    users.map((user) =>
      userClient.update({
        where: { id: user.id },
        data: { status: user.status },
        select: { id: true, status: true, name: true, email: true },
      })
    )
  );

  return updatedUsers;
};
