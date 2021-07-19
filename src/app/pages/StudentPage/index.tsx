import { Container, TextField } from '@material-ui/core';
import React, { useContext } from 'react';
import { Grid, Tabs, Tab, Box, Button } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppContext from 'app/AppContext';
import { axiosInstance } from '../../../api/index';
import './studentPage.css';
import TopBar from '../../components/Topbar/Topbar';
import Footer from '../../components/Footer/Footer';
import { CourseCard } from 'app/components/Cards/Cards';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

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

export function StudentPage() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const { store, dispatch } = useContext(AppContext) as any;
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.studyFiles_user_accessToken}`,
    },
  };

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
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
      alert('Update successed');
    }
  };

  const history = useHistory();

  const NavigateToUpdatePasswordPage = function () {
    history.push('/student/updatePassword');
  };

  // widget function ===================
  const WatchListWidget = function () {
    return (
      <div style={{ padding: '20px' }}>
        <Grid container xs={12} spacing={1}>
          {store.watchList.map(course => (
            <Grid item xs={3} key={course.id}>
              <div style={{ margin: '0px 0px' }}>
                <CourseCard course={course} />
                <Button
                  style={{ margin: '0px 20px' }}
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    console.log(course.watchListId);
                    deleteCourseOfWatchList(course.watchListId);
                  }}
                >
                  Remove
                </Button>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  };

  const MyCoursesWidget = function () {
    return (
      <div style={{ padding: '20px' }}>
        <Grid container xs={12} spacing={3} justifyContent="center">
          {store.myCourses.map(course => (
            <Grid item xs={3} key={course.id}>
              <div style={{ margin: '0px 0px' }}>
                <CourseCard course={course} />
                <Button
                  style={{ margin: '0px 20px' }}
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    console.log(course.myCourseId);
                    deleteCourseOfMyCourse(course.myCourseId);
                  }}
                >
                  Remove
                </Button>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
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
            marginRight: 'auto',
          }}
        >
          User info
        </h2>
        <div
          style={{
            marginLeft: 'auto',
            padding: '0px 40px',
          }}
        >
          <TextField
            id="studentName"
            size="medium"
            style={{
              color: '#525252',
              borderRadius: 12,
              display: 'inline-block',
            }}
            fullWidth
            label="Your name - userName"
            defaultValue={localStorage.studyFiles_user_name}
            variant="outlined"
            value={nameValue}
            onChange={nameHandleChange}
          />
          <TextField
            id="studentBirthday"
            size="medium"
            style={{
              color: '#525252',
              borderRadius: 12,
              display: 'inline-block',
              marginTop: '20px',
            }}
            fullWidth
            label="Your email - userEmail"
            defaultValue={localStorage.studyFiles_user_email}
            variant="outlined"
            value={emailValue}
            onChange={emailHandleChange}
          />
        </div>

        {/* button stuffs */}
        <div
          style={{
            padding: '0px 40px',
            marginTop: '10px',
            display: 'flex',
            flexDirection: 'row',
            marginLeft: 'auto',
          }}
        >
          <Button
            variant="contained"
            color="primary"
            style={{
              marginTop: '10px',
              marginRight: '10px',
              marginLeft: 'auto',
            }}
            onClick={updateDetailStudent}
          >
            Sửa thông tin
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: '10px' }}
            onClick={() => NavigateToUpdatePasswordPage()}
          >
            Đổi mật khẩu
          </Button>
        </div>
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
