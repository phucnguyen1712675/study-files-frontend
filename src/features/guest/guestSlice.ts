import { createSlice } from '@reduxjs/toolkit';

import {
  getTeacherInfo,
  getCoursesOfTeacherQueryResult,
} from './guestThunkAPI';
import { RootState } from '../../app/store';
import { Course, Teacher } from '../../types';

type CourseQueryResult = {
  results: Course[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
};

type GuestState = {
  teacherCourses: {
    data?: CourseQueryResult;
    isLoading: boolean;
    error?: any;
  };
  teacherInfo: {
    data?: Teacher;
    isLoading: boolean;
    error?: any;
  };
};

const initialState: GuestState = {
  teacherCourses: {
    isLoading: false,
  },
  teacherInfo: {
    isLoading: false,
  },
};

export const guestSlice = createSlice({
  name: 'guest',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCoursesOfTeacherQueryResult.pending, state => {
        state.teacherCourses.isLoading = true;
      })
      .addCase(getCoursesOfTeacherQueryResult.fulfilled, (state, action) => {
        state.teacherCourses.data = action.payload;
        state.teacherCourses.isLoading = false;
      })
      .addCase(getCoursesOfTeacherQueryResult.rejected, (state, action) => {
        state.teacherCourses.error = action.payload;
        state.teacherCourses.isLoading = false;
      });

    builder
      .addCase(getTeacherInfo.pending, state => {
        state.teacherInfo.isLoading = true;
      })
      .addCase(getTeacherInfo.fulfilled, (state, action) => {
        state.teacherInfo.data = action.payload;
        state.teacherInfo.isLoading = false;
      })
      .addCase(getTeacherInfo.rejected, (state, action) => {
        state.teacherInfo.error = action.payload;
        state.teacherInfo.isLoading = false;
      });
  },
});

export const selectTeacherCourses = (state: RootState) =>
  state.guest.teacherCourses;

export const selectTeacherInfo = (state: RootState) => state.guest.teacherInfo;

export default guestSlice.reducer;
