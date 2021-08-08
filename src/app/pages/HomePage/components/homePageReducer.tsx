export default function reducer(state, action) {
  switch (action.type) {
    case 'init':
      return {
        ...state,
        bestSellerCourses: action.payload.bestSellerCourses,
        categories: action.payload.categories,
        subCategories: action.payload.subCategories,
        latestCourses: action.payload.latestCourses,
        watchList: action.payload.watchList,
        myCourses: action.payload.myCourses,
        userId: action.payload.userId,
        loading: action.payload.loading,
      };
    case 'update_loading':
      return {
        ...state,
        loading: action.payload.loading,
      };
    case 'update_user_id':
      return {
        ...state,
        userId: action.payload.userId,
      };
    case 'update_course_rating':
      return {
        ...state,
        latestCourses: state.latestCourses.map(course =>
          course.id === action.payload.courseId
            ? {
                ...course,
                rating: action.payload.rating,
                ratingCount: action.payload.ratingCount,
              }
            : course,
        ),
        bestSellerCourses: state.bestSellerCourses.map(course =>
          course.id === action.payload.courseId
            ? {
                ...course,
                rating: action.payload.rating,
                ratingCount: action.payload.ratingCount,
              }
            : course,
        ),
        watchList: state.watchList.map(course =>
          course.id === action.payload.courseId
            ? {
                ...course,
                rating: action.payload.rating,
                ratingCount: action.payload.ratingCount,
              }
            : course,
        ),
        myCourses: state.myCourses.map(course =>
          course.id === action.payload.courseId
            ? {
                ...course,
                rating: action.payload.rating,
                ratingCount: action.payload.ratingCount,
              }
            : course,
        ),
      };
    case 'add_watch_list':
      return {
        ...state,
        watchList: [...state.watchList, action.payload.course],
      };
    case 'delete_watch_list':
      return {
        ...state,
        watchList: state.watchList.filter(
          watchList => watchList.watchListId !== action.payload.watchListId,
        ),
      };
    case 'add_my_courses':
      return {
        ...state,
        myCourses: [...state.myCourses, action.payload.course],
      };
    case 'delete_my_courses':
      return {
        ...state,
        myCourses: state.myCourses.filter(
          myCourse => myCourse.myCourseId !== action.payload.myCourseId,
        ),
      };
    case 'clear_store':
      return {
        ...state,
        watchList: [],
        myCourses: [],
      };
    default:
      return state;
  }
}
