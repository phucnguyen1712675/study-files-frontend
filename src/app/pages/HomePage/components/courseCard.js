import React, { useContext, useState } from 'react';
import {
  Grid,
  CardContent,
  CardMedia,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import {
  Favorite,
  FavoriteBorder,
  AddShoppingCart,
  ShoppingCart,
} from '@material-ui/icons';
import ReactStars from 'react-rating-stars-component';
import ToggleIcon from 'material-ui-toggle-icon';
import AppContext from 'app/AppContext';

const useStyles = makeStyles(theme => ({
  heroButtons: {
    marginTop: '3px',
  },
  card: {
    width: '300px',
    height: '100%',
    display: 'flex',
    paddingLeft: '0px',
    borderRadius: '3px',
    flexDirection: 'column',
    cursor: 'pointer',
    margin: '20px',
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
    fontSize: 14,
    fontWeight: 'bolder',
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
}));

export function CourseCard({ course }) {
  const classes = useStyles();
  const { store } = useContext(AppContext);

  const [isLike, setIsLike] = useState(false);
  const [isAdd, setIsAdd] = useState(false);

  const FeeWidget = function () {
    const promotionEndDate = new Date(course.promotionEnd);
    // TODO update thêm promotionStartDate
    const promotionStartDate = new Date(course.promotionStart);
    const dateNow = new Date();
    if (dateNow > promotionEndDate && dateNow > promotionStartDate) {
      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className={classes.cardTittle} style={{ marginRight: '18px' }}>
            {course.fee} $US
          </div>
          <div
            className={classes.cardSmallText}
            style={{ textDecoration: 'line-through' }}
          >
            {course.originalFee} $US
          </div>
        </div>
      );
    } else {
      return <div className={classes.cardTittle}>{course.originalFee} $US</div>;
    }
  };

  const RatingStarsWidget = function () {
    const thirdExample = {
      size: 20,
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
          maxWidth: '80%',
          marginTop: '5px',
          fontWeight: 'lighter',
        }}
      >
        {course.subCategory.name}
      </div>
    );
  };

  const IsSpecialCourse = function () {
    var str = '';
    const bestSellerCourses = store.bestSellerCourses;
    const latestCourses = store.latestCourses;
    console.log(bestSellerCourses);
    console.log(latestCourses);

    for (const item1 of bestSellerCourses) {
      console.log(item1);
      if (item1.id === course.id) {
        str = 'Best sale';
        break;
      }
    }
    for (const item2 of store.latestCourses) {
      if (item2.id === course.id) {
        if (str !== '') {
          str = str + ', ';
        }
        str = str + 'Latest';
        break;
      }
    }
    if (str !== '') {
      console.log(str);
      return (
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
      );
    } else return <></>;
  };

  const ButtomLikeWidget = function () {
    // TODO trang get WatchList in homepageReducer
    return (
      <IconButton
        onClick={() => {
          // TODO hàm add to Watch list
          setIsLike(!isLike);
        }}
        style={{
          marginRight: '20px',
          border: '1px solid #0049d4',
          borderRadius: '50%',
          padding: '5px',
        }}
      >
        <ToggleIcon
          style={{ color: '#0049d4' }}
          on={isLike}
          onIcon={<Favorite />}
          offIcon={<FavoriteBorder />}
        />
      </IconButton>
    );
  };

  const AddMyCourse = function () {
    // TODO trang get MyCourses in homepageReducer
    return (
      <IconButton
        onClick={() => {
          if (!isAdd) {
            // TODO hàm add to my Course
            setIsAdd(!isAdd);
          }
        }}
        style={{
          marginRight: '20px',
          border: '1px solid #eba800',
          borderRadius: '50%',
          padding: '5px',
        }}
      >
        <ToggleIcon
          style={{ color: '#eba800' }}
          on={isAdd}
          onIcon={<ShoppingCart />}
          offIcon={<AddShoppingCart />}
        />
      </IconButton>
    );
  };

  const BottomCardWidget = function () {
    return (
      <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
        {ButtomLikeWidget()}
        {AddMyCourse()}
        {IsSpecialCourse()}
      </div>
    );
  };

  return (
    <div
      className={classes.card}
      onClick={() => {
        console.log(course.id);
      }}
    >
      <CardMedia className={classes.cardMedia} image={course.image} />
      <CardContent className={classes.cardContent}>
        <div className={classes.cardTittle}>{course.name}</div>
        <div className={classes.cardSmallText}>{course.teacher.name}</div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className={classes.cardRatingText}>{course.rating}</div>
          <div style={{ marginRight: '10px' }}>{RatingStarsWidget()}</div>
          <div className={classes.cardSmallText}>{subScriberNumberText()}</div>
        </div>
        {FeeWidget()}
        {SubCategoryWidget()}
        {BottomCardWidget()}
      </CardContent>
    </div>
  );
}
