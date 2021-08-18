import { Container } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import { Grid, Tabs, Tab, Box, Button } from '@material-ui/core';
import { NewReleases } from '@material-ui/icons';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Badge, message } from 'antd';
import { useForm } from 'react-hook-form';
import AppContext from 'app/AppContext';
import { axiosGuestInstance } from '../../../api/guest';
import './studentPage.css';
import TopBar from '../../components/Topbar/Topbar';
import Footer from '../../components/Footer/Footer';
import { CourseCard, CourseCardNotFound } from 'app/components/Cards/Cards';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { axiosAuthInstance, AccessToken } from 'api/auth';
import noCourse from 'images/noCourses.png';

const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#525252',
  },
})((props: StyledTabsProps) => (
  <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />
));

const AntTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$selected': {
      color: '#525252',
      fontWeight: 'Bolder',
    },
    '&:focus': {
      color: '#000000',
    },
  },
  selected: {},
}))((props: StyledTabProps) => <Tab disableRipple {...props} />);

interface StyledTabsProps {
  value: number;
  onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}

interface StyledTabProps {
  label: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().required('Email is required').email('Email is invalid'),
});

export function StudentPage() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const { store, dispatch } = useContext(AppContext) as any;
  const [isVerified, setIsVerified] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: localStorage.studyFiles_user_name,
      email: localStorage.studyFiles_user_email,
    },
  });

  useEffect(function () {
    function loadApp() {
      setIsVerified(localStorage.studyFiles_user_isVerified === 'true');
    }
    loadApp();
  }, []);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const deleteCourseOfWatchList = async function (watchListId) {
    await AccessToken();
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.studyFiles_user_accessToken}`,
      },
    };
    const res = await axiosGuestInstance.delete(
      `/student/watchList/${watchListId}`,
      config,
    );
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
    await AccessToken();
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.studyFiles_user_accessToken}`,
      },
    };
    const res = await axiosGuestInstance.delete(
      `/student/myCourses/${myCourseId}`,
      config,
    );
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

  const updateDetailStudent = async function (data) {
    await AccessToken();
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.studyFiles_user_accessToken}`,
      },
    };
    try {
      const res = await axiosGuestInstance.patch(
        `/auth/update/${localStorage.studyFiles_user_id}`,
        data,
        config,
      );
      if (res.status === 200) {
        localStorage.studyFiles_user_name = data.name;
        localStorage.studyFiles_user_email = data.email;
        localStorage.studyFiles_user_isVerified = res.data.isEmailVerified;
        setIsVerified(`${res.data.isEmailVerified}` === 'true');
        dispatch({
          type: 'update_user_id',
          payload: {
            userId: localStorage.studyFiles_user_id,
          },
        });
        alert('Update successed');
      }
    } catch (err) {
      if (err.response) {
        message.error(err.response.data.message);
      } else if (err.request) {
        message.error(err.request);
      } else {
        message.error(err.message);
      }
    }
  };

  const history = useHistory();

  const NavigateToUpdatePasswordPage = function () {
    history.push('/student/updatePassword');
  };

  const VerifyEmailClick = async function () {
    try {
      const resSendEmail = await axiosAuthInstance.post(
        '/send-verification-email',
        {
          email: localStorage.studyFiles_user_email,
          id: localStorage.studyFiles_user_id,
        },
      );
      if (resSendEmail.status === 200) {
        alert('an Otp have sent to your register mail');
        history.push('/verifyEmail');
      } else {
        alert('something wrong ?');
      }
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      } else if (err.request) {
        alert(err.request);
      } else {
        alert(err.message);
      }
    }
  };

  // widget function ===================
  const noCourseWidget = function () {
    return (
      <div
        style={{
          width: '100%',
          minHeight: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <img src={noCourse} alt="icon" width="25%" />
        <h1>Ops!... no courses here</h1>
        <div style={{ color: '#525252', fontWeight: 'lighter' }}>
          You cannot find the right course for you?? try search for it :))
        </div>
      </div>
    );
  };

  const courseCardMyCourse = function (course) {
    if (!course.status) {
      return (
        <Badge.Ribbon
          text={<div style={{ color: '#fafafa' }}>Incomplete</div>}
          placement="start"
          color="#ff5454"
          style={{ marginLeft: '20px' }}
        >
          <CourseCard course={course} />
        </Badge.Ribbon>
      );
    } else return <CourseCard course={course} />;
  };

  const WatchListWidget = function () {
    return (
      <div style={{ padding: '20px' }}>
        {store.watchList.length > 0 ? (
          <Grid container spacing={1}>
            {store.watchList.map(course => {
              if (course.id) {
                return (
                  <Grid item xs={3} key={course.id}>
                    <div style={{ margin: '0px 0px' }}>
                      <CourseCard course={course} />
                      <Button
                        style={{ margin: '0px 20px' }}
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                          deleteCourseOfWatchList(course.watchListId);
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  </Grid>
                );
              } else {
                return (
                  <Grid item xs={3}>
                    <div style={{ margin: '0px 0px' }}>
                      <CourseCardNotFound />
                      <Button
                        style={{ margin: '0px 20px' }}
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                          deleteCourseOfWatchList(course.watchListId);
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  </Grid>
                );
              }
            })}
          </Grid>
        ) : (
          noCourseWidget()
        )}
      </div>
    );
  };

  const MyCoursesWidget = function () {
    return (
      <div style={{ padding: '20px' }}>
        {store.myCourses.length > 0 ? (
          <Grid container spacing={3} justifyContent="center">
            {store.myCourses.map(course => {
              if (course.id) {
                const url = `/studyPage/${course.name}/`;
                return (
                  <Grid item xs={3} key={course.id}>
                    <div>
                      {courseCardMyCourse(course)}

                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          maxWidth: '330px',
                        }}
                      >
                        <Button
                          style={{ margin: '0px 20px' }}
                          variant="outlined"
                          color="primary"
                          onClick={() => {
                            deleteCourseOfMyCourse(course.myCourseId);
                          }}
                        >
                          Remove
                        </Button>
                        <Button
                          onClick={() =>
                            history.push(url, {
                              courseName: course.name,
                              courseId: course.id,
                              myCourseId: course.myCourseId,
                            })
                          }
                          variant="contained"
                          style={{
                            marginLeft: 'auto',
                            backgroundColor: '#041d33',
                            color: '#fafafa',
                          }}
                        >
                          Enter class
                        </Button>
                      </div>
                    </div>
                  </Grid>
                );
              } else {
                return (
                  <Grid item xs={3}>
                    <div style={{ margin: '0px 0px' }}>
                      <CourseCardNotFound />
                      <Button
                        style={{ margin: '0px 20px' }}
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                          deleteCourseOfMyCourse(course.myCourseId);
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  </Grid>
                );
              }
            })}
          </Grid>
        ) : (
          noCourseWidget()
        )}
      </div>
    );
  };

  const VerifiedEmailButton = function () {
    if (isVerified) {
      return <></>;
    }
    return (
      <Button
        variant="contained"
        color="secondary"
        style={{
          marginTop: '10px',
          marginRight: 'auto',
        }}
        startIcon={<NewReleases />}
        onClick={VerifyEmailClick}
      >
        Xác thực mail
      </Button>
    );
  };

  return (
    <>
      <TopBar initQuery={''} />
      <Container className="studentPage">
        {/* Update info */}
        <h2
          style={{
            color: '#525252',
            marginTop: '20px',
            marginLeft: '40px',
            marginRight: 'auto',
            fontWeight: 'bolder',
            fontSize: 25,
          }}
        >
          User info
        </h2>
        <form
          style={{
            marginLeft: 'auto',
            padding: '0px 40px',
          }}
          onSubmit={handleSubmit(updateDetailStudent)}
        >
          <input
            style={{
              color: '#525252',
              padding: '10px 20px',
              display: 'inline-block',
            }}
            type="text"
            placeholder={'Your name'}
            {...register('name')}
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.name?.message}</div>
          <input
            style={{
              color: '#525252',
              marginTop: '20px',
              padding: '10px 20px',
              display: 'inline-block',
            }}
            placeholder={'Your email - userEmail'}
            {...register('email')}
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          />
          <div className="invalid-feedback">{errors.email?.message}</div>
          {/* button stuffs */}
          <div
            style={{
              marginTop: '10px',
              display: 'flex',
              flexDirection: 'row',
              marginLeft: 'auto',
            }}
          >
            {VerifiedEmailButton()}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{
                marginTop: '10px',
                marginRight: '10px',
                marginLeft: 'auto',
              }}
            >
              Update info
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: '10px' }}
              onClick={() => NavigateToUpdatePasswordPage()}
            >
              Update password
            </Button>
          </div>
        </form>
      </Container>

      {/* watchList and mycourse */}
      <div className={classes.root} style={{ marginTop: '20px' }}>
        <AntTabs
          value={value}
          onChange={handleChange}
          aria-label="wrapped label tabs example"
        >
          <AntTab label="Watch list" {...a11yProps(0)} />
          <AntTab label="My courses" {...a11yProps(1)} />
        </AntTabs>

        <TabPanel value={value} index={0}>
          {WatchListWidget()}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {MyCoursesWidget()}
        </TabPanel>
      </div>
      <Footer />
    </>
  );
}
