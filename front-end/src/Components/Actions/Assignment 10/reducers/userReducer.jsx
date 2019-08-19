import * as actionTypes from "../actions/userActions";

const initialState = {
  users: [],
  user: []
};

export default function reducer(state = initialState, action) {
  // ToDo
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

    default:
      break;
  }
  return state;
}
