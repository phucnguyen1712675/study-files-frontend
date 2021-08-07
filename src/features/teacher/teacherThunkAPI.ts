import { createAsyncThunk } from '@reduxjs/toolkit';

import { teacherRequest } from './utils';

import {
  GET_COURSE_DETAILS,
  GET_CATEGORIES_DETAILS,
  GET_SECTIONS_RESULTS,
} from './teacherActionTypes';
import axios from '../constants/axios';

export const getCourseDetails = createAsyncThunk(
  GET_COURSE_DETAILS,
  async (courseId: string) => {
    const { data } = await axios.get(`/courses/${courseId}/details`);
    return data;
  },
);

export const getCategoriesDetails = createAsyncThunk(
  GET_CATEGORIES_DETAILS,
  async () => {
    const { data } = await axios.get(`/categories/details`);
    return data;
  },
);

export const getSectionsResults = createAsyncThunk(
  GET_SECTIONS_RESULTS,
  async (courseId: string) => {
    const request = async () => {
      const { data } = await axios.get(
        `/teachers/sections/details?courseId=${courseId}&sortBy=ordinalNumber:asc`,
      );
      const { results } = data;
      return results;
    };
    return teacherRequest(request);
  },
);
