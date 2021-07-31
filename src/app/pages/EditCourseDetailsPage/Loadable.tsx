/**
 * Asynchronously loads the component for EditCourseDetailsPage
 */

import { lazyLoad } from 'utils/loadable';

export const EditCourseDetailsPage = lazyLoad(
  () => import('./index'),
  module => module.EditCourseDetailsPage,
);
