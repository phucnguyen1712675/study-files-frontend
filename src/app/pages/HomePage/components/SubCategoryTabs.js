import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Tabs, Tab, Box } from '@material-ui/core';
import Carousel, { slidesToShowPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import AppContext from '../../../AppContext';
import { CourseCard } from '../../../components/Cards/Cards';
import { axiosGuestInstance } from '../../../../api/guest';

const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#525252',
  },
})(Tabs);

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
}))(props => <Tab disableRipple {...props} />);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <>{children}</>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    'aria-controls': `wrapped-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SubCategoryTabs({ subCategory, isNavigate }) {
  const classes = useStyles();
  const history = useHistory();

  const { store, dispatch } = useContext(AppContext);
  const [value, setValue] = useState('two');
  const [bestSellerCourses, setBestSellerCourses] = useState([]);
  const [mostViewCourses, setMostViewCourses] = useState([]);

  useEffect(function () {
    async function loadApp() {
      const mostViewCoursesRes = await axiosGuestInstance.get(
        `/courses?sortBy=view:desc&limit=10&subCategoryId=${subCategory.id}`,
      );
      const bestSellerCoursesRes = await axiosGuestInstance.get(
        `/courses?sortBy=subscriberNumber:desc&limit=10&subCategoryId=${subCategory.id}`,
      );
      setMostViewCourses(mostViewCoursesRes.data.results);
      setBestSellerCourses(bestSellerCoursesRes.data.results);
    }
    loadApp();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const LatestCousesCarousel = function () {
    return (
      <Carousel
        plugins={[
          'arrows',
          {
            resolve: slidesToShowPlugin,
            options: {
              numberOfSlides: 4,
            },
          },
        ]}
      >
        {store.latestCourses
          .filter(course => course.subCategoryId === subCategory.id)
          .map(course => (
            <CourseCard course={course} />
          ))}
      </Carousel>
    );
  };

  const MostViewCarousel = function () {
    return (
      <Carousel
        plugins={[
          'arrows',
          {
            resolve: slidesToShowPlugin,
            options: {
              numberOfSlides: 4,
            },
          },
        ]}
      >
        {mostViewCourses.map(course => (
          <CourseCard course={course} />
        ))}
      </Carousel>
    );
  };

  const BestSellerCarousel = function () {
    return (
      <Carousel
        plugins={[
          'arrows',
          {
            resolve: slidesToShowPlugin,
            options: {
              numberOfSlides: 4,
            },
          },
        ]}
      >
        {bestSellerCourses.map(course => (
          <CourseCard course={course} />
        ))}
      </Carousel>
    );
  };

  const handleClick = function () {
    if (isNavigate === true) {
      dispatch({
        type: 'update_selectedCategory',
        payload: {
          selectedSubCategory: subCategory,
        },
      });
      const temp = subCategory.category.name.replaceAll(' ', '-');
      const temp2 = subCategory.name.replaceAll(' ', '-');
      history.push(`/${temp}/${temp2}`);
    }
  };

  return (
    <>
      <div>
        <h2
          onClick={handleClick}
          style={{
            margin: '20px 20px 5px',
            color: '#525252',
            cursor: 'pointer',
          }}
        >
          {subCategory.name}
        </h2>
        <div className={classes.root}>
          <AntTabs
            value={value}
            onChange={handleChange}
            aria-label="wrapped label tabs example"
          >
            <AntTab
              value="one"
              label="Best seller"
              wrapped
              {...a11yProps('one')}
            />
            <AntTab value="two" label="Latest" {...a11yProps('two')} />
            <AntTab value="three" label="Most view" {...a11yProps('three')} />
          </AntTabs>

          <TabPanel value={value} index="one">
            {BestSellerCarousel()}
          </TabPanel>
          <TabPanel value={value} index="two">
            {LatestCousesCarousel()}
          </TabPanel>
          <TabPanel value={value} index="three">
            {MostViewCarousel()}
          </TabPanel>
        </div>
      </div>
    </>
  );
}
