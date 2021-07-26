import React, { useContext } from 'react';
import { CardContent, CardMedia, makeStyles, Avatar } from '@material-ui/core';
import ReactStars from 'react-rating-stars-component';
import AppContext from 'app/AppContext';
import { useHistory } from 'react-router-dom';
import { Image } from 'cloudinary-react';
import userAvatar from 'images/user.jpg';

const useStyles = makeStyles(theme => ({
  heroButtons: {
    marginTop: '3px',
  },
  card: {
    width: '330px',
    height: '100%',
    display: 'flex',
    borderRadius: '3px',
    padding: '0px 20px',
    flexDirection: 'column',
    cursor: 'pointer',
  },
  cardMedia: {
    borderRadius: '3px',
    // paddingTop: '56.25%', // 16:9
    height: '160px',
    width: '285px',
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
    if (dateNow < promotionEndDate && dateNow > promotionStartDate) {
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
    history.push(`/course/${course.name}`, { course: course });
  };

  return (
    <div className={classes.card} onClick={() => NavigateToDetailCourses()}>
      {/* <CardMedia className={classes.cardMedia} image={course.image} /> */}
      <div className={classes.cardMedia}>
        <Image
          className={classes.cardMedia}
          cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
          publicId={course.image}
        />
      </div>
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
    history.push(`/category/${temp}/${temp2}`, {
      selectedSubCategory: category,
    });
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

export function RatingCard({ rating, feedBack }) {
  const FormatDateText = function (date) {
    let d = new Date(date);
    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    return `${da}-${mo}-${ye}`;
  };

  const RatingStarsWidget = function (score) {
    const thirdExample = {
      size: 23,
      count: 5,
      edit: false,
      value: score,
      isHalf: true,
    };
    return <ReactStars {...thirdExample} />;
  };

  const ReplyWidget = function () {
    if (feedBack !== null) {
      return (
        <div
          style={{
            // marginLeft: '100px',
            marginTop: '10px',
            paddingLeft: '20px',
            color: '#525252',
            borderLeft: '2px solid #cecece',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: '10px',
            }}
          >
            <Avatar
              alt="Remy Sharp"
              src={feedBack.teacher.avatar}
              style={{ width: '60px', height: '60px', marginRight: '20px' }}
            />
            <div>
              <div style={{ fontWeight: 'bolder' }}>
                {feedBack.teacher.name}
              </div>
              <div
                style={{
                  fontWeight: 'lighter',
                  marginTop: '5px',
                  color: '#b3b3b3',
                  fontSize: 13,
                }}
              >
                Replied at {FormatDateText(feedBack.created_at)}
              </div>
            </div>
          </div>
          <div style={{ marginTop: '10px' }}>{feedBack.content}</div>
        </div>
      );
    } else return <></>;
  };

  return (
    <div
      style={{
        padding: '30px 0px',
        color: '#525252',
        borderBottom: '1px solid #cecece',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Avatar
          alt="Remy Sharp"
          src={userAvatar}
          style={{ width: '60px', height: '60px', marginRight: '20px' }}
        />
        <div>
          <div style={{ marginRight: '30px', fontWeight: 'bolder' }}>
            {rating.student.name}
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <div>{RatingStarsWidget(rating.score)}</div>
            <div
              style={{
                fontWeight: 'lighter',
                marginLeft: '5px',
                color: '#b3b3b3',
                fontSize: 13,
              }}
            >
              Rated at {FormatDateText(rating.created_at)}
            </div>
          </div>
          {rating.content === '' ? (
            <div style={{ color: '#b3b3b3' }}>No comment ...</div>
          ) : (
            <div>{rating.content}</div>
          )}
          {ReplyWidget()}
        </div>
      </div>
    </div>
  );
}
