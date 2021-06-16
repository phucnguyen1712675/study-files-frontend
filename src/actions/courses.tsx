import { Dispatch } from 'redux';

import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  // LIKE,
} from '../constants/actionTypes';
import * as api from '../api';
import { StateType as Course } from '../models/model/course';

// Actions Creators
export const getCourses = () => async (dispatch: Dispatch) => {
  try {
    const { data } = await api.fetchCourses();

    dispatch({ type: FETCH_ALL, payload: data.results });
  } catch (error) {
    console.log(error.message);
  }
};

export const createCourse = (course: Course) => async (dispatch: Dispatch) => {
  try {
    const { data } = await api.createCourse(course);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateCourse = (id: string, post: Course) => async (
  dispatch: Dispatch,
) => {
  try {
    const { data } = await api.updateCourse(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteCourse = (id: string) => async (dispatch: Dispatch) => {
  try {
    await api.deleteCourse(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};

// export const likeCourse = (id: any) => async (dispatch: Dispatch) => {
//   try {
//     const { data } = await api.likePost(id);

//     dispatch({ type: LIKE, payload: data });
//   } catch (error) {
//     console.log(error.message);
//   }
// };
