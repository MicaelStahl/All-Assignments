import * as actionTypes from "../actions/userActions";

const initialState = {
  user: []
};

export default function reducer(state = initialState, action) {
  // ToDo
  switch (action.type) {
    case actionTypes.USER_DETAILS:
      return {
        ...state,
        user: action.user
      };

    default:
      break;
  }
  return state;
}
