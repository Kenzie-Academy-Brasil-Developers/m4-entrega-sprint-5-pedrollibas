import AppDataSource from "../../data-source";
import { Categories } from "../../entities/category.entity";
import { AppError } from "../../errors/appError";
import { ICategoryRequest } from "../../interfaces/categories";

const createCategoryService = async (category: ICategoryRequest) => {
  const categoryRepository = AppDataSource.getRepository(Categories);
  const categories = await categoryRepository.find();

  const categoryAlreadyExists = categories.find(
    (elem) => elem.name === category.name
  );

  if (categoryAlreadyExists) {
    throw new AppError("Category already exists");
  }

  const createdCategory = categoryRepository.create({
    name: category.name,
  });

  await categoryRepository.save(createdCategory);

  return createdCategory;
};

export default createCategoryService;
