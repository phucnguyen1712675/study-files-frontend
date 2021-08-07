/**
 * Asynchronously loads the component for CourseSettingsPage
 */

import { lazyLoad } from 'utils/loadable';

export const CourseSettingsPage = lazyLoad(
  () => import('./index'),
  module => module.CourseSettingsPage,
);
