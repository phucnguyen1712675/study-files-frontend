/**
 * Asynchronously loads the component for StudentPage
 */

import { lazyLoad } from 'utils/loadable';

export const StudentPage = lazyLoad(
  () => import('./index'),
  module => module.StudentPage,
);
