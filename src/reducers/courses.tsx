import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  // LIKE,
} from '../constants/actionTypes';
import { StateType as Course } from '../models/model/course';

const coursesReducer = (courses = [] as Course[], action: any) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;

    case CREATE:
      return [...courses, action.payload];

    case UPDATE:
      return courses.map(course =>
        course.id === action.payload._id ? action.payload : course,
      );
    case DELETE:
      return courses.filter(course => course.id !== action.payload);

    default:
      return courses;
  }
};

export default coursesReducer;
