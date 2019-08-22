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

    default:
      break;
  }
  return state;
};

export default reducer;
