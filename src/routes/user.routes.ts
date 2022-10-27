import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  listAllUsersController,
  updateUserController,
} from "../controllers/user.controller";
import verifyAuthMiddleware from "../middlewares/verifyAuth.middleware";
import verifyIsAdm from "../middlewares/verifyIsAdm.middleware";
import verifyUpdateMiddleware from "../middlewares/verifyUpdate.middleware";

const userRoutes = Router();

userRoutes.post("", createUserController);
userRoutes.get("", verifyAuthMiddleware, verifyIsAdm, listAllUsersController);
userRoutes.patch(
  "/:id",
  verifyAuthMiddleware,
  verifyUpdateMiddleware,
  updateUserController
);
userRoutes.delete(
  "/:id",
  verifyAuthMiddleware,
  verifyIsAdm,
  deleteUserController
);

export default userRoutes;
