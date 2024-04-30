import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { validateQueryData, validateBodyData } from "../middlewares";
import { querySchema } from "../schemas/query.schema";
import { updateUserStatusSchema } from "../schemas/body.schema";
const userRouter = Router();

//GET: /api/v1/user - get users with pagination or filter by name or email
userRouter.get("/", validateQueryData(querySchema), userController.getUsers);

//PUT: /api/v1/user/status - update user status
userRouter.put(
  "/status",
  validateBodyData(updateUserStatusSchema),
  userController.updateUserStatus
);
export default userRouter;
