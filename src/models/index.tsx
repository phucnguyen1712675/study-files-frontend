import { Model } from 'react-model';
import Course from './model/course';

const models = { Course };

export const {
  getInitialState,
  useStore,
  getState,
  actions,
  subscribe,
  unsubscribe,
} = Model(models);
