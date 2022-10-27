import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entity";
import { UsersProperties } from "../../entities/usersProperties.entity";
import { AppError } from "../../errors/appError";

const listSchedulesService = async (id: string) => {
  const schedulesRepository = AppDataSource.getRepository(UsersProperties);
  const propertiesRepository = AppDataSource.getRepository(Properties);

  const properties = await propertiesRepository.find();
  const verifyProperty = properties.find((elem) => elem.id === id);

  if (!verifyProperty) {
    throw new AppError("Properties not exists", 404);
  }

  const schedules = await propertiesRepository.findOne({
    where: {
    id: id
    },
    relations: {
      schedules: true,
    }
  });

  return schedules;
};

export default listSchedulesService;

//Rota deve listar todos os agendamentos de um imóvel.