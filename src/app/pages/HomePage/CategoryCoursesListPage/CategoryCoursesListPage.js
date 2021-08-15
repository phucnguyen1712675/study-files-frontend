import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import '@brainhubeu/react-carousel/lib/style.css';
import { Grid, Select } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { Result, Button, Spin } from 'antd';
import { FrownOutlined } from '@ant-design/icons';

import PageLayoutWrapper from '../../../components/features/teacher/page_layout_wrapper';
import { CourseCard } from '../../../components/Cards/Cards';
import SubCategoryTabs from '../components/SubCategoryTabs';
import TopBar from '../../../components/Topbar/Topbar';
import Footer from '../../../components/Footer/Footer';
import { axiosGuestInstance } from '../../../../api/guest';
import AppContext from '../../../AppContext';

export default function CategoryCoursesListPage() {
  const location = useLocation();
  const history = useHistory();
  const selectedSubCategory = location.state.selectedSubCategory;
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [totalCourses, setTotalCourses] = useState(0);
  const [courses, setCourses] = useState([]);

  useEffect(
    function () {
      async function loadApp() {
        setLoading(true);
        const coursesRes = await axiosGuestInstance.get(
          `/courses?sortBy=view:desc&limit=${limit}&subCategoryId=${selectedSubCategory.id}`,
        );
        setTotalCourses(coursesRes.data.totalResults);
        setTotalPages(coursesRes.data.totalPages);
        setCourses(coursesRes.data.results);
        setPage(1);
        setLoading(false);

        const unlisten = history.listen(() => {
          window.scrollTo(0, 0);
        });

        return () => {
          unlisten();
        };
      }
      loadApp();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [limit, selectedSubCategory.id],
  );

  const { store } = useContext(AppContext);

  const hasAtLeastOneCourse = store.latestCourses.some(
    course => course.subCategoryId === selectedSubCategory.id,
  );

  if (!hasAtLeastOneCourse) {
    return (
      <PageLayoutWrapper>
        <div
          style={{
            width: '100%',
            height: '80vh',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Result
            icon={<FrownOutlined />}
            title="Sorry, this sub-category has no course yet!"
            extra={
              <Button type="primary" href={process.env.PUBLIC_URL + '/'}>
                Return to Home Page
              </Button>
            }
          />
        </div>
      </PageLayoutWrapper>
    );
  }

  const handlePageChange = async function (event, value) {
    setPage(value);
    const coursesRes = await axiosGuestInstance.get(
      `/courses?sortBy=view:desc&limit=${limit}&page=${value}&subCategoryId=${selectedSubCategory.id}`,
    );
    setCourses(coursesRes.data.results);
  };

  const handleLimitChange = async function (e) {
    setLimit(e.target.value);
    setPage(1);
    const coursesRes = await axiosGuestInstance.get(
      `/courses?sortBy=view:desc&limit=${
        e.target.value
      }&page=${1}&subCategoryId=${selectedSubCategory.id}`,
    );
    setTotalCourses(coursesRes.data.totalResults);
    setTotalPages(coursesRes.data.totalPages);
    setCourses(coursesRes.data.results);
  };

  return (
    <>
      <TopBar initQuery={''} />
      <div style={{ margin: '20px' }}>
        {
          <SubCategoryTabs
            subCategory={selectedSubCategory}
            isNavigate={false}
          />
        }
      </div>
      <h2 style={{ margin: '20px 20px 5px', color: '#525252' }}>
        {totalCourses} courses in {selectedSubCategory.name}
      </h2>
      {loading ? (
        <div
          style={{
            width: '100%',
            minHeight: '70vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Spin />
        </div>
      ) : (
        <>
          <div style={{ padding: '20px 40px 40px 60px' }}>
            <Grid container xs={12} spacing={3} justifyContent="center">
              {courses.map(course => (
                <Grid item xs={3} key={course.id}>
                  <CourseCard course={course} />
                </Grid>
              ))}
            </Grid>
            <div
              style={{
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
                  value={8}
                  style={{ marginBottom: '10px', margin: '10px 30px' }}
                >
                  8
                </option>
                <option
                  value="12"
                  style={{ marginBottom: '10px', margin: '10px 30px' }}
                >
                  12
                </option>
                <option
                  value="16"
                  style={{ marginBottom: '10px', margin: '10px 30px' }}
                >
                  16
                </option>
              </Select>
            </div>
          </div>
        </>
      )}

      <Footer />
    </>
  );
}
