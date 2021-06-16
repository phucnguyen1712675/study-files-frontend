/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const AdminPage = lazyLoad(
  () => import('./index'),
  module => module.AdminPage,
);
