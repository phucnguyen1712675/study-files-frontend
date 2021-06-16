import axios from 'axios';

import { StateType as Course } from '../models/model/course';

const url = 'http://localhost:3000/v1/courses';

export const fetchCourses = () => axios.get(url);
export const createCourse = (newCourse: Course) => axios.post(url, newCourse);
export const updateCourse = (id: string, updatedCourse: Course) =>
  axios.patch(`${url}/${id}`, updatedCourse);
export const deleteCourse = (id: string) => axios.delete(`${url}/${id}`);
// export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
