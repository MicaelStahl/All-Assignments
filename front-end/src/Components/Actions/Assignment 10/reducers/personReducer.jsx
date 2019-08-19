import * as actionTypes from "../actions/personActions";

const initialState = {
  onePerson: [],
  allPeople: [],
  allCities: [],
  personError: "",
  status: ""
};

let people = [];
let index = 0;

const reducer = (state = initialState, action) => {
  // ToDo
  console.log(action);
  switch (action.type) {
    case actionTypes.ALL_PEOPLE:
      return {
        ...state,
        allPeople: action.allPeople,
        error: "",
        status: action.status
      };

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
          personError: "Something went wrong, please try again.",
          status: action.status
        };
      } else {
        return {
          ...state,
          onePerson: action.person,
          status: action.status
        };
      }

    // -------------------------- EDIT -------------------------- \\

    case actionTypes.EDIT_PERSON:
      if (action.person === null || action.person === undefined) {
        return {
          ...state,
          personError: "Please fill all required fields.",
          status: action.status
        };
      }

      people = state.allPeople;
      index = people.findIndex(x => x.Id === action.person.id);

      if (index === -1) {
        return {
          ...state,
          personError: "Person could not be found. Please try again.",
          status: action.status
        };
      }

      people = people.splice(index, 1, action.person);

      return {
        ...state,
        onePerson: action.person,
        allPeople: people,
        personError: "",
        status: action.status
      };

    // -------------------------- DELETE -------------------------- \\

    case actionTypes.DELETE_PERSON:
      people = state.allPeople;

      return {
        ...state,
        allPeople: people.filter(x => x.id !== action.id),
        personError: "",
        status: action.status
      };

    // -------------------------- ERROR404 -------------------------- \\

    case actionTypes.ERROR404MESSAGE:
      return {
        ...state,
        error: action.error,
        status: action.status
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
          allCities: action.cities,
          status: action.status
        };
      } else {
        return {
          ...state,
          personError:
            "Could not find any cities. Please try reloading the webpage",
          status: action.status
        };
      }

    default:
      break;
  }
  return state;
};

export default reducer;
