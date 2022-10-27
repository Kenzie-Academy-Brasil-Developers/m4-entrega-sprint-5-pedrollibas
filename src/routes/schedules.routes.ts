import { Router } from "express";
import {
  createSchedulesController,
  listSchedulesController,
} from "../controllers/schedules.controller";
import verifyAuthMiddleware from "../middlewares/verifyAuth.middleware";
import verifyIsAdmMiddleware from "../middlewares/verifyIsAdm.middleware";

const schedulesRoutes = Router();

schedulesRoutes.post("", verifyAuthMiddleware, createSchedulesController);
schedulesRoutes.get(
  "/properties/:id",
  verifyAuthMiddleware,
  verifyIsAdmMiddleware,
  listSchedulesController
);

export default schedulesRoutes;
