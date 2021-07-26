import axios from 'axios';
import { API } from './url';

import { StateType as Course } from '../models/model/course';
const APIUrl = API;

const url = `${APIUrl}/courses`;

export const fetchCourses = () => axios.get(url);
export const createCourse = (newCourse: Course) => axios.post(url, newCourse);
export const updateCourse = (id: string, updatedCourse: Course) =>
  axios.patch(`${url}/${id}`, updatedCourse);
export const deleteCourse = (id: string) => axios.delete(`${url}/${id}`);
// export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);

export const axiosInstance = axios.create({
  baseURL: `${APIUrl}`,
  timeout: 5000,
  headers: {},
});
