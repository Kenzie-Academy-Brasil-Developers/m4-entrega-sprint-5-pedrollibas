import AppDataSource from "../../data-source";
import { Addresses } from "../../entities/addresses.entity";
import { Categories } from "../../entities/category.entity";
import { Properties } from "../../entities/properties.entity";
import { AppError } from "../../errors/appError";
import { IPropertyRequest } from "../../interfaces/properties";

const createPropertiesService = async (data: IPropertyRequest) => {
  const propertiesRepository = AppDataSource.getRepository(Properties);
  const addressRepository = AppDataSource.getRepository(Addresses);
  const categoriesRepository = AppDataSource.getRepository(Categories);

  const categories = await categoriesRepository.find();
  const verifyCategories = categories.find(
    (elem) => elem.id === data.categoryId
  );

  if (!verifyCategories) {
    throw new AppError("Category not exists", 404);
  }

  if (data.address.zipCode.length > 8 || data.address.state.length > 2) {
    throw new AppError("Invalid values");
  }

  const addressAlreadyExists = await addressRepository.findOneBy({
    ...data.address,
  });

  if (addressAlreadyExists) {
    throw new AppError("Address Already Exists");
  }
  const properties = propertiesRepository.create(data);
  await propertiesRepository.save(properties);

  return {...properties, category: data.categoryId};
};

export default createPropertiesService;
