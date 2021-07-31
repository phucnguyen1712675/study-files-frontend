/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const HomePage = lazyLoad(
  () => import('./HomePage/HomePage'),
  module => module.default,
);
export const SearchPage = lazyLoad(
  () => import('./SearchPage/SearchPage'),
  module => module.default,
);
export const CategoryCoursesListPage = lazyLoad(
  () => import('./CategoryCoursesListPage/CategoryCoursesListPage'),
  module => module.default,
);
