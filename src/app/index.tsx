/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { TeacherProfilePage } from './pages/TeacherProfilePage/Loadable';
import { TeacherCoursesPage } from './pages/TeacherCoursesPage/Loadable';
import { TeacherSettingsPage } from './pages/TeacherSettingsPage/Loadable';
import { EditCourseDetailsPage } from './pages/EditCourseDetailsPage/Loadable';
import { CoursePostingPage } from './pages/CoursePostingPage/Loadable';

import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';

import 'bootstrap/dist/css/bootstrap.min.css';

import {
  TEACHER_PROFILE_PAGE_PATH,
  TEACHER_COURSES_PAGE_PATH,
  TEACHER_SETTINGS_PAGE_PATH,
  EDIT_COURSE_DETAILS_PAGE_PATH,
  COURSE_POSTING_PAGE_PATH,
} from '../constants/routes';

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
        {/* <Route exact path="/" component={HomePage} /> */}
        <Route exact path="/">
          <Redirect to={EDIT_COURSE_DETAILS_PAGE_PATH} />
        </Route>

        <Route
          exact
          path={TEACHER_PROFILE_PAGE_PATH}
          component={TeacherProfilePage}
        />
        <Route
          path={TEACHER_COURSES_PAGE_PATH}
          component={TeacherCoursesPage}
        />
        <Route
          path={TEACHER_SETTINGS_PAGE_PATH}
          component={TeacherSettingsPage}
        />
        <Route
          path={EDIT_COURSE_DETAILS_PAGE_PATH}
          component={EditCourseDetailsPage}
        />
        <Route path={COURSE_POSTING_PAGE_PATH} component={CoursePostingPage} />

        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
}
