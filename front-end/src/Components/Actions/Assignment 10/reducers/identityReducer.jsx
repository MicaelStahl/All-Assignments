import * as actionTypes from "../actions/identityActions";

const initialState = {
  users: [],
  user: [],
  roles: [],
  isAuthenticated: false,
  success: ""
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SIGN_IN:
      return {
        ...state,
        isAuthenticated: true,
        roles: action.roles,
        success: "User was successfully signed in."
      };

    case actionTypes.REGISTER:
      const { users } = state;
      users.push(action.user);
      return {
        ...state,
        users,
        success: "User was successfully registered."
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

    default:
      break;
  }
  return state;
}

export default reducer;
