export default function reducer(state, action) {
  switch (action.type) {
    case 'init':
      return {
        subCategories: action.payload.subCategories,
      };

    case 'add_task':
      return {
        ...state,
        subCategories: [...state.subCategories, action.payload],
      };

    case 'update_task':
      return {
        ...state,
        subCategories: state.subCategories.map(i =>
          i.id === action.payload.subCategoryId
            ? action.payload.subCategory
            : i,
        ),
      };

    case 'delete_task':
      return {
        ...state,
        subCategories: state.subCategories.filter(
          i => i.id !== action.payload.subCategoryId,
        ),
      };

    default:
      return state;
  }
}
