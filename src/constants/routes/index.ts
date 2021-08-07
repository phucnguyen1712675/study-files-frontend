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
