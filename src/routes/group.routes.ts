import { Router } from "express";
import * as groupController from "../controllers/group.controller";
import { validateBodyData } from "../middlewares";
import { removeUserFromGroupSchema } from "../schemas/body.schema";
const groupRouter = Router();

groupRouter.put(
  "/",
  validateBodyData(removeUserFromGroupSchema),
  groupController.removeUserFromGroup
);
export default groupRouter;
