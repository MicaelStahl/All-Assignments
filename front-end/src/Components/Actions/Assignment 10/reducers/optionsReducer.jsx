import * as actionTypes from "../actions/optionsActions";

const initialState = {
  isLoading: false,
  errorMessage: ""
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

    default:
      break;
  }
  return initialState;
}
