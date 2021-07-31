import axios from '../constants/axios';
import { AccessToken } from '../../api/auth';

export const addCourse = async (payload: any) => {
  try {
    await AccessToken();
    const response = await axios.post('/teachers/courses', payload);
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

export const addSection = async (payload: any) => {
  try {
    await AccessToken();
    const response = await axios.post('/teachers/sections', payload);
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

export const addLecture = async (payload: any) => {
  try {
    await AccessToken();
    const response = await axios.post('/teachers/lectures', payload);
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

export const getLecturesTotalResults = async (sectionId: string) => {
  try {
    await AccessToken();
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
    await AccessToken();
    const { data } = await axios.get(
      `/teachers/sections/details?courseId=${courseId}&sortBy=ordinalNumber:asc`,
    );
    const { results } = data;
    return results;
  } catch (error) {
    console.log(error.message);
  }
};

export const updateCourse = async (payload: any) => {
  try {
    await AccessToken();
    const { id, ...body } = payload;
    const response = await axios.patch(`/teachers/courses/${id}`, body);
    return response;
  } catch (error) {
    console.log(error.message);
  }
};
