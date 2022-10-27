import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entity";
import { User } from "../../entities/user.entity";
import { UsersProperties } from "../../entities/usersProperties.entity";
import { AppError } from "../../errors/appError";
import { IScheduleRequest } from "../../interfaces/schedules";

const createSchedulesService = async ({
  userId,
  propertyId,
  date,
  hour,
}: IScheduleRequest) => {
  const schedulesRepository = AppDataSource.getRepository(UsersProperties);
  const usersRepository = AppDataSource.getRepository(User);
  const propertiesRepository = AppDataSource.getRepository(Properties);

  const newDate = new Date(`${date.split("/").join("-")} ${hour}`);
  const day = newDate.getDay();
  const newHour = newDate.getHours();

  if (day === 0 || day === 6) {
    throw new AppError("Day off");
  }

  if (newHour < 8 || newHour >= 18) {
    throw new AppError("Hour off");
  }

  const schedules = await schedulesRepository.find();
  const verifyDate = schedules.find((elem) => {
    const date = new Date(`${elem.date} ${elem.hour}`);
    return date.getTime() === newDate.getTime();
  });
  
  if (verifyDate) {
    throw new AppError("Day ocuped", 400);
  }

  const users = await usersRepository.find();
  const verifyUser = users.find((elem) => elem.id === userId);

  if (!verifyUser) {
    throw new AppError("User not exists", 404);
  }

  const properties = await propertiesRepository.find();
  const verifyProperties = properties.find((elem) => elem.id === propertyId);

  if (!verifyProperties) {
    throw new AppError("Property not exists", 404);
  }

  const schedule = schedulesRepository.create({
    user: verifyUser,
    date: newDate,
    properties: verifyProperties,
    hour: hour,
  });

  await schedulesRepository.save(schedule);

  return schedule;
};

export default createSchedulesService;
