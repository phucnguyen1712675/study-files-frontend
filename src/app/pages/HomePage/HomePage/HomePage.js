import React, { useContext } from 'react';
import { Grid } from '@material-ui/core';
import { CourseCard } from '../components/courseCard';
import AppContext from '../../../AppContext';

export default function HomePage() {
  const { store } = useContext(AppContext);
  if (store.query.trim() === '') {
    return (
      <>
        <h1>home page</h1>
        <Grid container spacing={0}>
          {store.bestSellerCourses.map(item => (
            <CourseCard course={item} />
          ))}
        </Grid>
      </>
    );
  } else return <></>;
}
