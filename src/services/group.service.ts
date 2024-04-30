import { db } from "../utils/db.server";
import { Group } from "../types/group.type";
const groupClient = db.group;


//remove user from group
export const removeUserFromGroup = async (
  groupId: number,
  userId: number
): Promise<Group> => {

  const group: Group = await groupClient.update({
    where: { id: groupId },
    data: {
      users: {
        disconnect: { id: userId },
      },
    },
    select: { id: true, name: true, isEmpty: true, users: true },
  });

  //check if group is empty from users
  if (group.users.length === 0) {
    await groupClient.update({
      where: { id: groupId },
      data: {
        isEmpty: true,
      },
    });

    //return group with isEmpty flag
    return {
      ...group,
      isEmpty: true,
    };
  }

  return group;
};
