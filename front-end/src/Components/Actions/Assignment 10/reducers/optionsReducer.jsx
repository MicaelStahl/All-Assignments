import * as actionTypes from "../actions/optionsActions";

const initialState = {
  isLoading: false,
  error: ""
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };

    default:
      break;
  }
  return initialState;
}
