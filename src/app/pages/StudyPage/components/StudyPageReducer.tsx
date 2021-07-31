export default function reducer(state, action) {
  switch (action.type) {
    case 'init':
      return {
        sections: action.payload.sections,
        lectures: action.payload.lectures,
        selectedLecture: action.payload.selectedLecture,
      };
    case 'update_selected_lecture':
      return {};
    case 'update_lecture_endTime':
      return {};
    case 'update_lecture_done':
      return {};
  }
}
