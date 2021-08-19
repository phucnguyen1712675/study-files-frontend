import React from 'react';
import { useParams } from 'react-router-dom';
import { Result, Button } from 'antd';

import { SIDER_MENU_ITEMS } from './constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import HeaderSiderLayout from '../../components/features/teacher/header_sider_layout';
import { getCourseDetails } from '../../../features/teacher/teacherThunkAPI';
import { selectCourseDetails } from '../../../features/teacher/teacherSlice';

type CourseSettingsParams = {
  courseId: string;
};

export function CourseSettingsPage() {
  const { courseId } = useParams<CourseSettingsParams>();

  const dispatch = useAppDispatch();

  const { isLoading, error } = useAppSelector(selectCourseDetails);

  React.useEffect(() => {
    dispatch(getCourseDetails(courseId));
  }, [courseId, dispatch]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return !isLoading && !!error ? (
    <Result
      status={error.code}
      title={error.code}
      subTitle={`Sorry, ${error.message}`}
      extra={
        <Button type="primary" href={process.env.PUBLIC_URL + '/'}>
          Back Home
        </Button>
      }
    />
  ) : (
    <HeaderSiderLayout
      siderItems={SIDER_MENU_ITEMS}
      siderHeaderText="Edit course"
    />
  );
}
