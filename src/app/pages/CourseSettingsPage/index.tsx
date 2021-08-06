import React from 'react';
import { useParams } from 'react-router-dom';

import { SIDER_MENU_ITEMS } from './constants';
import { useAppDispatch } from '../../hooks';
import HeaderSiderLayout from '../../components/features/teacher/header_sider_layout';
import { getCourseDetails } from '../../../features/teacher/teacherThunkAPI';

type CourseSettingsParams = {
  courseId: string;
};

export function CourseSettingsPage() {
  const { courseId } = useParams<CourseSettingsParams>();

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getCourseDetails(courseId));
  }, [courseId, dispatch]);

  return (
    <HeaderSiderLayout
      siderItems={SIDER_MENU_ITEMS}
      siderHeaderText="Edit course"
    />
  );
}
