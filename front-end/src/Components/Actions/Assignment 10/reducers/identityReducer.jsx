import * as actionTypes from "../actions/identityActions";

const initialState = {
  users: [],
  roles: [],
  isAuthenticated: false,
  error: "",
  success: "",
  role: ""
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SIGN_IN:
      // Remember to make use of localStorage!
      return {
        ...state,
        isAuthenticated: true,
        role: action.roles,
        success: "User was successfully signed in.",
        error: ""
      };

    case actionTypes.REGISTER:
      console.log("Do I happen??");
      return {
        ...state,
        users: state.users.push(action.user),
        success: "User was successfully registered.",
        error: ""
        // Redirect user to Signin screen after registration. Maybe.
      };

    case actionTypes.SIGN_OUT:
      return {
        ...state,
        userToken: "",
        role: "",
        isAuthenticated: false,
        success: "",
        error: ""
      };

    case actionTypes.ERROR:
      return {
        ...state,
        error: action.error,
        success: ""
      };

    default:
      break;
  }
  return state;
}

export default reducer;
