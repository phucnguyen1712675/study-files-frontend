import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CardContent, CardMedia, makeStyles } from '@material-ui/core';
import { EventNoteSharp } from '@material-ui/icons';
import ReactStars from 'react-rating-stars-component';
import AppContext from 'app/AppContext';
import TopBar from '../../components/Topbar/Topbar';
import Footer from '../../components/Footer/Footer';

import { CourseCard, CategoryCard } from '../../components/Cards/Cards';

const useStyles = makeStyles(theme => ({
  card: {
    backgroundColor: '#030f2e',
    color: '#fafafa',
    width: '100%',
    height: '100%',
    display: 'flex',
    borderRadius: '3px',
    flexDirection: 'row',
  },
  cardMedia: {
    borderRadius: '3px',
    border: '2px solid #fafafa',
    height: '360px',
    width: '100%',
  },
  cardContent: {
    paddingTop: '5px',
    flexGrow: 1,
  },
  bigText: {
    fontSize: 24,
    fontWeight: 'bolder',
  },
  smallText: {
    fontSize: 14,
    fontWeight: 'light',
  },
  normalText: {
    fontSize: 18,
  },
  smallTextPotiner: {
    fontSize: 14,
    fontWeight: 'light',
    color: '#387cff',
    textDecorationLine: 'underline',
    cursor: 'pointer',
  },
  cardRatingText: {
    fontSize: 16,
    fontWeight: 'bolder',
    fontFamily: 'Roboto',
    color: '#F9BA00',
    marginRight: '8px',
  },
}));

export default function CourseDetailPage() {
  const { store } = useContext(AppContext);
  const classes = useStyles();
  const location = useLocation();
  const course = location.state.course;
  const [videos, setVideos] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [feedbacks, setFeedBacks] = useState([]);
  const [study, setStudy] = useState(false);
  const [like, isLike] = useState(false);

  const NavigateToTeacherPage = function () {
    // TODO navigatet to teacher page
  };

  const NavigateToCategoryCousesListPage = function () {
    // TODO navigate to category list course
    // dispatch({
    //   type: 'update_selectedCategory',
    //   payload: {
    //     selectedSubCategory: subCategory,
    //   },
    // });
    // const temp = categoryName.replaceAll(' ', '-');
    // const temp2 = subCategory.name.replaceAll(' ', '-');
    // history.push(`/category/${temp}/${temp2}`);
  };

  const RatingStarsWidget = function () {
    const thirdExample = {
      size: 20,
      count: 5,
      edit: false,
      value: course.rating,
      isHalf: true,
      activeColor: '#F9BA00',
    };
    return <ReactStars {...thirdExample} />;
  };

  const FormatNumberText = function (num) {
    if (num >= 1000) return `${Math.floor(num / 1000)}.${num % 1000}`;
    else return `${num}`;
  };

  const FormatDateText = function (date) {
    let d = new Date(date);
    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    return `${da}-${mo}-${ye}`;
  };

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

  const IsSpecialCourse = function () {
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
          className={classes.smallCard}
          style={{
            display: 'inline-block',
            padding: '1.5px 3px',
            backgroundColor: '#FFC107',
            color: '#ffffff',
            fontSize: 13,
            borderRadius: '3px',
            fontWeight: 'lighter',
          }}
        >
          {str}
        </div>
      );
    } else return <></>;
  };

  const ButtonWatchListWidget = function () {};

  const ButtonAddMycourseWidget = function () {};

  const MainInfoWidget = function () {
    return (
      <div className={classes.card}>
        <CardContent className={classes.cardContent}>
          <div style={{ padding: '40px 40px 40px' }}>
            <h1>{course.name}</h1>
            <div className={classes.normalText}>{course.shortDescription}</div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className={classes.cardRatingText}>{course.rating}</div>
              <div style={{ marginRight: '10px', marginTop: '0px' }}>
                {RatingStarsWidget()}
              </div>
              <div
                className={classes.smallText}
                style={{ marginRight: '30px' }}
              >
                ( {FormatNumberText(course.ratingCount)} ratings),
              </div>
              <div
                className={classes.smallText}
                style={{ marginRight: '30px' }}
              >
                {FormatNumberText(course.subscriberNumber)} participants
              </div>
              {IsSpecialCourse()}
            </div>
            <div
              className={classes.smallText}
              style={{ display: 'flex', directionFlow: 'row' }}
            >
              Created by
              <div
                onClick={NavigateToTeacherPage}
                className={classes.smallTextPotiner}
                style={{ marginLeft: '5px', marginRight: '5px' }}
              >
                {course.teacher.name},
              </div>
              <div
                onClick={NavigateToCategoryCousesListPage}
                className={classes.smallTextPotiner}
                style={{ marginLeft: '5px' }}
              >
                {course.subCategory.name}
              </div>
            </div>
            <div
              className={classes.smallText}
              style={{
                marginTop: '7px',
                display: 'flex',
                directionFlow: 'row',
              }}
            >
              <EventNoteSharp style={{ marginRight: '8px', fontSize: 18 }} />
              Last updated {FormatDateText(course.updated_at)}
            </div>
          </div>
        </CardContent>
        <CardMedia className={classes.cardMedia} image={course.image} />
      </div>
    );
  };

  const DetailDescriptionWidget = function () {
    return <></>;
  };

  const VideosWidget = function () {
    return <></>;
  };

  const TeacherInfoWidget = function () {
    return <></>;
  };

  const RatingListWidget = function () {
    return <></>;
  };

  const Top5CourseOfSameTeacher = function () {
    return <></>;
  };

  const TopFiveBestSaleCourses = function () {
    return <></>;
  };

  return (
    <>
      <TopBar initQuery={''} />
      {MainInfoWidget()}
      <Footer />
    </>
  );
}
