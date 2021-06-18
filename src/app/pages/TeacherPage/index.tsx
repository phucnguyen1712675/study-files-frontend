import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { getCourses } from '../../../actions/courses';
import course_img from '../../../images/course.png';
import Courses from 'app/components/Courses/Courses';
import Form from 'app/components/Form/Form';
import useStyles from './styles';

export function TeacherPage() {
  const [currentId, setCurrentId] = React.useState('');
  const classes = useStyles();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Teacher Page</title>
        <meta
          name="description"
          content="Study-files application TeacherPage"
        />
      </Helmet>
      <Container maxWidth="lg">
        <AppBar className={classes.appBar} position="static" color="inherit">
          <Typography className={classes.heading} variant="h2" align="center">
            Courses
          </Typography>
          <img
            className={classes.image}
            src={course_img}
            alt="icon"
            height="120"
          />
        </AppBar>
        <Grow in>
          <Container>
            <Grid
              container
              justify="space-between"
              alignItems="stretch"
              spacing={3}
            >
              <Grid item xs={12} sm={7}>
                <Courses setCurrentId={setCurrentId} />
              </Grid>

              <Grid item xs={12} sm={4}>
                {/* <Form currentId={currentId} setCurrentId={setCurrentId} /> */}
                <Form currentId={currentId} />
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </Container>
    </>
  );
}
