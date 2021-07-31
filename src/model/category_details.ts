import { Category } from './category';
import { SubCategory } from './subCategory';

type CategoryDetailsInfo = {
  subCategories: SubCategory[];
};

export type CategoryDetails = Category & CategoryDetailsInfo;
