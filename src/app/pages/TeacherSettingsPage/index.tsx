import React from 'react';

import { SIDER_MENU_ITEMS } from './constants';
import TeacherInfoContainer from './components/teacher_info_container';
import { useAppDispatch } from '../../hooks';
import HeaderSiderLayout from '../../components/features/teacher/header_sider_layout';
import { getTeacherInfo } from '../../../features/guest/guestThunkAPI';

export function TeacherSettingsPage() {
  const teacherId = '60bb395c4dce1a05188ea3e0';

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getTeacherInfo(teacherId));
  }, [dispatch]);

  return (
    <HeaderSiderLayout
      siderItems={SIDER_MENU_ITEMS}
      headerContainer={<TeacherInfoContainer />}
      siderHeaderText="Account settings"
    />
  );
}
