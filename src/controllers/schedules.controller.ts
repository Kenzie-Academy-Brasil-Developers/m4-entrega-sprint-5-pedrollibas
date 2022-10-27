import { Request, Response } from "express";
import createSchedulesService from "../services/schedules/createSchedules.service";
import listSchedulesService from "../services/schedules/listSchedules.service";

export const createSchedulesController = async (
  req: Request,
  res: Response
) => {
  const { propertyId, date, hour } = req.body;
  const userId = req.user.id;
  const createdSchedules = await createSchedulesService({
    propertyId,
    date,
    hour,
    userId,
  });

  return res.status(201).json({
    message: createdSchedules
  });
};

export const listSchedulesController = async (req: Request, res: Response) => {
  const schedulesId = req.params.id;
  const schedules = await listSchedulesService(schedulesId);

  return res.status(200).json(schedules);
};
