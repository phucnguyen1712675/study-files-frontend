import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Spin } from 'antd';
import ShowMore from 'react-show-more-list';
import ShowMoreText from 'react-show-more-text';
import DOMPurify from 'dompurify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {
  Button,
  CardContent,
  makeStyles,
  Avatar,
  TextField,
  CardMedia,
} from '@material-ui/core';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import { ExpandMore } from '@material-ui/icons';
import {
  EventNoteSharp,
  NewReleases,
  FavoriteBorder,
  Favorite,
  AddShoppingCart,
  ShoppingCart,
  AllInboxSharp,
  LastPageSharp,
} from '@material-ui/icons';
import Carousel, { slidesToShowPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import ReactStars from 'react-rating-stars-component';
import AppContext from 'app/AppContext';
import { axiosGuestInstance } from '../../../api/guest';
import { AccessToken } from 'api/auth';
import TopBar from '../../components/Topbar/Topbar';
import Footer from '../../components/Footer/Footer';
import userAvatar from 'images/user.jpg';
import { SectionList } from './components/SectionList';
import { CourseCard, RatingCard } from '../../components/Cards/Cards';
import { NotFoundPage } from 'app/pages/NotFoundPage/Loadable';
import { getTeacherProfilePagePath } from '../../../constants/routes';
import { checkIfTeacherExists } from '../../../features/guest/guestAPI';

const Accordion = withStyles({
  root: {
    width: '100%',
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
    fontWeight: 'bolder',
    color: '#387cff',
    minHeight: 40,
    '&$expanded': {
      minHeight: 40,
    },
  },
  content: {
    '&$expanded': {
      margin: '0px 0px',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    width: '100%',
  },
}))(MuiAccordionDetails);

const useStyles = makeStyles(theme => ({
  card: {
    backgroundColor: '#030f2e',
    color: '#fafafa',
    width: '100%',
    display: 'flex',
    borderRadius: '3px',
    flexDirection: 'row',
  },
  cardMedia: {
    borderRadius: '3px',
    border: '2px solid #fafafa',
    width: '50%',
  },
  cardContent: {
    paddingTop: '5px',
    width: '50%',
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
  shadowCard: {
    width: '70%',
    borderRadius: '3px',
    border: '0.3px solid #cecece',
    padding: '40px',
    marginTop: '50px',
    WebkitBoxShadow: ' 5px -3px 7px -7px black',
    MozBoxShadow: ' 5px -3px 7px -7px black',
    boxShadow: ' 5px -3px 7px -7px black',
  },
}));

export default function CourseDetailPage() {
  const { store, dispatch } = useContext(AppContext);
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const course = location.state.course;
  const [loading, setLoading] = useState(true);
  const [loadingStudy, setLoadingStudy] = useState(true);
  const [loadingLike, setLoadingLike] = useState(true);
  const [exist, setExist] = useState(true);
  const [thisTeacher, setThisTeacher] = useState(false);
  const [sections, setSections] = useState([]);
  const [rateInfo, setRateInfo] = useState({
    rating: course.rating,
    ratingCount: course.ratingCount,
  });
  const [ratings, setRatings] = useState([]);
  const [feedbacks, setFeedBacks] = useState([]);
  const [study, setStudy] = useState({ is: false, myCourseId: '' });
  const [like, setLike] = useState({ is: false, watchListId: '' });
  const [bestSaleCoursesOfTeacher, setBestSaleCoursesOfTeacher] = useState([]);
  const [
    bestSaleCoursesSameCategory,
    setBestSaleCoursesSameCategory,
  ] = useState([]);

  const [detailExpanded, setDetailExpanded] = useState(false);
  // rating for student
  const [myScoreRate, setMyScoreRate] = useState(1);
  const [myComment, setMyComment] = useState('');
  // reply for teacher
  const [replyWidgetExpanded, setReplyWidgetExpanded] = useState(false);

  useEffect(
    function () {
      async function loadApp() {
        try {
          setLoading(true);
          await axiosGuestInstance.get(`/courses/${course.id}`);
          loadAppLike();
          loadAppStudy();
          const ratingsRes = await axiosGuestInstance.get(
            `/ratings/${course.id}`,
          );
          setRatings(ratingsRes.data);
          const feedBackRes = await axiosGuestInstance.get(
            `/feedbacks/${course.id}`,
          );
          setFeedBacks(feedBackRes.data);

          // get best 5 coures of teacherId
          const bestSaleCoursesOfTeacherRes = await axiosGuestInstance.get(
            `/courses?teacherId=${course.teacher.id}&sortBy=subscriberNumber:desc&limit=5`,
          );
          setBestSaleCoursesOfTeacher(bestSaleCoursesOfTeacherRes.data.results);
          // get best 5 coures of subCategory
          const bestSaleCoursesSameCategoryRes = await axiosGuestInstance.get(
            `/courses?subCategoryId=${course.subCategory.id}&sortBy=subscriberNumber:desc&limit=5`,
          );
          setBestSaleCoursesSameCategory(
            bestSaleCoursesSameCategoryRes.data.results,
          );

          const sectionsRes = await axiosGuestInstance.get(
            `/courses/${course.id}/sections?courseId=${course.id}&limit=20`,
          );
          setSections([...sectionsRes.data.results]);
          if (
            localStorage.studyFiles_user_role === 'teacher' &&
            course.teacherId === localStorage.studyFiles_user_id
          ) {
            setThisTeacher(true);
          }
          setLoading(false);
          const unlisten = history.listen(() => {
            window.scrollTo(0, 0);
          });

          return () => {
            unlisten();
          };
        } catch {
          setExist(false);
        }
      }
      loadApp();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [course.id, course.subCategory.id],
  );

  useEffect(
    function () {
      loadAppStudy();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [store.myCourses, course],
  );

  useEffect(
    function () {
      loadAppLike();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [store.watchList, course],
  );

  const loadAppLike = async function () {
    setLoadingLike(true);
    setLike({
      ...like,
      is: false,
      watchListId: '',
    });

    try {
      await axiosGuestInstance.get(`/courses/${course.id}`);
      // check if student then get is study or like this course
      if (localStorage.studyFiles_user_role === 'student') {
        for (var watchList of store.watchList) {
          if (watchList.id === course.id) {
            setLike({
              ...like,
              is: true,
              watchListId: watchList.watchListId,
            });
            break;
          }
        }
      }
    } catch {
      setExist(false);
    }
    setLoadingLike(false);
  };

  const loadAppStudy = async function () {
    setLoadingStudy(true);
    setStudy({ ...study, is: false, myCourseId: '' });
    try {
      await axiosGuestInstance.get(`/courses/${course.id}`);
      if (localStorage.studyFiles_user_role === 'student') {
        for (var myCourse of store.myCourses) {
          if (myCourse.id === course.id) {
            setStudy({
              ...study,
              is: true,
              myCourseId: myCourse.myCourseId,
            });
            break;
          }
        }
      }
    } catch {
      setExist(false);
    }
    setLoadingStudy(false);
  };

  // function logic handle =======================================
  const NavigateToTeacherPage = async () => {
    const { id, name } = course.teacher;

    const isTeacherExists = await checkIfTeacherExists(id);

    if (!isTeacherExists) {
      history.push(process.env.PUBLIC_URL + '/notfound');
    } else {
      const param = name.toLowerCase().replaceAll(' ', '-');

      const path = getTeacherProfilePagePath(param);

      const state = {
        teacherId: id,
      };

      history.push(path, state);
    }
  };

  const NavigateToCategoryCousesListPage = function () {
    let categoryStr = '';
    for (var category of store.categories) {
      if (category.id === course.subCategory.categoryId) {
        categoryStr = category.name.replaceAll(' ', '-');
        break;
      }
    }
    const subCategoryStr = course.subCategory.name.replaceAll(' ', '-');
    history.push(`/category/${categoryStr}/${subCategoryStr}`, {
      selectedSubCategory: course.subCategory,
    });
  };

  const WatchListButtonClickHandle = async function () {
    if (!localStorage.studyFiles_user_role) {
      history.push('/login');
    } else if (localStorage.studyFiles_user_role !== 'student') {
      alert('Only student can do this task');
    } else {
      if (like.is) {
        try {
          await AccessToken();
          const config = {
            headers: {
              Authorization: `Bearer ${localStorage.studyFiles_user_accessToken}`,
            },
          };
          const res = await axiosGuestInstance.delete(
            `/student/watchList/${like.watchListId}`,
            config,
          );
          if (res.status === 204) {
            dispatch({
              type: 'delete_watch_list',
              payload: {
                watchListId: `${like.watchListId}`,
              },
            });
            // setLike({ ...like, is: false, watchListId: '' });
          } else {
            alert(res.data.message);
          }
        } catch (err) {
          if (err.response) {
            alert(err.response.data.message);
          }
        }
      } else {
        try {
          await AccessToken();
          const config = {
            headers: {
              Authorization: `Bearer ${localStorage.studyFiles_user_accessToken}`,
            },
          };
          const res = await axiosGuestInstance.post(
            '/student/watchList/',
            { courseId: course.id, studentId: localStorage.studyFiles_user_id },
            config,
          );
          if (res.status === 201) {
            const watchList = { ...course, watchListId: res.data.id };
            dispatch({
              type: 'add_watch_list',
              payload: {
                course: watchList,
              },
            });
            // setLike({ ...like, is: true, watchListId: res.data.id });
          } else {
            alert(res.data.message);
          }
        } catch (err) {
          if (err.response) {
            alert(err.response.data.message);
          }
        }
      }
    }
  };

  const MyCourseButtonClickHandle = async function () {
    if (!localStorage.studyFiles_user_role) {
      history.push('/login');
    } else if (localStorage.studyFiles_user_role !== 'student') {
      alert('Only student can do this task');
    } else if (`${localStorage.studyFiles_user_isVerified}` === 'false') {
      alert('Only student with verified email can do this task');
    } else {
      if (study.is) {
        try {
          await AccessToken();
          const config = {
            headers: {
              Authorization: `Bearer ${localStorage.studyFiles_user_accessToken}`,
            },
          };
          const res = await axiosGuestInstance.delete(
            `/student/myCourses/${study.myCourseId}`,
            config,
          );
          if (res.status === 204) {
            dispatch({
              type: 'delete_my_courses',
              payload: {
                myCourseId: `${study.myCourseId}`,
              },
            });
            // setStudy({ ...study, is: false, myCourseId: '' });
          } else {
            alert(res.data.message);
          }
        } catch (err) {
          if (err.response) {
            alert(err.response.data.message);
          }
        }
      } else {
        try {
          await AccessToken();
          const config = {
            headers: {
              Authorization: `Bearer ${localStorage.studyFiles_user_accessToken}`,
            },
          };
          const res = await axiosGuestInstance.post(
            '/student/myCourses/',
            { courseId: course.id, studentId: localStorage.studyFiles_user_id },
            config,
          );
          if (res.status === 201) {
            const myCourse = { ...course, myCourseId: res.data.id };
            dispatch({
              type: 'add_my_courses',
              payload: {
                course: myCourse,
              },
            });
            // setStudy({ ...study, is: true, myCourseId: res.data.id });
          } else {
            alert(res.data.message);
          }
        } catch (err) {
          if (err.response) {
            alert(err.response.data.message);
          }
        }
      }
    }
  };

  const createMarkup = html => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  const HandleRatingSubmit = async function () {
    const data = {
      studentId: localStorage.studyFiles_user_id,
      courseId: course.id,
      content: myComment,
      score: myScoreRate,
    };
    await AccessToken();
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.studyFiles_user_accessToken}`,
      },
    };
    try {
      const ratingsRes = await axiosGuestInstance.post(
        `/ratings/${course.id}`,
        data,
        config,
      );
      if (ratingsRes.status === 201) {
        setRatings([...ratings, ratingsRes.data]);
        let newRating =
          (rateInfo.rating * rateInfo.ratingCount + myScoreRate) /
          (rateInfo.ratingCount + 1);
        newRating = Math.round((newRating + Number.EPSILON) * 10) / 10;
        const newRatingCount = rateInfo.ratingCount + 1;
        dispatch({
          type: 'update_course_rating',
          payload: {
            courseId: course.id,
            rating: newRating,
            ratingCount: newRatingCount,
          },
        });

        setRateInfo({
          ...rateInfo,
          ratingCount: newRatingCount,
          rating: newRating,
        });
      } else {
        alert(ratingsRes.data.message);
      }
    } catch (err) {
      console.log(err);
      if (err.response) {
        alert(err.response.data.message);
      }
    }
  };

  const handleExpandedReplyWidgetChange = panel => (event, isExpanded) => {
    setReplyWidgetExpanded(isExpanded ? panel : false);
  };

  const HandleFeedBackSubmit = async function (ratingId) {
    if (myComment !== '') {
      const data = {
        teacherId: localStorage.studyFiles_user_id,
        courseId: course.id,
        content: myComment,
        ratingId: ratingId,
      };
      await AccessToken();
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.studyFiles_user_accessToken}`,
        },
      };
      try {
        const feedBacksRes = await axiosGuestInstance.post(
          `/feedbacks/${course.id}`,
          data,
          config,
        );
        if (feedBacksRes.status === 201) {
          setFeedBacks([...feedbacks, feedBacksRes.data]);
        }
      } catch (err) {
        if (err.response) {
          alert(err.response.data.message);
        }
      }
    }
  };

  // widget builder handle =======================================
  const RatingStarsWidget = function (size) {
    const valueRate = rateInfo.rating;
    const info = {
      size: size,
      count: 5,
      edit: false,
      value: valueRate,
      isHalf: true,
      activeColor: '#F9BA00',
    };
    return <ReactStars {...info} />;
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
    if (
      course.promotionStart &&
      course.promotionEnd &&
      course.fee !== course.originalFee
    ) {
      const promotionEndDate = new Date(course.promotionEnd);
      const promotionStartDate = new Date(course.promotionStart);
      const dateNow = new Date();
      if (dateNow < promotionEndDate && dateNow > promotionStartDate) {
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                className={classes.bigText}
                style={{ marginRight: '18px', marginTop: '0px' }}
              >
                {course.fee} $US
              </div>
              <div
                className={classes.smallText}
                style={{ textDecoration: 'line-through', marginTop: '0px' }}
              >
                {course.originalFee} $US
              </div>
            </div>
            <div
              className={classes.smallText}
              style={{
                display: 'flex',
                directionFlow: 'row',
                color: '#a80c14',
              }}
            >
              <NewReleases style={{ marginRight: '8px', fontSize: 18 }} />
              Promotion will end at {FormatDateText(course.promotionEnd)}
            </div>
          </div>
        );
      } else if (
        promotionStartDate < promotionEndDate &&
        dateNow < promotionStartDate
      ) {
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div className={classes.bigText}>{course.originalFee} $US</div>
            <div
              className={classes.smallText}
              style={{
                color: '#a80c14',
              }}
            >
              <NewReleases style={{ marginRight: '8px', fontSize: 18 }} />
              Promotion will start at {FormatDateText(
                course.promotionStart,
              )}{' '}
              with new fee
              <div style={{ fontWeight: 'bolder' }}> {course.fee} $US</div>
            </div>
          </div>
        );
      }
    }

    return (
      <div className={classes.bigText} style={{ marginTop: '0px' }}>
        {course.originalFee} $US
      </div>
    );
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

  const ButtonWatchListWidget = function () {
    if (loadingLike) {
      return (
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          style={{
            marginRight: '20px',
            display: 'inline-block',
            paddingLeft: '8px',
            paddingRight: '8px',
          }}
          startIcon={<Spin />}
        >
          LIKE ?
        </Button>
      );
    } else {
      if (like.is) {
        return (
          <Button
            onClick={WatchListButtonClickHandle}
            variant="contained"
            color="secondary"
            className={classes.button}
            style={{
              marginRight: '20px',
              display: 'inline-block',
              paddingLeft: '8px',
              paddingRight: '8px',
            }}
            startIcon={<Favorite />}
          >
            LIKED
          </Button>
        );
      } else {
        return (
          <Button
            onClick={WatchListButtonClickHandle}
            variant="outlined"
            color="secondary"
            className={classes.button}
            style={{
              border: '1px solid red',
              marginRight: '20px',
              display: 'inline-block',
            }}
            startIcon={<FavoriteBorder />}
          >
            LIKE
          </Button>
        );
      }
    }
  };

  const ButtonAddMyCourseWidget = function () {
    if (loadingStudy) {
      return (
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          style={{
            backgroundColor: '#ffc130',
            color: 'white',
            marginRight: '20px',
            display: 'inline-block',
            paddingLeft: '8px',
            paddingRight: '8px',
          }}
          startIcon={<Spin />}
        >
          STUDY ?
        </Button>
      );
    } else {
      if (study.is) {
        return (
          <Button
            onClick={MyCourseButtonClickHandle}
            variant="contained"
            color="primary"
            className={classes.button}
            style={{
              backgroundColor: '#ffc130',
              color: 'white',
              marginRight: '20px',
              display: 'inline-block',
              paddingLeft: '8px',
              paddingRight: '8px',
            }}
            startIcon={<ShoppingCart />}
          >
            STUDIED
          </Button>
        );
      } else {
        return (
          <Button
            onClick={MyCourseButtonClickHandle}
            variant="outlined"
            color="primary"
            className={classes.button}
            style={{
              border: '1px solid #ffc130',
              color: '#ffc130',
              marginRight: '20px',
              display: 'inline-block',
            }}
            startIcon={<AddShoppingCart />}
          >
            STUDY
          </Button>
        );
      }
    }
  };

  const BottomMainInfoWidget = function () {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: '15px',
        }}
      >
        <div style={{ flexGrow: 1 }}>
          {ButtonWatchListWidget()}
          {ButtonAddMyCourseWidget()}
        </div>

        {FeeWidget()}
      </div>
    );
  };

  const MainInfoWidget = function () {
    return (
      <div className={classes.card}>
        <CardContent className={classes.cardContent}>
          <div style={{ padding: '0px 40px' }}>
            <h1 style={{ color: '#fafafa' }}>{course.name}</h1>
            <div className={classes.normalText}>{course.shortDescription}</div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className={classes.cardRatingText}>{rateInfo.rating}</div>
              <div style={{ marginRight: '10px', marginTop: '0px' }}>
                {RatingStarsWidget(20)}
              </div>
              <div
                className={classes.smallText}
                style={{ marginRight: '30px' }}
              >
                ( {FormatNumberText(rateInfo.ratingCount)} ratings),
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
            {BottomMainInfoWidget()}
          </div>
        </CardContent>
        <CardMedia className={classes.cardMedia} image={course.image} />
      </div>
    );
  };

  const EnterStudyPage = function () {
    if (study.is === true) {
      const url = `/studyPage/${course.name}/`;
      return (
        <div style={{ width: '70%', display: 'flex' }}>
          <Button
            onClick={() =>
              history.push(url, {
                courseName: course.name,
                courseId: course.id,
                myCourseId: study.myCourseId,
              })
            }
            variant="contained"
            style={{
              marginTop: '50px',
              width: '300px',
              marginLeft: 'auto',
              backgroundColor: '#041d33',
              color: '#fafafa',
              fontSize: 16,
              fontWeight: 'bolder',
            }}
          >
            Enter class
          </Button>
        </div>
      );
    } else {
      return <></>;
    }
  };

  const DetailDescriptionWidget = function () {
    const str = course.detailDescription.replaceAll('&lt;', '<');
    return (
      <div className={classes.shadowCard}>
        <div className={classes.bigText}>DESCRIPTION</div>
        <ShowMoreText
          /* Default options */
          lines={3}
          more="Show more"
          less="Show less"
          className="content-css"
          anchorClass="my-anchor-css-class"
          onClick={e => {
            setDetailExpanded(!detailExpanded);
          }}
          expanded={detailExpanded}
          style={{ color: '#525252' }}
        >
          <div
            className="preview"
            style={{ color: '#525252' }}
            dangerouslySetInnerHTML={createMarkup(`${str}`)}
          />
        </ShowMoreText>
      </div>
    );
  };

  const VideosWidget = function () {
    return (
      <div style={{ marginTop: '50px', width: '70%' }}>
        <div className={classes.bigText} style={{ marginBottom: '10px' }}>
          Course content
        </div>
        <SectionList sectionList={sections} />
      </div>
    );
  };

  const myRateWidget = function () {
    const allRatings = ratings;
    if (localStorage.studyFiles_user_role === 'student' && study.is) {
      let myRate = null;
      let myFeed = null;
      for (var rating of allRatings) {
        if (rating.studentId === localStorage.studyFiles_user_id) {
          myRate = rating;
          for (var feedback of feedbacks) {
            if (feedback.ratingId === rating.id) {
              myFeed = feedback;
              break;
            }
          }
          break;
        }
      }
      if (myRate === null) {
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Avatar
                alt="Remy Sharp"
                src={userAvatar}
                style={{ width: '60px', height: '60px', marginRight: '20px' }}
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginRight: '30px', fontWeight: 'bolder' }}>
                  {localStorage.studyFiles_user_name} - You can rate this course
                </div>
                <ReactStars
                  size={35}
                  count={5}
                  edit={true}
                  value={myScoreRate}
                  isHalf={false}
                  onChange={newValue => setMyScoreRate(newValue)}
                  activeColor="#F9BA00"
                  style={{ paddingTop: '0px', marginTop: '0px' }}
                />
              </div>
            </div>
            <div style={{ paddingLeft: '90px', paddingTop: '10px' }}>
              <TextField
                placeholder="Comment ..."
                label="Enter comment here"
                style={{ textAlign: 'left' }}
                multiline
                variant="outlined"
                inputProps={{ maxLength: 500 }}
                rows={6}
                fullWidth
                value={myComment}
                onChange={e => setMyComment(e.target.value)}
              />
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={HandleRatingSubmit}
                  style={{
                    width: '100px',
                    marginLeft: 'auto',
                    marginTop: '20px',
                  }}
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div>
            <div style={{ fontWeight: 'bolder', color: '#525252' }}>
              You have rated this course
            </div>
            <RatingCard
              style={{ marginTop: '0px', paddingTop: '0px' }}
              rating={myRate}
              feedBack={myFeed}
            />
          </div>
        );
      }
    } else {
      return <></>;
    }
  };

  const myReplyWidget = function (rating) {
    return (
      <Accordion
        key={rating.id}
        expanded={replyWidgetExpanded === `panel${rating.id}`}
        onChange={handleExpandedReplyWidgetChange(`panel${rating.id}`)}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          Reply
        </AccordionSummary>
        <AccordionDetails>
          <div
            style={{
              // marginLeft: '100px',
              width: '100%',
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
                src={userAvatar}
                style={{ width: '60px', height: '60px', marginRight: '20px' }}
              />
              <div>
                <div style={{ fontWeight: 'bolder' }}>
                  {localStorage.studyFiles_user_name}
                </div>
              </div>
            </div>
            <TextField
              placeholder="Comment ..."
              label="Enter comment here"
              style={{ textAlign: 'left', marginTop: '10px' }}
              multiline
              variant="outlined"
              inputProps={{ maxLength: 500 }}
              rows={6}
              fullWidth
              value={myComment}
              onChange={e => setMyComment(e.target.value)}
              error={myComment === ''}
              helperText={myComment === '' ? 'Empty!' : ' '}
            />
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => HandleFeedBackSubmit(rating.id)}
                style={{
                  width: '100px',
                  marginLeft: 'auto',
                  marginTop: '20px',
                }}
              >
                Send
              </Button>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    );
  };

  const RatingListWidget = function () {
    return (
      <div
        style={{
          marginTop: '50px',
          display: 'flex',
          flexDirection: 'column',
          width: '70%',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className={classes.bigText}>Comments from participants</div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 'auto',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                marginRight: '10px',
              }}
              className={classes.cardRatingText}
            >
              <div style={{ fontSize: 30 }}>{rateInfo.rating}</div>
              <div>
                ( {FormatNumberText(rateInfo.ratingCount)} /
                {FormatNumberText(course.subscriberNumber)} rated )
              </div>
            </div>

            {RatingStarsWidget(60)}
          </div>
        </div>
        {myRateWidget()}
        <ShowMore
          by={5}
          items={ratings.filter(
            rating =>
              `${rating.studentId}` !== `${localStorage.studyFiles_user_id}`,
          )}
        >
          {({ current, onMore }) => (
            <div>
              {current.map(rating => {
                let feedback = null;
                for (var item of feedbacks) {
                  if (item.ratingId === rating.id) {
                    feedback = item;
                    break;
                  }
                }
                if (thisTeacher && feedback === null) {
                  return (
                    <div
                      key={rating.id}
                      style={{ display: 'flex', flexDirection: 'column' }}
                    >
                      <RatingCard rating={rating} feedBack={feedback} />
                      {/* <div style={{ marginTop: '10px' }}> */}
                      {myReplyWidget(rating)}
                      {/* </div> */}
                    </div>
                  );
                } else {
                  return (
                    <RatingCard
                      key={rating.id}
                      rating={rating}
                      feedBack={feedback}
                    />
                  );
                }
              })}
              <Button
                style={{
                  marginTop: '30px',
                  width: '100%',
                  border: '2px solid #246d96',
                }}
                variant="outlined"
                color="primary"
                disabled={!onMore}
                onClick={() => {
                  if (!!onMore) onMore();
                }}
              >
                Show more reviews
              </Button>
            </div>
          )}
        </ShowMore>
      </div>
    );
  };

  const TeacherInfoWidget = function () {
    return (
      <div className={classes.shadowCard} style={{ padding: '40px 0px' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            padding: '40px 40px',
            alignItems: 'center',
          }}
        >
          <Avatar
            onClick={NavigateToTeacherPage}
            alt="Remy Sharp"
            src={course.teacher.avatar}
            style={{ width: '180px', height: '180px', cursor: 'pointer' }}
          />
          <div style={{ marginLeft: '55px' }}>
            <div
              onClick={NavigateToTeacherPage}
              style={{ cursor: 'pointer' }}
              className={classes.bigText}
            >
              {course.teacher.name}
            </div>
            <div
              className={classes.normalText}
              stlye={{ display: 'flex', justifyContent: 'center' }}
            >
              <AllInboxSharp style={{ fontSize: 16, marginRight: '10px' }} />
              Email: {course.teacher.email}
            </div>
            <div style={{ marginTop: '15px', fontWeight: 'bolder' }}>
              About me
            </div>
            <div>{course.teacher.shortDescription}</div>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '0px 60px 20px',
          }}
        >
          <div
            style={{
              fontWeight: 'bolder',
              fontSize: 16,
            }}
          >
            Best sale courses
          </div>
          <div
            onClick={NavigateToTeacherPage}
            style={{ cursor: 'pointer', marginLeft: 'auto', color: '#368dd9' }}
          >
            See all <LastPageSharp />
          </div>
        </div>

        {Top5CourseOfSameTeacher()}
      </div>
    );
  };

  const Top5CourseOfSameTeacher = function () {
    const courses = [...bestSaleCoursesOfTeacher];
    return (
      <div>
        <Carousel
          plugins={[
            // 'infinite',
            'arrows',
            {
              resolve: slidesToShowPlugin,
              options: {
                numberOfSlides: 3,
              },
            },
          ]}
          animationSpeed={1000}
        >
          {courses.map(item => (
            <CourseCard course={item} key={item.id} />
          ))}
        </Carousel>
      </div>
    );
  };

  const TopFiveBestSaleCoursesOfSameSubCategory = function () {
    const courses = [...bestSaleCoursesSameCategory];
    return (
      <div style={{ marginTop: '50px', width: '95%' }}>
        <div
          style={{
            margin: '0px 50px 20px',
            display: 'flex',
            flexDirection: 'row',
          }}
          className={classes.bigText}
        >
          <div>top 5 courses of</div>
          <div
            onClick={NavigateToCategoryCousesListPage}
            style={{ marginLeft: '8px', color: '#368dd9', cursor: 'pointer' }}
          >
            {course.subCategory.name}
          </div>
        </div>
        <Carousel
          plugins={[
            // 'infinite',
            'arrows',
            {
              resolve: slidesToShowPlugin,
              options: {
                numberOfSlides: 4,
              },
            },
          ]}
          animationSpeed={1000}
        >
          {courses.map(item => (
            <CourseCard course={item} key={item.id} />
          ))}
        </Carousel>
      </div>
    );
  };

  return (
    <>
      <TopBar initQuery={''} />
      {loading ? (
        <div
          style={{
            width: '100%',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Spin />
        </div>
      ) : exist ? (
        <>
          {MainInfoWidget()}
          <div
            style={{
              height: '100%',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              color: '#525252',
            }}
          >
            {EnterStudyPage()}
            {DetailDescriptionWidget()}
            {VideosWidget()}
            {RatingListWidget()}
            {TeacherInfoWidget()}
            {TopFiveBestSaleCoursesOfSameSubCategory()}
          </div>
        </>
      ) : (
        <NotFoundPage />
      )}

      <Footer />
    </>
  );
}
