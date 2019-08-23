import * as actionTypes from "../actions/identityActions";

const initialState = {
  users: [],
  user: "",
  roles: [],
  isAuthenticated: false
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SIGN_IN:
      return {
        ...state,
        isAuthenticated: true,
        roles: action.roles
      };

    case actionTypes.REGISTER:
      const { users } = state;
      users.push(action.user);
      return {
        ...state,
        users
      };

    case actionTypes.SIGN_OUT:
      return {
        ...state,
        userToken: "",
        isAuthenticated: false,
        success: "",
        roles: []
      };

    case actionTypes.UPDATE_USERLIST:
      return {
        ...state,
        users: action.users
      };

    case actionTypes.UPDATE_USER:
      return {
        ...state,
        user: action.user
      };

    case actionTypes.DELETE_USER:
      return {
        ...state,
        users: state.users.filter(x => x.userId !== action.userId)
      };

    default:
      break;
  }
  return state;
}

export default reducer;
