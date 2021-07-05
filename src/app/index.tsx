/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { LoginPage } from './pages/AuthenticationPage/Login/Loadable';
import { RegisterPage } from './pages/AuthenticationPage/Register/Loadable';
import { AdminPage } from './pages/AdminPage/Loadable';
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
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/student" component={StudentPage} />
        <Route exact path="/admin" component={AdminPage} />
        {/* <Route exact path="/" component={HomePage} /> */}
        <Route exact path="/" component={TeacherPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
}
