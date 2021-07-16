import React, { useContext } from 'react';
import { CardContent, CardMedia, makeStyles } from '@material-ui/core';
import ReactStars from 'react-rating-stars-component';
import AppContext from 'app/AppContext';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  heroButtons: {
    marginTop: '3px',
  },
  card: {
    width: '330px',
    height: '100%',
    display: 'flex',
    paddingLeft: '0px',
    borderRadius: '3px',
    flexDirection: 'column',
    cursor: 'pointer',
    margin: '10px',
  },
  cardMedia: {
    borderRadius: '3px',
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    paddingLeft: '0px',
    padingRight: '0px',
    paddingTop: '5px',
    flexGrow: 1,
  },
  cardTittle: {
    fontSize: 16,
    fontWeight: 'bolder',
    color: '#525252',
  },
  cardSmallText: {
    fontSize: 13,
    fontWeight: 'lighter',
    fontFamily: 'Roboto',
    color: '#525252',
  },
  cardRatingText: {
    fontSize: 16,
    fontWeight: 'bolder',
    fontFamily: 'Roboto',
    color: '#F9BA00',
    marginRight: '8px',
  },
  smallCard: {
    borderRadius: '3px',
    padding: '1px 5px',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 1,
    overflow: 'hidden',
  },
  categoryCard: {
    height: '80px',
    width: '250px',
    paddingRight: '10px',
    paddingLeft: '10px',
    verticalAlign: 'center',
    margin: '10px 20px',
    fontWeight: 'bolder',
    textAlign: 'center',
    fontSize: 16,
    color: '#387CFF',
    border: '1px solid #387CFF',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export function CourseCard({ course }) {
  const classes = useStyles();
  const history = useHistory();
  const { store } = useContext(AppContext);

  const FeeWidget = function () {
    const promotionEndDate = new Date(course.promotionEnd);
    const promotionStartDate = new Date(course.promotionStart);
    const dateNow = new Date();
    if (dateNow > promotionEndDate && dateNow > promotionStartDate) {
      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            className={classes.cardTittle}
            style={{ marginRight: '18px', marginTop: '0px' }}
          >
            {course.fee} $US
          </div>
          <div
            className={classes.cardSmallText}
            style={{ textDecoration: 'line-through', marginTop: '0px' }}
          >
            {course.originalFee} $US
          </div>
        </div>
      );
    } else {
      return (
        <div className={classes.cardTittle} style={{ marginTop: '0px' }}>
          {course.originalFee} $US
        </div>
      );
    }
  };

  const RatingStarsWidget = function () {
    const thirdExample = {
      size: 23,
      count: 5,
      edit: false,
      value: course.rating,
      isHalf: true,
    };
    return <ReactStars {...thirdExample} />;
  };

  const subScriberNumberText = function () {
    if (course.subscriberNumber >= 1000)
      return `( ${Math.floor(course.subscriberNumber / 1000)}.${
        course.subscriberNumber % 1000
      } )`;
    else return `( ${course.subscriberNumber} )`;
  };

  const SubCategoryWidget = function () {
    return (
      <div
        className={classes.smallCard}
        style={{
          backgroundColor: '#76A5FF',
          color: '#ffffff',
          fontSize: 13,
          maxWidth: '100%',
          marginTop: '8px',
          fontWeight: 'lighter',
        }}
      >
        {course.subCategory.name}
      </div>
    );
  };

  const IsSpecialCourseWithFee = function () {
    var str = '';

    for (const item1 of store.bestSellerCourses) {
      if (item1.id === course.id) {
        str = 'Best sale';
        break;
      }
    }
    for (const item2 of store.latestCourses) {
      if (item2.id === course.id) {
        if (str !== '') {
          str = str + ' - ';
        }
        str = str + 'Latest';
        break;
      }
    }
    if (str !== '') {
      return (
        <div
          style={{ marginTop: '0px', display: 'flex', alignItems: 'center' }}
        >
          {FeeWidget()}
          <div
            className={classes.smallCard}
            style={{
              display: 'inline-block',
              backgroundColor: '#FFC107',
              color: '#ffffff',
              fontSize: 13,
              marginLeft: 'auto',
              fontWeight: 'lighter',
            }}
          >
            {str}
          </div>
        </div>
      );
    } else return <div style={{ marginTop: '0px' }}>{FeeWidget()}</div>;
  };

  const NavigateToDetailCourses = function () {
    // TODO navigate to detail course
    history.push(`/course/${course.name}`, { course: course });
  };

  return (
    <div className={classes.card} onClick={() => NavigateToDetailCourses()}>
      <CardMedia className={classes.cardMedia} image={course.image} />
      <CardContent className={classes.cardContent}>
        <div className={classes.cardTittle} style={{ marginTop: '8px' }}>
          {course.name}
        </div>
        <div className={classes.cardSmallText} style={{ marginTop: '8px' }}>
          {course.teacher.name}
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className={classes.cardRatingText}>{course.rating}</div>
          <div style={{ marginRight: '10px', marginTop: '0px' }}>
            {RatingStarsWidget()}
          </div>
          <div className={classes.cardSmallText}>{subScriberNumberText()}</div>
        </div>
        {IsSpecialCourseWithFee()}
        {SubCategoryWidget()}
      </CardContent>
    </div>
  );
}

export function CourseCardNotFound() {
  const classes = useStyles();

  return (
    <div className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        image={`https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png`}
      />
      <CardContent
        className={classes.cardContent}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          marginBottom: '30px',
        }}
      >
        <div className={classes.cardTittle}>Course not found</div>
        <div className={classes.cardSmallText} style={{ marginTop: '8px' }}>
          Maybe admin deleted it :( ?
        </div>
      </CardContent>
    </div>
  );
}

export function CategoryCard({ category }) {
  const classes = useStyles();
  const { dispatch } = useContext(AppContext);
  const history = useHistory();
  const NavigateToCategoryCousesListPage = function () {
    dispatch({
      type: 'update_selectedCategory',
      payload: {
        selectedSubCategory: category,
      },
    });
    const temp = category.category.name.replaceAll(' ', '-');
    const temp2 = category.name.replaceAll(' ', '-');
    history.push(`/category/${temp}/${temp2}`);
  };

  return (
    <div
      className={classes.categoryCard}
      onClick={() => NavigateToCategoryCousesListPage()}
    >
      <span>{category.name}</span>
    </div>
  );
}
