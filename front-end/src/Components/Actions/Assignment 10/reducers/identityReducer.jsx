import * as actionTypes from "../actions/identityActions";

const initialState = {
  users: [],
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

    default:
      break;
  }
  return state;
}

export default reducer;
