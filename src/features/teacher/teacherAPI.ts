import axios from '../constants/axios';

export const addCourse = async (payload: any) => {
  try {
    const response = await axios.post('/teachers/courses', payload);
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

export const addSection = async (payload: any) => {
  try {
    const response = await axios.post('/teachers/sections', payload);
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

export const addLecture = async (payload: any) => {
  try {
    const response = await axios.post('/teachers/lectures', payload);
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

export const getSectionsResults = async (courseId: string) => {
  try {
    const { data } = await axios.get(
      `/teachers/sections/details?courseId=${courseId}&sortBy=ordinalNumber:asc`,
    );
    const { results } = data;
    console.log(results);
    return results;
  } catch (error) {
    console.log(error.message);
  }
};

export const getLecturesTotalResults = async (sectionId: string) => {
  try {
    const { data } = await axios.get(
      `/teachers/lectures?sectionId=${sectionId}`,
    );
    const { totalResults } = data;
    return totalResults;
  } catch (error) {
    console.log(error.message);
  }
};

export const getSectionsDetailsResults = async (courseId: string) => {
  try {
    const { data } = await axios.get(
      `/teachers/sections/details?courseId=${courseId}`,
    );
    const { results } = data;
    return results;
  } catch (error) {
    console.log(error.message);
  }
};

export const updateCourse = async (payload: any) => {
  try {
    const { id, ...body } = payload;
    const response = await axios.patch(`/teachers/courses/${id}`, body);
    return response;
  } catch (error) {
    console.log(error.message);
  }
};
