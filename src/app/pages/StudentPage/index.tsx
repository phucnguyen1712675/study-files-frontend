import { Container, TextField } from '@material-ui/core';
import React, { useContext } from 'react';
import { Grid } from '@material-ui/core';
import { Button, Col, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import background from '../../../assets/background.jpg';
import { WatchList } from './components/watchList';
import AppContext from 'app/AppContext';
import reducer from './reducer';
import { axiosInstance } from '../../../api/index';
import { useEffect, useReducer } from 'react';
import './studentPage.css';
import { MyCourses } from './components/myCoursesList';
import { CourseCard } from 'app/components/Cards/Cards';

export function StudentPage() {
  const { store, dispatch } = useContext(AppContext) as any;
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.studyFiles_user_accessToken}`,
    },
  };

  const deleteCourseOfWatchList = async function (watchListId) {
    // TODO vu gọi api ở đây, status ok thì mới update dispatch
    const res = await axiosInstance.delete(
      `/student/watchList/${watchListId}`,
      config,
    );
    console.log(watchListId);
    if (res.status === 204) {
      dispatch({
        type: 'delete_watch_list',
        payload: {
          watchListId: watchListId,
        },
      });
    } else {
      alert('Đã xảy ra lỗi');
    }
  };

  // TODO vu delete myCourses
  const deleteCourseOfMyCourse = async function (myCourseId) {
    // TODO vu gọi api ở đây, status ok thì mới update dispatch
    const res = await axiosInstance.delete(
      `/student/myCourses/${myCourseId}`,
      config,
    );
    console.log(myCourseId);
    if (res.status === 204) {
      dispatch({
        type: 'delete_my_courses',
        payload: {
          myCourseId: myCourseId,
        },
      });
    } else {
      alert('Đã xảy ra lỗi');
    }
  };

  // TODO vu delete myCourses

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
            {/* // TODO Vu lm thêm cho mycourse */}
            <Grid item xs={9}>
              <Grid container spacing={1}>
                {store.watchList.map(course => (
                  <div>
                    <Grid item justifyContent="center" xs={4}>
                      <CourseCard course={course} />
                    </Grid>
                    <Button onClick={() => deleteCourseOfWatchList(course.id)}>
                      delete Watch list
                    </Button>
                  </div>
                ))}
              </Grid>
            </Grid>

            {/* <div style={{ marginTop: '10px' }}>
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
            </AppContext.Provider> */}
          </Col>
        </Row>
      </Container>
    </>
  );
}
