export default function reducer(state, action) {
  // action = { type, payload }
  switch (action.type) {
    case 'init':
      return {
        items: action.payload.items,
        query: action.payload.query,
      };

    case 'add_item':
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case 'update_query':
      return {
        ...state,
        query: action.payload.query,
      };

    case 'complete_task':
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.payload.itemId ? { ...i, complete: true } : i,
        ),
      };

    default:
      return state;
  }
}
