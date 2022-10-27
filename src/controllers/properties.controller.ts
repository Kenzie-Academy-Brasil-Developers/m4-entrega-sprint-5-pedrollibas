import { Request, Response } from "express";
import createPropertiesService from "../services/properties/createProperties.service";
import listPropertiesService from "../services/properties/listProperties.service";

export const createPropertiesController = async (
  req: Request,
  res: Response
) => {
  const property = req.body;
  const createdProperty = await createPropertiesService(property);

  return res.status(201).json(createdProperty);
};

export const listPropertiesController = async (req: Request, res: Response) => {
  const properties = await listPropertiesService();

  return res.status(200).json(properties);
};
