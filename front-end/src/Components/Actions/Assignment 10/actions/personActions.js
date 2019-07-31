// ----- Person ----- \\

import axios from "axios";

export const ALL_PEOPLE = "ALL_PEOPLE";
export const CREATE_PERSON = "CREATE_PERSON";
export const FIND_PERSON = "FIND_PERSON";
export const EDIT_PERSON = "EDIT_PERSON";
export const DELETE_PERSON = "DELETE_PERSON";
export const ERROR404MESSAGE = "ERROR404MESSAGE";
export const GET_ALL_CITIES = "GET_ALL_CITIES";

const apiUrl = "http://localhost:50691/api/PersonApi/";

//#region Error404

function Error404(err = "404 Error") {
  return {
    type: ERROR404MESSAGE,
    error: err
  };
}

//#endregion

//#region AllPeople

function AllPeople(allPeople) {
  return {
    type: ALL_PEOPLE,
    allPeople
  };
}

export function AllPeopleAsync() {
  return dispatch => {
    axios.get(apiUrl, { "Content-Type": "application/json" }).then(response => {
      console.log("[Response]", response);
      if (response.data !== null) {
        dispatch(AllPeople(response.data));
      } else {
        dispatch(Error404("Could not find any people. Please try again."));
      }
    });
  };
}

//#endregion

//#region Create

function CreatePerson(person) {
  return {
    type: CREATE_PERSON,
    person: person
  };
}

export function CreatePersonAsync(person, cityId) {
  return dispatch => {
    axios
      .post(apiUrl, { person: person, cityId: cityId })
      .then(response => {
        console.log("[Response]", response);

        if (response.data !== null) {
          dispatch(CreatePerson(response.data));
        } else {
          dispatch(Error404("Could not create person. Please try again"));
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
}

//#endregion

//#region FindPerson

function FindPerson(person) {
  return {
    type: FIND_PERSON,
    person: person
  };
}

export function FindPersonAsync(id) {
  return dispatch => {
    axios
      .get(apiUrl + id, { "Content-Type": "application/json" })
      .then(response => {
        console.log("[Response]", response);
        if (response.data !== null) {
          dispatch(FindPerson(response.data));
        } else {
          dispatch(
            Error404("Could not find the requested person. Please try again.")
          );
        }
      });
  };
}

//#endregion

//#region AllCities

function AllCities(cities) {
  return {
    type: GET_ALL_CITIES,
    cities
  };
}

export function AllCitiesAsync() {
  return dispatch => {
    axios.get("http://localhost:50691/api/cityApi/").then(response => {
      console.log("[Response]", response);
      if (response.data !== null) {
        dispatch(AllCities(response.data));
      } else {
        dispatch(Error404("Couldn't find any cities. Please try again."));
      }
    });
  };
}

//#endregion

//#region Edit

function EditPerson(person) {
  return {
    type: EDIT_PERSON,
    person: person
  };
}

export function EditPersonAsync(person) {
  return function(dispatch) {
    dispatch(EditPerson(person));
  };
}

//#endregion

//#region Delete

function DeletePerson(id) {
  return {
    type: DELETE_PERSON,
    id: id
  };
}

export function DeletePersonAsync(id) {
  return function(dispatch) {
    dispatch(DeletePerson(id));
  };
}

//#endregion
