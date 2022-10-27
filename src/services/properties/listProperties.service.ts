import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entity";
import { AppError } from "../../errors/appError";

const listPropertiesService = async () => {
  const propertiesRepository = AppDataSource.getRepository(Properties);
  const properties = await propertiesRepository.find();

  if(!properties){
    throw new AppError("Properteis not exists")
  }

  return properties;
};

export default listPropertiesService;
