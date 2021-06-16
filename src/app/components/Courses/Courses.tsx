import * as React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootState } from 'reducers';
import { StateType as CourseType } from '../../../models/model/course';

import Course from './Course/Course';
import useStyles from './styles';

export default function Courses({ setCurrentId }) {
  const courses = useSelector((state: RootState) => state.courses);
  const classes = useStyles();

  // console.log(courses);

  return !courses.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.mainContainer}
      container
      alignItems="stretch"
      spacing={3}
    >
      {courses.map((course: CourseType) => (
        <Grid key={course.id} item xs={12} sm={6} md={6}>
          <Course course={course} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
}
