import { Category } from "../../model/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

class ListCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute(): Category[] {
    const categoryList = this.categoriesRepository.list();

    return categoryList;
  }
}

export { ListCategoriesUseCase };
