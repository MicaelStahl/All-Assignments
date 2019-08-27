import * as actionTypes from "../actions/identityActions";

const initialState = {
  users: [],
  user: "",
  roles: [],
  isAuthenticated: false,
  registered: ""
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SIGN_IN:
      return {
        ...state,
        isAuthenticated: true,
        roles: action.roles,
        registered: ""
      };

    case actionTypes.REGISTER:
      return {
        ...state,
        registered: action.success
      };

    case actionTypes.SIGN_OUT:
      return {
        ...state,
        userToken: "",
        isAuthenticated: false,
        success: "",
        roles: [],
        registered: ""
      };

    case actionTypes.UPDATE_USERLIST:
      return {
        ...state,
        users: action.users,
        registered: ""
      };

    case actionTypes.UPDATE_USER:
      return {
        ...state,
        user: action.user,
        registered: ""
      };

    case actionTypes.DELETE_USER:
      return {
        ...state,
        users: state.users.filter(x => x.userId !== action.userId),
        registered: "",
        isAuthenticated: false
      };

    case actionTypes.ADMIN_DELETE_USER:
      return {
        ...state,
        users: state.users.filter(x => x.userId !== action.userId),
        registered: ""
      };

    default:
      break;
  }
  return state;
}

export default reducer;
