import { Router } from "express";
import {
  createPropertiesController,
  listPropertiesController,
} from "../controllers/properties.controller";
import verifyAuthMiddleware from "../middlewares/verifyAuth.middleware";
import verifyIsAdmMiddleware from "../middlewares/verifyIsAdm.middleware";

const propertiesRoutes = Router();

propertiesRoutes.post(
  "",
  verifyAuthMiddleware,
  verifyIsAdmMiddleware,
  createPropertiesController
);

propertiesRoutes.get("", listPropertiesController);

export default propertiesRoutes;
