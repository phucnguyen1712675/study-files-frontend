/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const LoginPage = lazyLoad(
  () => import('./Login'),
  module => module.default,
);
