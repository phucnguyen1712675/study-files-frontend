import { Container, TextField } from '@material-ui/core';
import * as React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import background from '../../../assets/background.jpg';
import { WatchList } from './components/watchList';
import AppContext from './context';
import reducer from './reducer';
import { axiosInstance } from '../../../api/index';
import { useEffect, useReducer } from 'react';
import './studentPage.css';
import { MyCourses } from './components/myCoursesList';

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
      const res = await axiosInstance.get(
        `/student/watchList/60bf7ebd84719069503bd29a`,
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
      const res = await axiosInstance.get(
        `/student/myCourses/60bf7ebd84719069503bd29a`,
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

  return (
    <>
      <Helmet>
        <title>Student Page</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <Container>
        <Row>
          <Col sm={4} className="studentPage">
            <div
              style={{
                backgroundImage: `url(${background})`,
                backgroundRepeat: 'no-repeat',
                width: '100px',
                height: '100px',
                marginLeft: '1%',
              }}
            ></div>
          </Col>
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
                defaultValue="Student A"
              ></TextField>
            </div>
            <div>
              <div style={{ display: 'inline-block' }}> Ngày sinh:</div>
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
                defaultValue="1/1/2020"
              ></TextField>
            </div>
            <div>
              <div style={{ display: 'inline-block' }}> Email:</div>
              <TextField
                id="studentEmail"
                size="medium"
                style={{
                  borderRadius: 12,
                  border: '2px solid black',
                  display: 'inline-block',
                  marginLeft: '10px',
                }}
                fullWidth={true}
                defaultValue="student@gmail.com"
              ></TextField>
            </div>
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
              <MyCourses />
            </AppContext.Provider>
          </Col>
        </Row>
      </Container>
    </>
  );
}
