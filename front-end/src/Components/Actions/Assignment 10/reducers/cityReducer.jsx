import * as actionTypes from "../actions/cityActions";

const initialState = {
  countries: [],
  cities: [],
  oneCity: [],
  error: "",
  status: "",
  createSuccess: ""
};

let index = 0;
let cities = [];

const reducer = (state = initialState, action) => {
  //Todo
  switch (action.type) {
    // --------------- All Cities --------------- \\

    case actionTypes.ALL_CITIES:
      if (action.cities === null) {
        return {
          ...state,
          error:
            "Something went wrong when fetching all cities. Please try again.",
          status: action.status
        };
      }
      return {
        ...state,
        cities: action.cities,
        error: ""
      };

    // --------------- Create --------------- \\

    case actionTypes.CREATE_CITY:
      if (action.city === undefined || action.city === null) {
        return {
          ...state,
          error: "Please fill all fields, then try again.",
          status: action.status
        };
      }
      cities = state.cities;

      cities.push(action.city);

      return {
        ...state,
        oneCity: action.city,
        cities,
        error: "",
        createSuccess: "City was successfully created!"
      };

    // --------------- Find City --------------- \\

    case actionTypes.FIND_CITY:
      if (action.city === null || action.city === undefined) {
        return {
          ...state,
          error: "Something went wrong. Please try again!",
          status: action.status
        };
      }
      return {
        ...state,
        oneCity: action.city,
        error: ""
      };

    // --------------- Edit --------------- \\

    case actionTypes.EDIT_CITY:
      if (action.city === null || action.city === undefined) {
        return {
          ...state,
          error: "Something went wrong",
          status: action.status
        };
      }
      cities = state.cities;

      index = cities.findIndex(x => x.id === action.city.id);

      if (index === -1) {
        return {
          ...state,
          error: "Something went wrong, please try again.",
          status: action.status
        };
      }

      cities = cities.splice(index, 1, action.city);

      return {
        ...state,
        oneCity: action.city,
        cities,
        error: ""
      };

    // --------------- Add Person To City --------------- \\

    case actionTypes.ADD_PERSON_TO_CITY:
      if (action.city === null) {
        return {
          ...state,
          error: "Something went wrong. Please try again",
          status: action.status
        };
      }
      cities = state.cities;

      index = cities.findIndex(x => x.id === action.id);

      if (index === -1) {
        return {
          ...state,
          error: "Something went wrong. Please try again,"
        };
      }

      cities = cities.splice(index, 1, action.city);

      return {
        ...state,
        oneCity: action.city,
        cities,
        error: ""
      };

    // --------------- Delete --------------- \\

    case actionTypes.DELETE_CITY:
      cities = state.cities;

      return {
        ...state,

        cities: cities.filter(x => x.id !== action.id),
        error: ""
      };

    default:
      return {
        ...state,
        error: "Something went wrong. Please try again!"
      };

    // --------------- Get Countries for Create and Edit --------------- \\

    case actionTypes.GET_COUNTRIES_FOR_CREATE_N_EDIT:
      return {
        ...state,
        countries: action.countries
      };
  }
};

export default reducer;
