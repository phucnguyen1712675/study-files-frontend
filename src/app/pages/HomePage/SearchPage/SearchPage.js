import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../../../AppContext';
import { axiosGuestInstance } from '../../../../api/guest';
import { Grid, Select } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';

import searchingImage from '../../../../images/searching.png';
import { CourseCard } from '../../../components/Cards/Cards';
import TopBar from '../../../components/Topbar/Topbar';
import Footer from '../../../components/Footer/Footer';

export default function SearchPage() {
  const { store } = useContext(AppContext);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [totalCourses, setTotalCourses] = useState(0);
  const [courses, setCourses] = useState([]);

  useEffect(
    function () {
      async function loadApp() {
        const coursesRes = await axiosGuestInstance.get(
          `/courses?query=${store.query}&sortBy=view:desc&limit=${limit}`,
        );
        setTotalCourses(coursesRes.data.totalResults);
        setTotalPages(coursesRes.data.totalPages);
        setCourses(coursesRes.data.results);
      }
      loadApp();
    },
    [limit, store.query, store.selectedSubCategory.id],
  );

  const handlePageChange = async function (event, value) {
    setPage(value);
    const coursesRes = await axiosGuestInstance.get(
      `/courses?query=${store.query}&sortBy=view:desc&limit=${limit}&page=${value}`,
    );
    setCourses(coursesRes.data.results);
  };

  const handleLimitChange = async function (e) {
    setLimit(e.target.value);
    setPage(1);
    const coursesRes = await axiosGuestInstance.get(
      `/courses?query=${store.query}&sortBy=view:desc&limit=${
        e.target.value
      }&page=${1}`,
    );
    setTotalCourses(coursesRes.data.totalResults);
    setTotalPages(coursesRes.data.totalPages);
    setCourses(coursesRes.data.results);
  };

  const ResultWidget = function () {
    if (courses.length > 0) {
      return (
        <div>
          <Grid container xs={12} style={{ padding: '20px 40px 40px 60px' }}>
            <Grid item xs={3}>
              <div style={{ padding: '0px 30px' }}>Lọc filter sort</div>
            </Grid>
            <Grid item xs={9}>
              <Grid container spacing={1}>
                {courses.map(course => (
                  <Grid item justifyContent="center" xs={4}>
                    <CourseCard
                      course={course}
                      style={{ margin: '0px 20px' }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
          <div
            style={{
              marginRight: '30px',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row-reverse',
            }}
          >
            <Pagination
              count={totalPages}
              page={page}
              color="primary"
              variant="outlined"
              shape="rounded"
              onChange={handlePageChange}
            />
            <div
              style={{
                marginRight: '70px',
                marginLeft: '30px',
                color: '#525252',
              }}
            >
              Items in page
            </div>
            <Select
              style={{ padding: '0px 20px' }}
              labelId="demo-simple-select-outlined-label"
              id="limit"
              value={limit}
              onChange={handleLimitChange}
              required
            >
              <option
                value={6}
                style={{ marginBottom: '10px', margin: '10px 30px' }}
              >
                6
              </option>
              <option
                value="9"
                style={{ marginBottom: '10px', margin: '10px 30px' }}
              >
                9
              </option>
              <option
                value="12"
                style={{ marginBottom: '10px', margin: '10px 30px' }}
              >
                12
              </option>
            </Select>
          </div>
        </div>
      );
    } else {
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            marginBottom: '30px',
          }}
        >
          <img src={searchingImage} alt="icon" width="25%" />
          <h1>Ops!... no results found</h1>
          <div style={{ color: '#525252', fontWeight: 'lighter' }}>
            Please try another search
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <TopBar initQuery={store.query} />
      <h1 style={{ margin: '20px 40px 5px', color: '#525252' }}>
        {totalCourses} courses for "{store.query}"
      </h1>
      {ResultWidget()}
      {/* </div> */}
      <Footer />
    </>
  );
}
