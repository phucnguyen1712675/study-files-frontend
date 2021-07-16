import { Container, TextField } from '@material-ui/core';
import React, { useContext } from 'react';
import { Grid } from '@material-ui/core';
import { Button, Col, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import AppContext from 'app/AppContext';
import { axiosInstance } from '../../../api/index';
import './studentPage.css';
import TopBar from '../../components/Topbar/Topbar';
import { CourseCard } from 'app/components/Cards/Cards';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export function StudentPage() {
  const { store, dispatch } = useContext(AppContext) as any;
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.studyFiles_user_accessToken}`,
    },
  };

  const deleteCourseOfWatchList = async function (watchListId) {
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

  const deleteCourseOfMyCourse = async function (myCourseId) {
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

  const [nameValue, setNameValue] = useState(localStorage.studyFiles_user_name);
  const [emailValue, setEmailValue] = useState(
    localStorage.studyFiles_user_email,
  );

  const nameHandleChange = e => {
    setNameValue(e.target.value);
    console.log(`${nameValue}`);
  };

  const emailHandleChange = e => {
    setEmailValue(e.target.value);
    console.log(`${emailValue}`);
  };

  const updateDetailStudent = async function () {
    console.log(nameValue);
    console.log(emailValue);
    const data = {
      name: nameValue,
      email: emailValue,
    };
    const res = await axiosInstance.patch(
      `/admin/users/${localStorage.studyFiles_user_id}`,
      data,
      config,
    );
    if (res.status === 200) {
      localStorage.studyFiles_user_name = data.name;
      localStorage.studyFiles_user_email = data.email;
    }
  };

  const history = useHistory();

  const NavigateToUpdatePasswordPage = function () {
    history.push('/student/updatePassword');
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
                variant="outlined"
                value={nameValue}
                onChange={nameHandleChange}
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
                variant="outlined"
                value={emailValue}
                onChange={emailHandleChange}
              ></TextField>
            </div>
            <Button
              style={{ marginTop: '10px', marginRight: '10px' }}
              onClick={updateDetailStudent}
            >
              Sửa thông tin
            </Button>
            <Button
              style={{ marginTop: '10px' }}
              onClick={() => NavigateToUpdatePasswordPage()}
            >
              Đổi mật khẩu
            </Button>
            {/* // TODO Vu lm thêm cho mycourse */}
            <div style={{ fontSize: '22px' }}>Khóa học đã thích</div>
            <Grid item xs={9}>
              <Grid container spacing={1}>
                {store.watchList.map(course => (
                  <div>
                    <Grid item justifyContent="center" xs={4}>
                      <CourseCard course={course} />
                    </Grid>
                    <Button
                      onClick={() => {
                        console.log(course.watchListId);
                        deleteCourseOfWatchList(course.watchListId);
                      }}
                    >
                      delete Watch list
                    </Button>
                  </div>
                ))}
              </Grid>
            </Grid>

            <div>Khóa học đã đăng kí</div>
            <Grid item xs={9}>
              <Grid container spacing={1}>
                {store.myCourses.map(course => (
                  <div>
                    <Grid item justifyContent="center" xs={4}>
                      <CourseCard course={course} />
                    </Grid>
                    <Button
                      onClick={() => {
                        console.log(course.myCourseId);
                        deleteCourseOfMyCourse(course.myCourseId);
                      }}
                    >
                      delete My Course
                    </Button>
                  </div>
                ))}
              </Grid>
            </Grid>
          </Col>
        </Row>
      </Container>
    </>
  );
}
