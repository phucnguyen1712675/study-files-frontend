export default function reducer(state, action) {
  switch (action.type) {
    case 'init':
      return {
        courses: action.payload.courses,
      };

    case 'delete_task':
      return {
        ...state,
        courses: state.courses.filter(i => i.id !== action.payload.courseId),
      };

    default:
      return state;
  }
}
