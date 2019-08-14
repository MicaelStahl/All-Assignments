import * as actionTypes from "../actions/identityActions";
import { stat } from "fs";

const initialState = {
  users: [],
  roles: [],
  userToken: "",
  isAuthenticated: false,
  error: "",
  success: "",
  role: "",
  isLoading: false
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SIGN_IN:
      // Remember to make use of localStorage!
      // Think I need to use Json.Stringify to properly use localStorage.
      // Like this =>  const test = JSON.stringify(localStorage.setItem("user", action.user));
      return {
        ...state,
        isAuthenticated: true,
        role: action.roles,
        userToken: action.userToken,
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
        success: "User was successfully signed out.",
        error: ""
      };

    case actionTypes.LOADING:
      return {
        ...state,
        isLoading: action.isLoading
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
