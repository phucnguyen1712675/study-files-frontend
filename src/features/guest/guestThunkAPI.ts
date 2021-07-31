import { createAsyncThunk } from '@reduxjs/toolkit';

import { GET_TEACHER_INFO, GET_TEACHER_COURSES } from './guestActionTypes';
import axios from '../constants/axios';
import { GettingTeacherCoursesQuery } from '../../model/query/getting_teacher_courses';

export const getTeacherInfo = createAsyncThunk(
  GET_TEACHER_INFO,
  async (userId: string) => {
    const { data } = await axios.get(`/teachers/info/${userId}`);
    return data;
  },
);

export const getCoursesOfTeacherQueryResult = createAsyncThunk(
  GET_TEACHER_COURSES,
  async (query: GettingTeacherCoursesQuery) => {
    const { data } = await axios.get(
      `/courses?teacherId=${query.teacherId}&page=${query.page}&limit=${query.limit}&sortBy=${query.sortBy}:${query.sortResults}`,
    );
    return data;
  },
);
