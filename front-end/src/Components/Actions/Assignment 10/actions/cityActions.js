import Axios from "axios";

// ----- City ----- \\

export const ALL_CITIES = "ALL_CITIES";
export const CREATE_CITY = "CREATE_CITY";
export const FIND_CITY = "FIND_CITY";
export const EDIT_CITY = "EDIT_CITY";
export const ADD_PERSON_TO_CITY = "ADD_PERSON_TO_CITY";
export const DELETE_CITY = "DELETE_CITY";
export const ITEMS_ARE_LOADING = "ITEMS_ARE_LOADING";

const apiUrl = "http://localhost:50691/api/cityApi/";

function ItemsAreLoading(bool) {
  return {
    type: ITEMS_ARE_LOADING,
    isLoading: bool
  };
}

function AllCities(cities, status) {
  return {
    type: ALL_CITIES,
    cities
  };
}

export function AllCitiesAsync() {
  return dispatch => {
    setTimeout(() => {
      dispatch(ItemsAreLoading(true));
      Axios.get(apiUrl, { "Content-Type": "application/json" })
        .then(response => {
          if (response.status === 200) {
            dispatch(AllCities(response.data, response.status));
            dispatch(ItemsAreLoading(false));
          }
        })
        .catch(err => {
          console.error(err);
        });
    }, 100);
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

function AddPersonToCity(cityId, people) {
  return {
    type: ADD_PERSON_TO_CITY,
    cityId: cityId,
    people: people
  };
}

export function AddPersonToCityAsync(cityId, people) {
  return dispatch => {
    setTimeout(() => {
      dispatch(AddPersonToCity(cityId, people));
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
