import * as actionTypes from "../actions/adminActions";

const initialState = {
  users: [],
  user: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADMIN_GET_USER:
      return {
        ...state,
        user: action.user
      };

    case actionTypes.ADMIN_GET_USERS:
      return {
        ...state,
        users: action.users
      };

    case actionTypes.ADMIN_CREATE_USER:
      return {
        ...state,
        users: state.users.push(action.user)
      };

    case actionTypes.ADMIN_DELETE_USER:
      return {
        ...state,
        users: state.users.filter(x => x.userId !== action.userId)
      };

    default:
      break;
  }
  return state;
};

export default reducer;
