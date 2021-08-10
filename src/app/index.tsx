/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import { useReducer, useEffect } from 'react';
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
import { TeacherProfilePage } from './pages/TeacherProfilePage/Loadable';
import { TeacherCoursesPage } from './pages/TeacherCoursesPage/Loadable';
import { TeacherSettingsPage } from './pages/TeacherSettingsPage/Loadable';
import { CourseSettingsPage } from './pages/CourseSettingsPage/Loadable';
import { CoursePostingPage } from './pages/CoursePostingPage/Loadable';

import { NotFoundPage } from './components/NotFoundPage/Loadable';

import reducer from './pages/HomePage/components/homePageReducer';
import AppContext from './AppContext';
import {
  TEACHER_PROFILE_PAGE_PATH,
  TEACHER_COURSES_PAGE_PATH,
  TEACHER_SETTINGS_PAGE_PATH,
  COURSE_SETTINGS_PAGE_PATH,
  COURSE_POSTING_PAGE_PATH,
} from '../constants/routes';
// import { ROLES } from '../constants/roles';
import { axiosGuestInstance } from '../api/guest';
import { AccessToken } from '../api/auth';
// import {
//   SampleDataSections,
//   SampleDataImages,
// } from './pages/CourseDetailPage/components/SectionList';

import 'bootstrap/dist/css/bootstrap.min.css';

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
    loading: true,
  };

  // const testAddSectionsAndLectures = async function () {
  //   // const sections = [...SampleDataSections()];
  //   const images = [...SampleDataImages()];
  //   let i = 0;
  //   const length = images.length;
  //   const coursesRes = await axiosGuestInstance.get(`/test/courses`);
  //   const courses = coursesRes.data;
  //   for (var course of courses) {
  //     i = i % length;
  //     const data = { image: images[i] };
  //     await axiosGuestInstance.patch(`/test/courses/${course.id}`, data);
  //     i = i + 1;
  //     // for (var section of sections) {
  //     //   const dataSection = {
  //     //     courseId: course.id,
  //     //     title: section.title,
  //     //   };
  //     //   const sectionRes = await axiosGuestInstance.post(
  //     //     `/test/sections`,
  //     //     dataSection,
  //     //   );
  //     //   const sectionId = sectionRes.data.id;
  //     //   for (var lecture of section.lectures) {
  //     //     const dataLecture = {
  //     //       sectionId: sectionId,
  //     //       title: lecture.title,
  //     //       canPreview: lecture.canPreview,
  //     //       videoUrl: lecture.videoUrl,
  //     //     };
  //     //     await axiosGuestInstance.post(`/test/lectures`, dataLecture);
  //     //   }
  //     // }
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
            let course = { watchListId: item.id };
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
            let course = { myCourseId: item.id };
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
            loading: false,
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
          <Route exact path="/studyPage/:name/" component={StudyPage} />

          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/verifyEmail" component={EmailVerifiedPage} />

          {/* admin routes */}
          <PrivateRouteAdmin exact path="/admin/users">
            <AdminUsersPage />
          </PrivateRouteAdmin>
          <PrivateRouteAdmin exact path="/admin/courses">
            <AdminCoursesPage />
          </PrivateRouteAdmin>
          <PrivateRouteAdmin exact path="/admin/mainCategories">
            <AdminMainCategoriesPage />
          </PrivateRouteAdmin>
          <PrivateRouteAdmin exact path="/admin/subCategories">
            <AdminSubCategoriesPage />
          </PrivateRouteAdmin>
          <PrivateRouteAdmin exact path="/admin/updatePassword">
            <AdminUpdatePasswordPage />
          </PrivateRouteAdmin>
          {/* end admin routes */}

          {/* student route */}
          <PrivateRouteStudent exact path="/student">
            <StudentPage />
          </PrivateRouteStudent>
          <PrivateRouteStudent exact path="/student/updatePassword">
            <UpdatePasswordPage />
          </PrivateRouteStudent>
          {/* end student route */}

          <Route
            path={TEACHER_PROFILE_PAGE_PATH}
            component={TeacherProfilePage}
          />

          {/* teacher route */}
          <PrivateRouteTeacher exact path={TEACHER_COURSES_PAGE_PATH}>
            <TeacherCoursesPage />
          </PrivateRouteTeacher>

          <PrivateRouteTeacher path={TEACHER_SETTINGS_PAGE_PATH}>
            <TeacherSettingsPage />
          </PrivateRouteTeacher>

          <PrivateRouteTeacher path={COURSE_SETTINGS_PAGE_PATH}>
            <CourseSettingsPage />
          </PrivateRouteTeacher>

          <PrivateRouteTeacher path={COURSE_POSTING_PAGE_PATH}>
            <CoursePostingPage />
          </PrivateRouteTeacher>
          {/* end teacher route */}

          <Route component={NotFoundPage} />
        </Switch>
      </AppContext.Provider>
      <GlobalStyle />
    </BrowserRouter>
  );
}

function PrivateRouteAdmin({ children, ...rest }) {
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

function PrivateRouteTeacher({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() =>
        localStorage.studyFiles_user_role === 'teacher' ? (
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

function PrivateRouteStudent({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() =>
        localStorage.studyFiles_user_role === 'student' ? (
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
