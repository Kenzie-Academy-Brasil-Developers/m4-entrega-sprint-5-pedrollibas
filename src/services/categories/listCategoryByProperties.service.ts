import AppDataSource from "../../data-source";
import {Categories} from "../../entities/category.entity"
import { AppError } from "../../errors/appError";

const listCategoryByPropertiesService = async (id: string) => {
  const categoriesRepository = AppDataSource.getRepository(Categories)
  
  const properties = await categoriesRepository.findOne({
    where:{
      id: id
    },
    relations: {
      category: true
    }
  })

  if(!properties){
    throw new AppError("Category not exists", 404)
  }

  return {...properties, properties: id};
};

export default listCategoryByPropertiesService;
