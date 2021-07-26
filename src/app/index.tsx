/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useReducer, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GlobalStyle } from 'styles/global-styles';

import {
  LoginPage,
  RegisterPage,
  EmailVerifiedPage,
} from './pages/AuthenticationPage/Loadable';

import {
  AdminUsersPage,
  AdminMainCategoriesPage,
  AdminSubCategoriesPage,
  AdminCoursesPage,
  AdminUpdatePasswordPage,
} from './pages/AdminPage/Loadable';
import {
  HomePage,
  SearchPage,
  CategoryCoursesListPage,
} from './pages/HomePage/Loadable';

import { StudyPage } from './pages/StudyPage/Loadable';
import { StudentPage } from './pages/StudentPage';
import { UpdatePasswordPage } from './pages/StudentPage/UpdatePassword/updatePasswordPage';
import { CourseDetailPage } from './pages/CourseDetailPage/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';

import reducer from './pages/HomePage/components/homePageReducer';
import AppContext from './AppContext';
import { axiosGuestInstance } from '../api/guest';
import { AccessToken } from 'api/auth';
import { SampleDataSections } from './pages/CourseDetailPage/components/SectionList';

export function App() {
  const { i18n } = useTranslation();
  const initialAppState = {
    user: {},
    userId: '',
    bestSellerCourses: [],
    categories: [],
    subCategories: [],
    latestCourses: [],
    watchList: [],
    myCourses: [],
  };

  // const testAddSectionsAndLectures = async function () {
  //   const sections = [...SampleDataSections()];
  //   const coursesRes = await axiosGuestInstance.get(`/test/courses`);
  //   const courses = coursesRes.data;
  //   for (var course of courses) {
  //     for (var section of sections) {
  //       const dataSection = {
  //         courseId: course.id,
  //         title: section.title,
  //       };
  //       const sectionRes = await axiosGuestInstance.post(
  //         `/test/sections`,
  //         dataSection,
  //       );
  //       const sectionId = sectionRes.data.id;
  //       for (var lecture of section.lectures) {
  //         const dataLecture = {
  //           sectionId: sectionId,
  //           title: lecture.title,
  //           canPreview: lecture.canPreview,
  //           videoUrl: lecture.videoUrl,
  //         };
  //         await axiosGuestInstance.post(`/test/lectures`, dataLecture);
  //       }
  //     }
  //   }
  // };

  // useEffect(function () {
  //   function loadApp2() {
  //     testAddSectionsAndLectures();
  //   }
  //   loadApp2();
  // }, []);

  const [store, dispatch] = useReducer(reducer, initialAppState);
  useEffect(
    function () {
      async function loadApp() {
        const bestSellerCoursesRes = await axiosGuestInstance.get(
          `/courses?sortBy=subscriberNumber:desc&limit=4`,
        );
        const categoriesRes = await axiosGuestInstance.get(`/categories`);
        const subCategoriesRes = await axiosGuestInstance.get(`/subCategories`);
        var latestCourses: any[] = [];
        for (var subCategory of subCategoriesRes.data) {
          const coursesRes = await axiosGuestInstance.get(
            `/courses?sortBy=createdAt:desc&limit=10&subCategoryId=${subCategory.id}`,
          );
          latestCourses = [...latestCourses, ...coursesRes.data.results];
        }
        var watchList: any[] = [];
        var myCourses: any[] = [];
        if (store.userId) {
        }
        if (`${localStorage.studyFiles_user_role}` === 'student') {
          await AccessToken();
          const config = {
            headers: {
              Authorization: `Bearer ${localStorage.studyFiles_user_accessToken}`,
            },
          };
          //WatchList
          const watchListRes = await axiosGuestInstance.get(
            `/student/watchList/${localStorage.studyFiles_user_id}`,
            config,
          );
          for (var item of watchListRes.data) {
            let course = {};
            try {
              const coursesRes = await axiosGuestInstance.get(
                `/courses/${item.courseId}`,
              );
              course = { ...coursesRes.data, watchListId: item.id };
            } catch {}
            watchList = [...watchList, course];
          }

          //MyCourse
          const myCoursesRes = await axiosGuestInstance.get(
            `/student/myCourses/${localStorage.studyFiles_user_id}`,
            config,
          );
          // eslint-disable-next-line
          for (var item of myCoursesRes.data) {
            let course = {};
            try {
              const coursesRes = await axiosGuestInstance.get(
                `/courses/${item.courseId}`,
              );
              course = { ...coursesRes.data, myCourseId: item.id };
            } catch {}
            myCourses = [...myCourses, course];
          }
        }

        dispatch({
          type: 'init',
          payload: {
            bestSellerCourses: bestSellerCoursesRes.data.results,
            categories: categoriesRes.data,
            subCategories: subCategoriesRes.data,
            latestCourses: latestCourses,
            watchList: watchList,
            myCourses: myCourses,
          },
        });
      }
      loadApp();
    },
    [store.userId],
  );

  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - Study-files"
        defaultTitle="Study-files"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="Study-files application" />
      </Helmet>
      <AppContext.Provider value={{ store, dispatch }}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/search" component={SearchPage} />
          <Route
            exact
            path="/category/:category/:subCategory"
            component={CategoryCoursesListPage}
          />

          <Route exact path="/course/:name" component={CourseDetailPage} />
          <Route exact path="/course/:name/studyPage" component={StudyPage} />

          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/verifyEmail" component={EmailVerifiedPage} />

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

          {/* <Route exact path="/teacher" component={TeacherPage} /> */}
          <Route exact path="/student" component={StudentPage} />
          <Route
            exact
            path="/student/updatePassword"
            component={UpdatePasswordPage}
          />

          <Route component={NotFoundPage} />
        </Switch>
      </AppContext.Provider>
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
