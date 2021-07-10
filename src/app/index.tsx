/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { LoginPage } from './pages/AuthenticationPage/Login/Loadable';
import { RegisterPage } from './pages/AuthenticationPage/Register/Loadable';
import {
  AdminUsersPage,
  AdminMainCategoriesPage,
  AdminSubCategoriesPage,
  AdminCoursesPage,
  AdminUpdatePasswordPage,
} from './pages/AdminPage/Loadable';
import { HomePage } from './pages/HomePage/Loadable';

import { TeacherPage } from './pages/TeacherPage/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import { StudentPage } from './pages/StudentPage';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - Study-files"
        defaultTitle="Study-files"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="Study-files application" />
      </Helmet>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />

        {/* admin routes */}
        <PrivateRoute exact path="/admin/users">
          <AdminUsersPage />
        </PrivateRoute>
        <PrivateRoute exact path="/admin/courses">
          <AdminCoursesPage />
        </PrivateRoute>
        <PrivateRoute exact path="/admin/mainCategories">
          <AdminMainCategoriesPage />
        </PrivateRoute>
        <PrivateRoute exact path="/admin/subCategories">
          <AdminSubCategoriesPage />
        </PrivateRoute>
        <PrivateRoute exact path="/admin/updatePassword">
          <AdminUpdatePasswordPage />
        </PrivateRoute>
        {/* end admin routes */}

        <Route exact path="/teacher" component={TeacherPage} />
        <Route exact path="/student" component={StudentPage} />
        {/* <Route exact path="/student"  component={StudentPage}/> */}

        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
}

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() =>
        localStorage.studyFiles_user_role === 'admin' ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
            }}
          />
        )
      }
    />
  );
}
