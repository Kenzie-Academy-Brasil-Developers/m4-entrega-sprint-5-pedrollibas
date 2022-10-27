import { Router } from "express";
import {
  createCategoryController,
  listCategoriesController,
  listCategoryByPropertiesController,
} from "../controllers/categories.controller";
import verifyAuthMiddleware from "../middlewares/verifyAuth.middleware";
import verifyIsAdmMiddleware from "../middlewares/verifyIsAdm.middleware";

const categoriesRoutes = Router();

categoriesRoutes.post(
  "",
  verifyAuthMiddleware,
  verifyIsAdmMiddleware,
  createCategoryController
);

categoriesRoutes.get("", listCategoriesController);
categoriesRoutes.get("/:id/properties", listCategoryByPropertiesController);

export default categoriesRoutes;
