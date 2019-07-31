import * as actionTypes from "../actions/personActions";
import axios from "axios";

const initialState = {
  onePerson: [],
  allPeople: [],
  allCities: [],
  personError: ""
};

let person = [];
let people = [];
let index = 0;
const apiUrl = "http://localhost:50691/api/PersonApi/";

const reducer = (state = initialState, action) => {
  // ToDo
  console.log(action);
  switch (action.type) {
    case actionTypes.ALL_PEOPLE:
      if (
        action.allPeople !== null ||
        action.allPeople !== undefined ||
        action.allPeople.length !== 0
      ) {
        return {
          ...state,
          allPeople: action.allPeople,
          error: ""
        };
      } else {
        return {
          ...state,
          error:
            "Something went wrong when fetching the people. Please try again."
        };
      }

    // -------------------------- CREATE -------------------------- \\

    case actionTypes.CREATE_PERSON:
      if (
        action.person === null ||
        action.person === undefined ||
        action.person.length === 0
      ) {
        return {
          ...state,
          personError: "Please fill all the required fields."
        };
      } else {
        people = state.allPeople;

        people.push(action.person);

        return {
          ...state,
          onePerson: action.person,
          allPeople: people,
          personError: ""
        };
      }

    // -------------------------- FIND -------------------------- \\

    case actionTypes.FIND_PERSON:
      if (
        action.person === null ||
        action.person === undefined ||
        action.person.length === 0
      ) {
        return {
          ...state,
          personError: "Something went wrong, please try again."
        };
      } else {
        return {
          ...state,
          onePerson: action.person
        };
      }

    // -------------------------- EDIT -------------------------- \\

    case actionTypes.EDIT_PERSON:
      if (action.person === null || action.person === undefined) {
        return {
          ...state,
          personError: "Please fill all required fields."
        };
      }
      person = {
        Id: action.person.id.value,
        FirstName: action.person.firstName.value,
        LastName: action.person.lastName.value,
        Age: action.person.age.value,
        Email: action.person.email.value,
        Gender: action.person.gender.value,
        PhoneNumber: action.person.phoneNumber.value,
        City:
          action.person.city === "Select one" ? null : action.person.city.value
      };

      if (person === undefined || person === null) {
        return {
          ...state,
          personError: "Something went wrong, please try again."
        };
      }
      axios
        .put(apiUrl + person.Id, person)
        .then(response => {
          if (response.data === null) {
            return {
              ...state,
              personError: "No data was retrieved. Please try again."
            };
          }
          people = state.allPeople;
          index = people.findIndex(x => x.Id === response.data.Id);

          if (index === -1) {
            return {
              ...state,
              personError: "Person could not be found. Please try again."
            };
          }

          people = people.splice(index, 1, response.data);

          return {
            ...state,
            onePerson: response.data,
            allPeople: people,
            personError: ""
          };
        })
        .catch(err => {
          console.error(err);
          return {
            ...state,
            personError: err
          };
        });
      break;

    // -------------------------- DELETE -------------------------- \\

    case actionTypes.DELETE_PERSON:
      if (action.id === undefined || action.id === null) {
        return {
          ...state,
          personError: "Something went wrong. Please try again"
        };
      }
      people = state.allPeople;

      person = people.find(x => x.id === action.id);

      if (person === undefined) {
        return {
          ...state,
          personError:
            "The requested person could not be found. Please try again."
        };
      }

      axios
        .delete(apiUrl + action)
        .then(response => {
          if (response.data === false) {
            return {
              ...state,
              personError: "The person could not be removed, please try again."
            };
          }
          people = people.filter(x => x.id !== action.id);

          return {
            ...state,
            allPeople: people,
            personError: ""
          };
        })
        .catch(err => {
          console.error(err);
          return {
            ...state,
            personError: err
          };
        });
      break;

    // -------------------------- ERROR404 -------------------------- \\

    case actionTypes.ERROR404MESSAGE:
      return {
        ...state,
        error: action.error
      };

    // -------------------------- GET_ALL_CITIES -------------------------- \\

    case actionTypes.GET_ALL_CITIES:
      if (
        action.cities.length !== 0 ||
        action.cities !== undefined ||
        action.cities !== null
      ) {
        return {
          ...state,
          allCities: action.cities
        };
      } else {
        return {
          ...state,
          personError:
            "Could not find any cities. Please try reloading the webpage"
        };
      }

    default:
      break;
  }
  return state;
};

export default reducer;
