/**
 * Asynchronously loads the component for TeacherSettingsPage
 */

import { lazyLoad } from 'utils/loadable';

export const TeacherSettingsPage = lazyLoad(
  () => import('./index'),
  module => module.TeacherSettingsPage,
);
