export default function reducer(state, action) {
  switch (action.type) {
    case 'init':
      return {
        mainCategories: action.payload.mainCategories,
      };

    case 'add_task':
      return {
        ...state,
        mainCategories: [...state.mainCategories, action.payload],
      };

    case 'update_task':
      return {
        ...state,
        mainCategories: state.mainCategories.map(i =>
          i.id === action.payload.mainCategoryId
            ? { ...i, name: action.payload.name }
            : i,
        ),
      };

    case 'delete_task':
      return {
        ...state,
        mainCategories: state.mainCategories.filter(
          i => i.id !== action.payload.mainCategoryId,
        ),
      };

    default:
      return state;
  }
}
