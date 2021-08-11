import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  getCourseDetails,
  getCategoriesDetails,
  getSectionsResults,
} from './teacherThunkAPI';
import { RootState } from '../../app/store';
import { CourseDetails, Section, CategoryDetails } from '../../types';

type TeacherState = {
  courseDetails: {
    data?: CourseDetails;
    isLoading: boolean;
    error?: any;
  };
  categoriesDetails: {
    data: CategoryDetails[];
    isLoading: boolean;
    error?: any;
  };
  coursePostingStep: number;
  newCourseId?: string;
  newCourseSections: {
    data: Section[];
    isLoading: boolean;
    error?: any;
  };
};

const initialState: TeacherState = {
  courseDetails: {
    isLoading: false,
  },
  categoriesDetails: {
    data: [],
    isLoading: false,
  },
  newCourseSections: {
    data: [],
    isLoading: false,
  },
  coursePostingStep: 0,
};

export const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {
    coursePostingNextStep: state => {
      state.coursePostingStep += 1;
    },
    setCoursePostingStep: (state, action: PayloadAction<number>) => {
      state.coursePostingStep = action.payload;
    },
    setNewCourseId: (state, action: PayloadAction<string>) => {
      state.newCourseId = action.payload;
    },
    clearNewCourseId: state => {
      delete state.newCourseId;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getCourseDetails.pending, state => {
        state.courseDetails.isLoading = true;
      })
      .addCase(getCourseDetails.fulfilled, (state, action) => {
        state.courseDetails.data = action.payload;
        state.courseDetails.isLoading = false;
      })
      .addCase(getCourseDetails.rejected, (state, action) => {
        state.courseDetails.error = action.payload;
        state.courseDetails.isLoading = false;
      });

    builder
      .addCase(getCategoriesDetails.pending, state => {
        state.categoriesDetails.isLoading = true;
      })
      .addCase(getCategoriesDetails.fulfilled, (state, action) => {
        state.categoriesDetails.data = action.payload;
        state.categoriesDetails.isLoading = false;
      })
      .addCase(getCategoriesDetails.rejected, (state, action) => {
        state.categoriesDetails.error = action.payload;
        state.categoriesDetails.isLoading = false;
      });

    builder
      .addCase(getSectionsResults.pending, state => {
        state.newCourseSections.isLoading = true;
      })
      .addCase(getSectionsResults.fulfilled, (state, action) => {
        state.newCourseSections.data = action.payload;
        state.newCourseSections.isLoading = false;
      })
      .addCase(getSectionsResults.rejected, (state, action) => {
        state.newCourseSections.error = action.payload;
        state.newCourseSections.isLoading = false;
      });
  },
});

export const {
  coursePostingNextStep,
  setCoursePostingStep,
  setNewCourseId,
  clearNewCourseId,
} = teacherSlice.actions;

export const selectCourseDetails = (state: RootState) =>
  state.teacher.courseDetails;

export const selectCategoryDetails = (state: RootState) =>
  state.teacher.categoriesDetails;

export const selectCoursePostingStep = (state: RootState) =>
  state.teacher.coursePostingStep;

export const selectNewCourseId = (state: RootState) =>
  state.teacher.newCourseId;

export const selectNewCourseSections = (state: RootState) =>
  state.teacher.newCourseSections;

export default teacherSlice.reducer;
