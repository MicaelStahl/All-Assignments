// ----- City ----- \\

export const ALL_CITIES = "ALL_CITIES";
export const CREATE_CITY = "CREATE_CITY";
export const FIND_CITY = "FIND_CITY";
export const EDIT_CITY = "EDIT_CITY";
export const ADD_PERSON_TO_CITY = "ADD_PERSON_TO_CITY";
export const DELETE_CITY = "DELETE_CITY";

function AllCities() {
  return {
    type: ALL_CITIES
  };
}

export function AllCitiesAsync() {
  return dispatch => {
    setTimeout(() => {
      dispatch(AllCities());
    }, 1000);
  };
}

function CreateCity(city) {
  return {
    type: CREATE_CITY,
    city: city
  };
}

export function CreateCityAsync(city) {
  return dispatch => {
    setTimeout(() => {
      dispatch(CreateCity(city));
    }, 1000);
  };
}

function FindCity(id) {
  return {
    type: FIND_CITY,
    id: id
  };
}

export function FindCityAsync(id) {
  return dispatch => {
    setTimeout(() => {
      dispatch(FindCity(id));
    }, 1000);
  };
}

function EditCity(city) {
  return {
    type: EDIT_CITY,
    city: city
  };
}

export function EditCityAsync(city) {
  return dispatch => {
    setTimeout(() => {
      dispatch(EditCity(city));
    }, 1000);
  };
}

function AddPersonToCity(id, person) {
  return {
    type: ADD_PERSON_TO_CITY,
    id: id,
    person: person
  };
}

export function AddPersonToCityAsync(id, person) {
  return dispatch => {
    setTimeout(() => {
      dispatch(AddPersonToCity(id, person));
    }, 1000);
  };
}

function DeleteCity(id) {
  return {
    type: DELETE_CITY,
    id: id
  };
}

export function DeleteCityAsync(id) {
  return dispatch => {
    setTimeout(() => {
      dispatch(DeleteCity(id));
    }, 1000);
  };
}
