/**
 * Create the store with dynamic reducers
 */

import {
  configureStore,
  StoreEnhancer,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit';
import { createInjectorsEnhancer } from 'redux-injectors';
import createSagaMiddleware from 'redux-saga';

import { createReducer } from './store/reducers';
import guestReducer from './features/guest/guestSlice';
import teacherReducer from './features/teacher/teacherSlice';

const reduxSagaMonitorOptions = {};
const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
const { run: runSaga } = sagaMiddleware;

const enhancers = [
  createInjectorsEnhancer({
    createReducer,
    runSaga,
  }),
] as StoreEnhancer[];

export const store = configureStore({
  reducer: {
    guest: guestReducer,
    teacher: teacherReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(sagaMiddleware),
  devTools:
    /* istanbul ignore next line */
    process.env.NODE_ENV !== 'production' || process.env.PUBLIC_URL.length > 0,
  enhancers,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
