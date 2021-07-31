import React, { useReducer, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import styles from '../Components/style.module/style.module.css';
import { Col } from 'reactstrap';

import Topbar from 'app/components/Topbar/Topbar';
import Footer from 'app/components/Footer/Footer';
import Sidebar from '../Components/SideBar/Sidebar';
import TableMainCategories from './Components/TableMainCategories';
import AddMainCategories from './Components/AddMainCategories';

import reducer from './Components/MainCategoriesPageReducer';
import AppContext from '../../../AppContext';
import { axiosAdminInstance } from '../../../../api/admin';
import { AccessToken } from 'api/auth';

export function AdminMainCategoriesPage() {
  const initialMainCategoriesPage = { mainCategories: [] };

  const [store, dispatch] = useReducer(reducer, initialMainCategoriesPage);

  useEffect(function () {
    async function loadTasks() {
      await AccessToken();
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.studyFiles_user_accessToken}`,
        },
      };
      const res = await axiosAdminInstance.get(`/categories?limit=100`, config);
      dispatch({
        type: 'init',
        payload: {
          mainCategories: res.data,
        },
      });
    }
    loadTasks();
  }, []);

  return (
    <>
      <Topbar initQuery={''} />
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
              Tất cả danh mục chính
            </h1>
          </Col>
          <AddMainCategories />
          <TableMainCategories />
        </div>
      </AppContext.Provider>
      <Footer />
    </>
  );
}
