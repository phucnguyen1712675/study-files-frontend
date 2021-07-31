/**
 * Asynchronously loads the component for TeacherProfilePage
 */

import { lazyLoad } from 'utils/loadable';

export const TeacherProfilePage = lazyLoad(
  () => import('./index'),
  module => module.TeacherProfilePage,
);
