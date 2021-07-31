/**
 * Asynchronously loads the component for CoursePostingPage
 */

import { lazyLoad } from 'utils/loadable';

export const CoursePostingPage = lazyLoad(
  () => import('./index'),
  module => module.CoursePostingPage,
);
