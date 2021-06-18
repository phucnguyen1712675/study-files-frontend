import { combineReducers } from 'redux';

import coursesReducer from './courses';

export const rootReducer = combineReducers({
  courses: coursesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
