/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const AdminUsersPage = lazyLoad(
  () => import('./UsersPage/UsersPage'),
  module => module.AdminUsersPage,
);
export const AdminMainCategoriesPage = lazyLoad(
  () => import('./MainCategoriesPage/MainCategoriesPage'),
  module => module.AdminMainCategoriesPage,
);
export const AdminSubCategoriesPage = lazyLoad(
  () => import('./SubCategoriesPage/SubCategoriesPage'),
  module => module.AdminSubCategoriesPage,
);
export const AdminCoursesPage = lazyLoad(
  () => import('./CoursesPage/CoursesPage'),
  module => module.AdminCoursesPage,
);
export const AdminUpdatePasswordPage = lazyLoad(
  () => import('./UpdatePasswrod/UpdatePasswordPage'),
  module => module.AdminUpdatePasswordPage,
);
