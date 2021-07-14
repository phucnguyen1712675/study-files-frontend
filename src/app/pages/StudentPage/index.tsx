import { Container, TextField } from '@material-ui/core';
import * as React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { WatchList } from './components/watchList';
import AppContext from './context';
import reducer from './reducer';
import { axiosInstance } from '../../../api/index';
import { useEffect, useReducer } from 'react';
import './studentPage.css';
import { MyCourses } from './components/myCoursesList';
import TopBar from '../../components/Topbar/Topbar';

export function StudentPage() {
  const initialAppState = {
    query: '',
    items: [],
  };

  const [watchListStore, watchListDispatch] = useReducer(
    reducer,
    initialAppState,
  );
  const [myCoursesStore, myCoursesDispatch] = useReducer(
    reducer,
    initialAppState,
  );

  useEffect(function () {
    async function loadWatchList() {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.studyFiles_user_accessToken}`,
        },
      };
      const res = await axiosInstance.get(
        `/student/watchList/${localStorage.studyFiles_user_id}`,
        config,
      );
      watchListDispatch({
        type: 'init',
        payload: {
          items: res.data,
          query: '',
        },
      });
    }

    async function loadMyCourses() {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.studyFiles_user_accessToken}`,
        },
      };
      const res = await axiosInstance.get(
        `/student/myCourses/${localStorage.studyFiles_user_id}`,
        config,
      );
      myCoursesDispatch({
        type: 'init',
        payload: {
          items: res.data,
          query: '',
        },
      });
    }

    loadWatchList();
    loadMyCourses();
  }, []);

  const btnMyCoursesDelete_Clicked = async function (id) {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.studyFiles_user_accessToken}`,
      },
    };
    try {
      const res = await axiosInstance.delete(
        `/student/myCourses/${id}`,
        config,
      );

      if (res.status === 204) {
        myCoursesDispatch({
          type: 'delete',
          payload: {
            items: res.data,
            query: '',
          },
        });
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Student Page</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <TopBar initQuery={''} />
      <Container>
        <Row>
          <Col sm={8} className="studentPage">
            <div>
              <div style={{ display: 'inline-block' }}> Họ tên:</div>
              <TextField
                id="studentName"
                size="medium"
                style={{
                  borderRadius: 12,
                  border: '2px solid black',
                  display: 'inline-block',
                  marginLeft: '10px',
                }}
                fullWidth={true}
                defaultValue={localStorage.studyFiles_user_name}
              ></TextField>
            </div>
            <div>
              <div style={{ display: 'inline-block' }}> Email:</div>
              <TextField
                id="studentBirthday"
                size="medium"
                style={{
                  borderRadius: 12,
                  border: '2px solid black',
                  display: 'inline-block',
                  marginLeft: '10px',
                }}
                fullWidth={true}
                defaultValue={localStorage.studyFiles_user_email}
              ></TextField>
            </div>
            <Button style={{ marginTop: '10px', marginRight: '10px' }}>
              Sửa thông tin
            </Button>
            <Button style={{ marginTop: '10px' }}>Đổi mật khẩu</Button>
            <div style={{ marginTop: '10px' }}>
              <b>Khóa học yêu thích</b>
            </div>
            <AppContext.Provider value={{ watchListStore, watchListDispatch }}>
              <WatchList />
            </AppContext.Provider>
            <div style={{ marginTop: '10px' }}>
              <b>Khóa học đã đăng kí</b>
            </div>
            <AppContext.Provider value={{ myCoursesStore, myCoursesDispatch }}>
              <MyCourses deleteFunction={btnMyCoursesDelete_Clicked} />
            </AppContext.Provider>
          </Col>
        </Row>
      </Container>
    </>
  );
}
