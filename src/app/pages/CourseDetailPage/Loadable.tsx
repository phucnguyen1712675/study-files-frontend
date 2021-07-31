import { lazyLoad } from 'utils/loadable';

export const CourseDetailPage = lazyLoad(
  () => import('./CourseDetailPage'),
  module => module.default,
);
