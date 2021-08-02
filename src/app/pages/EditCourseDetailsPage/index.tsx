import React from 'react';

import { SIDER_MENU_ITEMS } from './constants';
import { useAppDispatch } from '../../hooks';
import HeaderSiderLayout from '../../components/features/teacher/header_sider_layout';
import { getCourseDetails } from '../../../features/teacher/teacherThunkAPI';

import TopBar from '../../components/Topbar/Topbar';
import Footer from '../../components/Footer/Footer';

export function EditCourseDetailsPage() {
  const courseId = '60fec06d49229d5ff003e126';

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getCourseDetails(courseId));
  }, [dispatch]);

  return (
    <>
      <TopBar initQuery={''} />
      <HeaderSiderLayout
        siderItems={SIDER_MENU_ITEMS}
        siderHeaderText="Edit course"
      />
      <Footer />
    </>
  );
}
