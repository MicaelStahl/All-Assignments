import * as actionTypes from "../actions/personActions";
import axios from "axios";

const initialState = {
  onePerson: [],
  allPeople: [],
  personError: ""
};

let person = [];
let index = 0;
const apiUrl = "http://localhost:50691/api/PersonApi/";

const reducer = (state = initialState, action) => {
  // ToDo
  console.log(action);
  switch (action.type) {
    case actionTypes.ALL_PEOPLE:
      if (action.allPeople !== null || action.allPeople !== undefined) {
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
    // axios
    //   .get(apiUrl, { "Content-Type": "application/json" })
    //   .then(response => {
    //     console.log("ALL_PEOPLE", response.data);
    //     if (response.data === null) {
    //       return {
    //         ...state,
    //         personError: "Nothing found"
    //       };
    //     }
    //     const people = response.data;
    //     console.log("I happen too when response.data isn't empty");
    //     return {
    //       ...state,
    //       allPeople: people,
    //       personError: ""
    //     };
    //   })
    //   .catch(err => {
    //     console.error(err);
    //     return {
    //       ...state,
    //       personError: err
    //     };
    //   });
    // console.log(state);

    // break;

    case actionTypes.CREATE_PERSON:
      if (action.person === null || action.person === undefined) {
        return {
          ...state,
          personError: "Please fill all the required fields."
        };
      }
      person = {
        FirstName: action.person.firstName,
        LastName: action.person.lastName,
        Age: action.person.age,
        Email: action.person.email,
        Gender: action.person.gender,
        PhoneNumber: action.person.phoneNumber,
        City: action.person.city === "Select one" ? null : action.person.city
      };

      if (person === undefined || person === null) {
        return {
          ...state,
          personError: "Something went wrong. Please try again"
        };
      }
      axios
        .post(apiUrl, person)
        .then(response => {
          if (response.data === null) {
            return {
              ...state,
              personError: "Something went wrong. Please try again"
            };
          }
          const { allPeople } = state;

          allPeople.push(response.data);

          return {
            ...state,
            onePerson: response.data,
            allPeople,
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

    case actionTypes.FIND_PERSON:
      if (action.person === null || action.person === undefined) {
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
    // axios
    //   .get(apiUrl + action.id)
    //   .then(response => {
    //     if (response.data === null) {
    //       return {
    //         ...state,
    //         personError: "Something went wrong, please try again."
    //       };
    //     }
    //     return {
    //       ...state,
    //       onePerson: response.data,
    //       personError: ""
    //     };
    //   })
    //   .catch(err => {
    //     console.error(err);
    //     return {
    //       ...state,
    //       personError: err
    //     };
    //   });
    // break;

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
          let { allPeople } = state;
          index = allPeople.findIndex(x => x.Id === response.data.Id);

          if (index === -1) {
            return {
              ...state,
              personError: "Person could not be found. Please try again."
            };
          }

          allPeople = allPeople.splice(index, 1, response.data);

          return {
            ...state,
            onePerson: response.data,
            allPeople,
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

    case actionTypes.DELETE_PERSON:
      if (action.id === undefined || action.id === null) {
        return {
          ...state,
          personError: "Something went wrong. Please try again"
        };
      }
      let { allPeople } = state;

      person = allPeople.find(x => x.id === action.id);

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
          allPeople = allPeople.filter(x => x.id !== action.id);

          return {
            ...state,
            allPeople,
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

    case actionTypes.ERROR404MESSAGE:
      return {
        ...state,
        error: action.error
      };

    default:
      break;
  }
  return state;
};

export default reducer;
