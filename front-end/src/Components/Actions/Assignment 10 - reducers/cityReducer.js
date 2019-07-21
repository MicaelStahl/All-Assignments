import * as actionTypes from "../Assignment 10 - actions/cityActions";
import axios from "axios";

const initialState = {
  cities: [],
  oneCity: [],
  error: ""
};

let city = [];
let index = 0;
const apiUrl = "http://localhost:50691/api/cityApi/";

const reducer = (state = initialState, action) => {
  //Todo
  switch (action.type) {
    case actionTypes.ALL_CITIES:
      axios
        .get(apiUrl, { "Content-Type": "application/json" })
        .then(response => {
          if (response.data === null) {
            return {
              ...state,
              error: "No cities were found. Please try again"
            };
          }
          return {
            ...state,
            cities: response.data,
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

    case actionTypes.CREATE_CITY:
      if (action.city === undefined || action.city === null) {
        return {
          ...state,
          error: "Please fill all fields, then try again."
        };
      }
      city = {
        Name: action.city.name,
        Population: action.city.population,
        Country: action.city.country,
        People: action.city.people
      };

      if (city === undefined || city === null) {
        return {
          ...state,
          error: "Please fill all fields, then try again."
        };
      }

      axios
        .post(apiUrl, city)
        .then(response => {
          if (response.data === null) {
            return {
              ...state,
              error: "Something went wrong when creating city. Please try again"
            };
          }
          const { cities } = state;

          cities.push(response.data);

          return {
            ...state,
            oneCity: response.data,
            cities,
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

    case actionTypes.FIND_CITY:
      if (action.id === null || action.id === undefined) {
        return {
          ...state,
          error: "Something went wrong. Please try again!"
        };
      }
      axios
        .get(apiUrl + action.id)
        .then(response => {
          if (response.data === null) {
            return {
              ...state,
              error: "Can't find the specificed city. Please try again."
            };
          }
          return {
            ...state,
            oneCity: response.data,
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

    case actionTypes.EDIT_CITY:
      if (action.city === null || action.city === undefined) {
        return {
          ...state,
          error: "Something went wrong"
        };
      }
      city = {
        Id: action.city.id,
        Name: action.city.name,
        Population: action.city.population,
        Country: action.city.country,
        People: action.city.people
      };

      if (city === undefined || city === null) {
        return {
          ...state,
          error: "Please fill all fields, then try again."
        };
      }

      axios
        .put(apiUrl + action.city.id, city)
        .then(response => {
          if (response.data === null) {
            return {
              ...state,
              error:
                "Something went wrong when updating city. Please try again."
            };
          }
          let { cities } = state;
          index = cities.findIndex(x => x.id === action.city.id);

          if (index === -1) {
            return {
              ...state,
              error: "Something went wrong, please try again."
            };
          }

          cities = cities.splice(index, 1, response.data);

          return {
            ...state,
            oneCity: response.data,
            cities,
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

    case actionTypes.ADD_PERSON_TO_CITY:
      if (
        action.id === undefined ||
        action.id === null ||
        action.person === undefined ||
        action.person === null
      ) {
        return {
          ...state,
          error: "Something went wrong. Please try again."
        };
      }

      axios
        .put(apiUrl + "add-person", (action.id, action.person))
        .then(response => {
          if (response.data === null) {
            return {
              ...state,
              error:
                "Something went wrong when adding person to city. Please try again."
            };
          }
          let { cities } = state;
          index = cities.findIndex(x => x.id === action.id);
          if (index === -1) {
            return {
              ...state,
              error: "Something went wrong. Please try again,"
            };
          }

          cities = cities.splice(index, 1, response.data);

          return {
            ...state,
            oneCity: response.data,
            cities,
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

    case actionTypes.DELETE_CITY:
      if (action.id === null || action.id === undefined) {
        return {
          ...state,
          error: "Something went wrong, please try again."
        };
      }

      axios
        .delete(apiUrl + action.id)
        .then(response => {
          if (response.data === false) {
            return {
              ...state,
              error:
                "Something went wrong when deleting city. Please try again."
            };
          }
          let { cities } = state;

          cities = cities.filter(x => x.id !== action.id);

          const verify = cities.find(x => x.id === action.id);

          if (verify === undefined) {
            return {
              ...state,
              cities,
              error: ""
            };
          } else {
            return {
              ...state,
              error:
                "Something went wrong when deleting city. Please try again."
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
      return {
        ...state,
        error: "Something went wrong. Please try again!"
      };
  }
  return {
    ...state,
    error: "Something went wrong. Please try again!"
  };
};

export default reducer;
