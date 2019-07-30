// ----- Person ----- \\

import axios from "axios";

export const ALL_PEOPLE = "ALL_PEOPLE";
export const CREATE_PERSON = "CREATE_PERSON";
export const FIND_PERSON = "FIND_PERSON";
export const EDIT_PERSON = "EDIT_PERSON";
export const DELETE_PERSON = "DELETE_PERSON";

const apiUrl = "http://localhost:50691/api/PersonApi/";

function AllPeople(allPeople) {
  return {
    type: ALL_PEOPLE,
    allPeople
  };
}

export function AllPeopleAsync() {
  return async dispatch => {
    const response = await axios.get(apiUrl, {
      "Content-Type": "application/json"
    });
    console.log("[Response]", response);
    if (response.data !== null) {
      dispatch(AllPeople(response.data));
    }
  };
}

function CreatePerson(person) {
  return {
    type: CREATE_PERSON,
    person: person
  };
}

export function CreatePersonAsync(person) {
  return function(dispatch) {
    dispatch(CreatePerson(person));
  };
}

function FindPerson(id) {
  return {
    type: FIND_PERSON,
    id: id
  };
}

export function FindPersonAsync(id) {
  return function(dispatch) {
    dispatch(FindPerson(id));
  };
}

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
