import React, { useReducer, useEffect } from 'react';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import styles from '../Components/style.module/style.module.css';
import { Col } from 'reactstrap';

import Topbar from 'app/components/Topbar/Topbar';
import Sidebar from '../Components/SideBar/Sidebar';
import TableCourses from './Components/TableCourses';

import reducer from './Components/CoursesPageReducer';
import AppContext from '../../../AppContext';
import { axiosAdminInstance } from '../../../../api/admin';

export function AdminCoursesPage() {
  const initialCourses = { courses: [] };
  const [store, dispatch] = useReducer(reducer, initialCourses);

  useEffect(function () {
    async function loadTasks() {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.studyFiles_user_accessToken}`,
        },
      };
      const res = await axiosAdminInstance.get(`/courses`, config);
      dispatch({
        type: 'init',
        payload: {
          courses: res.data,
        },
      });
    }
    loadTasks();
  }, []);

  return (
    <>
      <Topbar />
      <Sidebar />
      <AppContext.Provider value={{ store, dispatch }}>
        <div className={styles.wrapper}>
          <Col
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginRight: '10%',
              marginTop: '30px',
            }}
          >
            <h1
              style={{
                color: 'gray',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              Tất cả khóa học
            </h1>
          </Col>
          <TableCourses />
        </div>
      </AppContext.Provider>
    </>
  );
}
