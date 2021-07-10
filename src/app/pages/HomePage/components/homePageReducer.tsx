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
      };
    case 'update_query':
      return {
        ...state,
        query: action.payload.query,
      };
    case 'update_selectedSubCategory':
      return {
        ...state,
        selectedSubCategory: action.payload.bestSellerCourses,
      };
    default:
      return state;
  }
}
