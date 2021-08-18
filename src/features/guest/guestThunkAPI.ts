import { createAsyncThunk } from '@reduxjs/toolkit';

import { GET_TEACHER_INFO, GET_TEACHER_COURSES } from './guestActionTypes';
import axios from '../config/axios';

export const getTeacherInfo = createAsyncThunk(
  GET_TEACHER_INFO,
  async (userId: string) => {
    const { data } = await axios.get(`/teachers/info/${userId}`);
    return data;
  },
);

export const getCoursesOfTeacherQueryResult = createAsyncThunk(
  GET_TEACHER_COURSES,
  async (query: string) => {
    const { data } = await axios.get(`/courses?${query}`);
    return data;
  },
);
