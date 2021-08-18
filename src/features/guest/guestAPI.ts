import axios from '../config/axios';

export const getCategoriesResults = async () => {
  try {
    const { data } = await axios.get('/categories');
    return data;
  } catch (error) {
    if (error.response) {
      return error.response.data.message;
    }
  }
};

export const getSubCategoriesOfCategoryResults = async (categoryId: string) => {
  try {
    const { data } = await axios.get(`/categories/${categoryId}/subCategories`);
    return data;
  } catch (error) {
    if (error.response) {
      return error.response.data.message;
    }
  }
};

export const checkIfTeacherExists = async (userId: string) => {
  try {
    const { data } = await axios.get(`/teachers/info/${userId}`);
    return !!data;
  } catch (error) {
    return false;
  }
};
