import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AppContext from '../../../AppContext';
import { axiosGuestInstance } from '../../../../api/guest';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Select,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import { ExpandMore } from '@material-ui/icons';
import { Pagination } from '@material-ui/lab';

import searchingImage from '../../../../images/searching.png';
import { CourseCard } from '../../../components/Cards/Cards';
import TopBar from '../../../components/Topbar/Topbar';
import Footer from '../../../components/Footer/Footer';

const Accordion = withStyles({
  root: {
    border: '0px 0px 1px 0px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

export default function SearchPage() {
  const { store } = useContext(AppContext);
  const location = useLocation();
  const query = location.state.query;
  const [expanded, setExpanded] = useState(false);
  const [smallExpanded, setSmallExpanded] = useState(false);
  const [sort, setSort] = useState('');
  const [category, setCategory] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [totalCourses, setTotalCourses] = useState(0);
  const [courses, setCourses] = useState([]);

  const UrlRequestAPI = function (_limit, _page, _sort, _category) {
    var strRequest = `/courses?query=${query}&limit=${_limit}&page=${_page}`;
    if (_sort !== '') {
      var sortOption = 'desc';
      if (_sort === 'fee') sortOption = 'asc';
      strRequest = strRequest + `&sortBy=${_sort}:${sortOption}`;
    }
    if (_category !== '') {
      strRequest = strRequest + `&subCategoryId=${_category}`;
    }
    return strRequest;
  };

  useEffect(
    function () {
      async function LoadApp() {
        const requestStr = UrlRequestAPI(limit, page, sort, category);
        const coursesRes = await axiosGuestInstance.get(requestStr);
        setTotalCourses(coursesRes.data.totalResults);
        setTotalPages(coursesRes.data.totalPages);
        setCourses(coursesRes.data.results);
      }
      LoadApp();
    },
    [limit, query, page, limit, sort, category],
  );

  const handlePageChange = async function (event, value) {
    setPage(value);
  };

  const handleLimitChange = async function (e) {
    setLimit(e.target.value);
    setPage(1);
  };

  const handleExpandedChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleSmallExpandedChange = panel => (event, isExpanded) => {
    setSmallExpanded(isExpanded ? panel : false);
  };

  const handleSortChange = async function (event) {
    setSort(event.target.value);
    setPage(1);
  };

  const handleCategoryChange = async function (event) {
    setCategory(event.target.value);
    setPage(1);
  };

  const CategoryRadioGroupWidget = function () {
    return (
      <div>
        {store.categories.map(category => (
          <Accordion
            key={category.id}
            expanded={smallExpanded === `panel${category.id}`}
            onChange={handleSmallExpandedChange(`panel${category.id}`)}
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              {category.name}
            </AccordionSummary>
            <AccordionDetails>
              <div>
                {store.subCategories
                  .filter(subCategory => subCategory.categoryId === category.id)
                  .map(subCategory => (
                    <FormControlLabel
                      key={subCategory.id}
                      value={subCategory.id}
                      control={<Radio color="primary" />}
                      label={subCategory.name}
                    />
                  ))}
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    );
  };

  const SortFilterWidget = function () {
    return (
      <div style={{ padding: '10px 30px 0px 0px' }}>
        <Accordion
          expanded={expanded === 'panel1'}
          onChange={handleExpandedChange('panel1')}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <div style={{ color: '#387cff' }}>Sort by</div>
          </AccordionSummary>
          <AccordionDetails>
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={sort}
              onChange={handleSortChange}
            >
              <FormControlLabel
                value=""
                control={<Radio color="primary" />}
                label="none"
              />
              <FormControlLabel
                value="rating"
                control={<Radio color="primary" />}
                label="Rating"
              />
              <FormControlLabel
                value="fee"
                control={<Radio color="primary" />}
                label="Fee"
              />
              <FormControlLabel
                value="view"
                control={<Radio color="primary" />}
                label="View"
              />
              <FormControlLabel
                value="subscriberNumber"
                control={<Radio color="primary" />}
                label="subscriber"
              />
            </RadioGroup>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel2'}
          onChange={handleExpandedChange('panel2')}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <div style={{ color: '#387cff' }}>Categories</div>
          </AccordionSummary>
          <AccordionDetails>
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={category}
              onChange={handleCategoryChange}
            >
              <FormControlLabel
                value=""
                control={<Radio color="primary" />}
                label="All"
              />
              {CategoryRadioGroupWidget()}
            </RadioGroup>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  };

  const ResultAndSortAndFilterWidget = function () {
    if (courses.length > 0) {
      return (
        <div>
          <Grid container xs={12} style={{ padding: '20px 40px 40px 40px' }}>
            <Grid item xs={3}>
              {SortFilterWidget()}
            </Grid>
            <Grid item xs={9}>
              <Grid container spacing={1}>
                {courses.map(course => (
                  <Grid item justifyContent="center" xs={4}>
                    <CourseCard
                      key={course.id}
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
      <TopBar initQuery={query} />
      <h1 style={{ margin: '20px 40px 5px', color: '#525252' }}>
        {totalCourses} courses for "{store.query}"
      </h1>
      {ResultAndSortAndFilterWidget()}
      <Footer />
    </>
  );
}
