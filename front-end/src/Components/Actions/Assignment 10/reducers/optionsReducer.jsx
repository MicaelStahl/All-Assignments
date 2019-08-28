import * as actionTypes from "../actions/optionsActions";

const initialState = {
  isLoading: false,
  errorMessage: "",
  success: ""
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };

    case actionTypes.ERROR:
      return {
        ...state,
        errorMessage: action.errorMessage
      };

    case actionTypes.SAVE_ADMIN_TO_LOCAL:
      localStorage.setItem("userId", action.admin.adminId);
      localStorage.setItem("userToken", action.admin.adminToken);
      localStorage.setItem("backend-token", action.admin.frontEndToken);
      break;

    case actionTypes.SAVE_USER_TO_LOCAL:
      localStorage.setItem("backend-token", action.user.frontEndToken);
      localStorage.setItem("userToken", action.user.userToken);
      localStorage.setItem("userId", action.user.userId);
      break;

    default:
      break;
  }
  return initialState;
}
