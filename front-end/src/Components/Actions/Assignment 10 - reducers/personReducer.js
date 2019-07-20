import * as actionTypes from "../Assignment 10 - actions/personActions";
import axios from "axios";

const initialState = {
  onePerson: [],
  allPeople: [],
  error: ""
};

let person = [];
let index = 0;
const apiUrl = "http://localhost:50691/api/personApi/";

const reducer = (state = initialState, action) => {
  // ToDo
  switch (action.type) {
    case actionTypes.ALL_PEOPLE:
      axios
        .get(apiUrl, { "Content-Type": "application/json" })
        .then(response => {
          if (response.data === null) {
            return {
              ...state,
              error: "Nothing found"
            };
          }
          return {
            ...state,
            allPeople: response.data,
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

    case actionTypes.CREATE_PERSON:
      if (action.person === null || action.person === undefined) {
        return {
          ...state,
          error: "Please fill all the required fields."
        };
      }
      person = {
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
          error: "Something went wrong. Please try again"
        };
      }
      axios
        .post(apiUrl, person)
        .then(response => {
          if (response.data === null) {
            return {
              ...state,
              error: "Something went wrong. Please try again"
            };
          }
          const { allPeople } = state;

          allPeople.push(response.data);

          return {
            ...state,
            onePerson: response.data,
            allPeople,
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

    case actionTypes.FIND_PERSON:
      if (action.id === null || action.id === undefined) {
        return {
          ...state,
          error: "Something went wrong, please try again."
        };
      }
      axios
        .get(apiUrl + action.id)
        .then(response => {
          if (response.data === null) {
            return {
              ...state,
              error: "Something went wrong, please try again."
            };
          }
          return {
            ...state,
            onePerson: response.data,
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

    case actionTypes.EDIT_PERSON:
      if (action.person === null || action.person === undefined) {
        return {
          ...state,
          error: "Please fill all required fields."
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
          error: "Something went wrong, please try again."
        };
      }
      axios
        .put(apiUrl + person.Id, person)
        .then(response => {
          if (response.data === null) {
            return {
              ...state,
              error: "No data was retrieved. Please try again."
            };
          }
          let { allPeople } = state;
          index = allPeople.findIndex(x => x.Id === response.data.Id);

          if (index === -1) {
            return {
              ...state,
              error: "Person could not be found. Please try again."
            };
          }

          allPeople = allPeople.splice(index, 1, response.data);

          return {
            ...state,
            onePerson: response.data,
            allPeople,
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

    case actionTypes.DELETE_PERSON:
      if (action.id === undefined || action.id === null) {
        return {
          ...state,
          error: "Something went wrong. Please try again"
        };
      }
      let { allPeople } = state;

      person = allPeople.find(x => x.id === action.id);

      if (person === undefined) {
        return {
          ...state,
          error: "The requested person could not be found. Please try again."
        };
      }

      axios
        .delete(apiUrl + action)
        .then(response => {
          if (response.data === false) {
            return {
              ...state,
              error: "The person could not be removed, please try again."
            };
          }
          allPeople = allPeople.filter(x => x.id !== action.id);

          return {
            ...state,
            allPeople,
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

    default:
      return state;
  }
};

export default reducer;
