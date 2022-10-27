import { Request, Response } from "express";
import createCategoryService from "../services/categories/createCategory.service";
import listCategoriesService from "../services/categories/listCategories.service";
import listCategoryByPropertiesService from "../services/categories/listCategoryByProperties.service";

export const createCategoryController = async (req: Request, res: Response) => {
  const category = req.body;
  const createdCategory = await createCategoryService(category);
  return res.status(201).json(createdCategory);
};

export const listCategoriesController = async (req: Request, res: Response) => {
  const categories = await listCategoriesService();
  return res.json(categories);
};

export const listCategoryByPropertiesController = async (
  req: Request,
  res: Response
) => {
  const idCategory = req.params.id;
  const properties = await listCategoryByPropertiesService(idCategory);

  return res.status(200).json(properties);
};
