import React from 'react';

import { SIDER_MENU_ITEMS } from './constants';
import TeacherInfoContainer from './components/teacher_info_container';
import { useAppDispatch } from '../../../hooks';
import HeaderSiderLayout from '../../components/features/teacher/header_sider_layout';
import { getTeacherInfo } from '../../../features/guest/guestThunkAPI';

export function TeacherSettingsPage() {
  const dispatch = useAppDispatch();

  const teacherId = localStorage.studyFiles_user_id;

  React.useEffect(() => {
    dispatch(getTeacherInfo(teacherId));
  }, [dispatch, teacherId]);

  return (
    <HeaderSiderLayout
      siderItems={SIDER_MENU_ITEMS}
      headerContainer={<TeacherInfoContainer />}
      siderHeaderText="Account settings"
    />
  );
}
