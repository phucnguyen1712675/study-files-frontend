/**
 * Asynchronously loads the component for TeacherCoursesPage
 */

import { lazyLoad } from 'utils/loadable';

export const TeacherCoursesPage = lazyLoad(
  () => import('./index'),
  module => module.TeacherCoursesPage,
);
