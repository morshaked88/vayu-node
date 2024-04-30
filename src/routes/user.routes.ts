import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { validateQueryData, validateBodyData } from "../middlewares";
import { querySchema } from "../schemas/query.schema";
import { updateUserStatusSchema } from "../schemas/body.schema";
const userRouter = Router();

//GET: get all users optionally filtered by name or email and pagination by limit and offset
// /user?limit=10&offset=1&name=example&email=example@example.com
userRouter.get("/", validateQueryData(querySchema), userController.getUsers);

//update user status with body data
/// /user/status
userRouter.put(
  "/status",
  validateBodyData(updateUserStatusSchema),
  userController.updateUserStatus
);
export default userRouter;
