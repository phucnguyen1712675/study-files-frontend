import React, { useReducer, useEffect } from 'react';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import styles from '../Components/style.module/style.module.css';
import { Col } from 'reactstrap';

import Topbar from 'app/components/Topbar/Topbar';
import Footer from 'app/components/Footer/Footer';
import Sidebar from '../Components/SideBar/Sidebar';
import TableSubCategories from './Components/TableSubCategories';
import AddSubCategory from './Components/AddSubCategories';

import reducer from './Components/SubCategoriesPageReducer';
import AppContext from '../../../AppContext';
import { axiosAdminInstance } from '../../../../api/admin';
import { AccessToken } from 'api/auth';

export function AdminSubCategoriesPage() {
  const initialSubCategories = { subCategories: [] };
  const [store, dispatch] = useReducer(reducer, initialSubCategories);

  useEffect(function () {
    async function loadTasks() {
      await AccessToken();
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.studyFiles_user_accessToken}`,
        },
      };
      const res = await axiosAdminInstance.get(`/subCategories`, config);
      dispatch({
        type: 'init',
        payload: {
          subCategories: res.data,
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
              Sub categories management page
            </h1>
          </Col>
          <AddSubCategory />
          <TableSubCategories />
        </div>
      </AppContext.Provider>
      <Footer />
    </>
  );
}
