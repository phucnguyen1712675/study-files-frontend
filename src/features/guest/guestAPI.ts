import _axios from '../constants/axios';
const axios = _axios('');
export const getCategoriesResults = async () => {
  try {
    const { data } = await axios.get('/categories');
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getSubCategoriesOfCategoryResults = async (categoryId: string) => {
  try {
    const { data } = await axios.get(`/categories/${categoryId}/subCategories`);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
