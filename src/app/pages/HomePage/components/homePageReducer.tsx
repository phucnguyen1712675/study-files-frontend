export default function reducer(state, action) {
  // action = { type, payload }
  // watch list List<String>:id
  // add_watch_list_task remove_watch_list_task : payload:courseId

  // MyCourse List<String>:id
  // add_my_course_task: payload.courseId
  switch (action.type) {
    case 'init':
      return {
        query: action.payload.query,
        selectedSubCategory: action.payload.selectedSubCategory,
        bestSellerCourses: action.payload.bestSellerCourses,
        categories: action.payload.categories,
        subCategories: action.payload.subCategories,
        latestCourses: action.payload.latestCourses,
        watchList: action.payload.watchList,
        myCourses: action.payload.myCourses,
      };
    // case 'add_watch_list':
    //   return {
    //     ...state,
    //     watchList: [...state.watchList, action.payload.course],
    //   };
    // case 'delete_watch_list':
    //   return {
    //     ...state,
    //     watchList: state.watchList.filter(
    //       course => course.id !== action.payload.courseId,
    //     ),
    //   };
    // case 'add_my_courses':
    //   return {
    //     ...state,
    //     myCourses: [...state.myCourses, action.payload.course],
    //   };
    // case 'delete_my_courses':
    //   return {
    //     ...state,
    //     myCourses: state.myCourses.filter(
    //       course => course.id !== action.playload.courseId,
    //     ),
    //   };
    case 'update_query':
      return {
        ...state,
        query: action.payload.query,
        selectedSubCategory: '',
      };
    case 'clear_query':
      return { ...state, query: '' };
    case 'update_selectedCategory':
      return {
        ...state,
        selectedSubCategory: action.payload.selectedSubCategory,
        query: '',
      };
    default:
      return state;
  }
}
