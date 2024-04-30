import { z } from "zod";

// Define the status enum
const statusEnum = z.enum(["active", "pending", "blocked"]);

const userUpdateSchema = z.object({
  id: z.number(),
  status: statusEnum,
});

export const updateUserStatusSchema = z.object({
  users: z.array(userUpdateSchema),
});


export const removeUserFromGroupSchema = z.object({
  groupId: z.number(),
  userId: z.number(),
});
