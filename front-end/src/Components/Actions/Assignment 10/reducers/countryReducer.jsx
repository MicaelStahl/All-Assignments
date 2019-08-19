import * as actionTypes from "../actions/countryActions";

const initialState = {
  oneCountry: [],
  countries: [],
  error: ""
};

let country = [];
let countries = [];
let index = 0;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ALL_COUNTRIES:
      return {
        ...state,
        countries: action.countries,
        error: ""
      };

    case actionTypes.CREATE_COUNTRY:
      country = action.country;

      countries = state.countries;

      countries.push(country);

      return {
        ...state,
        oneCountry: action.countries,
        countries,
        error: ""
      };

    case actionTypes.FIND_COUNTRY:
      return {
        ...state,
        oneCountry: action.country,
        error: ""
      };

    case actionTypes.EDIT_COUNTRY:
      countries = state.countries;

      index = countries.findIndex(x => x.id === action.country.id);

      if (index === -1) {
        return {
          ...state,
          error: "Something went wrong. Please update the webpage."
        };
      }

      countries = countries.splice(index, 1, action.countries);

      const verify = countries.find(x => x.id === action.country.id);

      if (verify === action.country) {
        return {
          ...state,
          oneCountry: verify,
          countries,
          error: ""
        };
      } else {
        return {
          ...state,
          error: "Something went wrong. Please try again."
        };
      }

    case actionTypes.DELETE_COUNTRY:
      countries = state.countries;

      return {
        ...state,
        countries: countries.filter(x => x.id !== action.id),
        error: ""
      };

    default:
      return state;
  }
};

export default reducer;
