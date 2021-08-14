export const SIGN_IN_PAGE_PATH = '/login';
export const SIGN_UP_PAGE_PATH = '/register';
export const VERIFY_EMAIL_PAGE_PATH = '/verifyEmail';

export const TEACHER_PROFILE_PAGE_PATH = '/teacher/:name';
export const TEACHER_COURSES_PAGE_PATH = '/my-courses';
export const TEACHER_SETTINGS_PAGE_PATH = '/settings';
export const COURSE_SETTINGS_PAGE_PATH = '/courses/:courseId/settings';
export const COURSE_POSTING_PAGE_PATH = '/new';

export const getTeacherProfilePagePath = (teacherName: string) =>
  `/teacher/${teacherName}`;

export const getCourseSettingsPagePath = (courseId: string) =>
  `/courses/${courseId}/settings`;

export const getCourseDetailsPagePath = (courseName: string) =>
  `/course/${courseName}`;
