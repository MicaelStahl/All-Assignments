import * as actionTypes from "../actions/countryActions";
import axios from "axios";
import { stat } from "fs";

const initialState = {
  oneCountry: [],
  countries: [],
  error: ""
};

let country = [];
let index = 0;
const apiUrl = "http://localhost:50691/api/countryApi/";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ALL_COUNTRIES:
      axios
        .get(apiUrl, { "Content-Type": "application/json" })
        .then(response => {
          if (response.data === null) {
            return {
              ...state,
              error: "No countries could be found. Please try again"
            };
          }
          return {
            ...state,
            countries: response.data,
            error: ""
          };
        })
        .catch(err => {
          console.error(err);
          return {
            ...state,
            error: err
          };
        });
      break;

    case actionTypes.CREATE_COUNTRY:
      if (action.country === null || action.country === undefined) {
        return {
          ...state,
          error: "Please fill all fields and then try again."
        };
      }

      country = {
        Name: action.country.name,
        Population: action.country.population,
        Cities: action.country.cities
      };

      if (country === null || country === undefined) {
        return {
          ...state,
          error: "Something went wrong. Please try again."
        };
      }

      axios
        .post(apiUrl, country)
        .then(response => {
          if (response.data === null) {
            return {
              ...state,
              error: "Something went wrong. Please try again"
            };
          }

          country = response.data;

          const { countries } = state;

          countries.push(country);

          return {
            ...state,
            oneCountry: response.data,
            countries,
            error: ""
          };
        })
        .catch(err => {
          console.error(err);
          return {
            ...state,
            error: err
          };
        });

      break;

    case actionTypes.FIND_COUNTRY:
      if (action.id === undefined || action.id === null) {
        return {
          ...state,
          error: "Something went wrong. Please try again."
        };
      }

      axios
        .get(apiUrl + action.id)
        .then(response => {
          if (response.data === null) {
            return {
              ...state,
              error: "Something went wrong. Please try again."
            };
          }

          return {
            ...state,
            oneCountry: response.data,
            error: ""
          };
        })
        .catch(err => {
          console.error(err);
          return {
            ...state,
            error: err
          };
        });
      break;

    case actionTypes.EDIT_COUNTRY:
      if (action.country === undefined || action.country === null) {
        return {
          ...state,
          error: "Please fill all fields and then try again."
        };
      }

      country = {
        Id: action.country.id,
        Name: action.country.name,
        Population: action.country.population,
        Cities: action.country.cities
      };

      if (country === undefined || country === null) {
        return {
          ...state,
          error: "Something went wrong. Please try again."
        };
      }

      axios
        .put(apiUrl + action.country.id, country)
        .then(response => {
          if (response.data === null) {
            return {
              ...state,
              error:
                "Something went wrong when editing country. Please try again."
            };
          }
          let { countries } = state;

          index = countries.findIndex(x => x.id === action.country.id);

          if (index === -1) {
            return {
              ...state,
              error: "The country could not be edited. Please try again."
            };
          }

          countries = countries.splice(index, 1, response.data);

          const verify = countries.find(x => x.id === action.country.id);

          if (verify === response.data) {
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
        })
        .catch(err => {
          console.error(err);
          return {
            ...state,
            error: err
          };
        });
      break;

    case actionTypes.ADD_CITY_TO_COUNTRY:
      if (
        action.countryId === undefined ||
        action.countryId === null ||
        action.cities === undefined ||
        action.cities === null
      ) {
        return {
          ...state,
          error: "Something went wrong. Please try again."
        };
      }
      axios
        .put(apiUrl + "add-city", (action.countryId, action.cities))
        .then(response => {
          if (response.data === null) {
            return {
              ...state,
              error: "Something went wrong. Please try again."
            };
          }

          let { countries } = state;

          index = countries.findIndex(x => x.id === action.countryId);

          if (index === -1) {
            return {
              ...state,
              error: "The country could not be found. Please try again."
            };
          }
          countries = countries.splice(index, 1, response.data);

          const verify = countries.find(x => x.id === action.countryId);

          if (verify === response.data) {
            return {
              oneCountry: verify,
              countries,
              error: ""
            };
          }
        })
        .catch(err => {
          console.error(err);
          return {
            ...state,
            error: err
          };
        });
      break;

    case actionTypes.DELETE_COUNTRY:
      if (action.id === undefined || action.id === null) {
        return {
          ...state,
          error: "Something went wrong. Please try again."
        };
      }

      axios
        .delete(apiUrl + action.id)
        .then(response => {
          if (response.data === false) {
            return {
              ...state,
              error: "The country could not be deleted. Please try again."
            };
          }
          let { countries } = state;

          countries = countries.filter(x => x.id !== action.id);

          const verify = countries.find(x => x.id === action.id);

          if (verify === undefined) {
            return {
              ...state,
              countries,
              error: ""
            };
          } else {
            return {
              ...state,
              error: "Something went wrong."
            };
          }
        })
        .catch(err => {
          console.error(err);
          return {
            ...state,
            error: err
          };
        });
      break;

    default:
      return state;
  }
};

export default reducer;
