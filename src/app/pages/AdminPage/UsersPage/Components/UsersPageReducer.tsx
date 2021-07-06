export default function reducer(state, action) {
  switch (action.type) {
    case 'init':
      return {
        users: action.payload.users,
      };

    case 'add_task':
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    case 'delete_task':
      return {
        ...state,
        users: state.users.filter(i => i.id !== action.payload.userId),
      };

    default:
      return state;
  }
}
