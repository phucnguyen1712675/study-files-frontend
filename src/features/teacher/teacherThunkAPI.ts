import { createAsyncThunk } from '@reduxjs/toolkit';

import { teacherRequest } from './utils';

import {
  GET_COURSE_DETAILS,
  GET_CATEGORIES_DETAILS,
  GET_SECTIONS_RESULTS,
} from './teacherActionTypes';
import axios from '../config/axios';

export const getCourseDetails = createAsyncThunk(
  GET_COURSE_DETAILS,
  async (courseId: string, thunkAPI) => {
    try {
      const { data } = await axios.get(`/courses/${courseId}/details`);

      return data;
    } catch (error) {
      var err: any;
      // Error
      if (error.response) {
        err = error.response.data;
      } else if (error.request) {
        err = error.request;
      } else {
        err = error.message;
      }
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const getCategoriesDetails = createAsyncThunk(
  GET_CATEGORIES_DETAILS,
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(`/categories/details`);

      return data;
    } catch (error) {
      var err: any;
      // Error
      if (error.response) {
        err = error.response.data;
      } else if (error.request) {
        err = error.request;
      } else {
        err = error.message;
      }
      return thunkAPI.rejectWithValue(err);
    }
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
