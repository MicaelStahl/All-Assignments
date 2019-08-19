import axios from "axios";

import * as actionOptions from "./optionsActions";

// ----- City ----- \\

export const ALL_CITIES = "ALL_CITIES";
export const CREATE_CITY = "CREATE_CITY";
export const FIND_CITY = "FIND_CITY";
export const FIND_CITY_WITH_STUFF = "FIND_CITY_WITH_STUFF";
export const EDIT_CITY = "EDIT_CITY";
export const ADD_PERSON_TO_CITY = "ADD_PERSON_TO_CITY";
export const DELETE_CITY = "DELETE_CITY";
export const GET_COUNTRIES_FOR_CREATE_N_EDIT =
  "GET_COUNTRIES_FOR_CREATE_N_EDIT";

const apiUrl = "http://localhost:50691/api/cityApi/";

function AllCities(cities, status) {
  return {
    type: ALL_CITIES,
    cities,
    status
  };
}

export function AllCitiesAsync() {
  return dispatch => {
    dispatch(actionOptions.ItemsAreLoadingAsync(true));
    setTimeout(() => {
      axios
        .get(apiUrl + "cities", {
          "Content-Type": "application/json",
          cancelToken: actionOptions.CreateCancelToken()
        })
        .then(response => {
          if (response.status === 200) {
            dispatch(AllCities(response.data, response.status));
            dispatch(actionOptions.ItemsAreLoadingAsync(false));
          }
        })
        .catch(err => {
          console.error(err);
        });
    }, 200);
  };
}

function GetCountries(countries) {
  return {
    type: GET_COUNTRIES_FOR_CREATE_N_EDIT,
    countries
  };
}

export function GetCountriesAsync() {
  return dispatch => {
    // dispatch(actionOptions.ItemsAreLoadingAsync(true));
    axios
      .get("http://localhost:50691/api/countryApi/simple", {
        "Content-Type": "application/json",
        cancelToken: actionOptions.CreateCancelToken()
      })
      .then(response => {
        if (response.status === 200) {
          dispatch(GetCountries(response.data));
        }
        // dispatch(actionOptions.ItemsAreLoadingAsync(false));
      })
      .catch(err => {
        console.error(err);
        // ToDo
      });
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
    axios
      .post(apiUrl, city, { cancelToken: actionOptions.CreateCancelToken() })
      .then(response => {
        if (response.status === 200) {
          dispatch(CreateCity(response.data));
        } else {
          console.error("Something went wrong");
          // ToDo
        }
      })
      .catch(err => {
        console.error(err);
        // ToDo
      });
  };
}

function FindCity(city) {
  return {
    type: FIND_CITY,
    city
  };
}

export function FindCityAsync(id) {
  return dispatch => {
    dispatch(actionOptions.ItemsAreLoadingAsync(true));
    axios
      .get(apiUrl + id, {
        "Content-Type": "application/json",
        cancelToken: actionOptions.CreateCancelToken()
      })
      .then(response => {
        if (response.status === 200) {
          dispatch(FindCity(response.data));
        }
        dispatch(actionOptions.ItemsAreLoadingAsync(false));
      })
      .catch(err => {
        console.error(err);
        // ToDo
      });
  };
}

export function FindCityNoApiAsync(city) {
  return dispatch => {
    dispatch(actionOptions.ItemsAreLoadingAsync(true));
    dispatch(FindCity(city));
    dispatch(actionOptions.ItemsAreLoadingAsync(false));
  };
}

export function FindCityForEditAsync(id) {
  return dispatch => {
    dispatch(actionOptions.ItemsAreLoadingAsync(true));
    axios
      .get(apiUrl + "city/" + id, {
        "Content-Type": "application/json",
        cancelToken: actionOptions.CreateCancelToken()
      })
      .then(response => {
        if (response.status === 200) {
          dispatch(FindCity(response.data));
        }
        dispatch(actionOptions.ItemsAreLoadingAsync(false));
      })
      .catch(err => {
        console.error(err);
        // ToDo
      });
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
    dispatch(actionOptions.ItemsAreLoadingAsync(true));
    axios
      .put(apiUrl + city.City.Id, city, {
        cancelToken: actionOptions.CreateCancelToken()
      })
      .then(response => {
        if (response.status === 200) {
          dispatch(EditCity(city));
          dispatch(actionOptions.ItemsAreLoadingAsync(false));
        }
      })
      .catch(err => {
        console.error(err);
        // ToDo
      });
  };
}

export function EditCityPrepAsync(id) {
  return dispatch => {
    dispatch(GetCountriesAsync());
    dispatch(FindCityForEditAsync(id));
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
    dispatch(actionOptions.ItemsAreLoadingAsync(true));
    axios
      .put(
        apiUrl + "/add-people",
        { cityId: cityId, people: people },
        { cancelToken: actionOptions.CreateCancelToken() }
      )
      .then(response => {
        if (response.status === 200) {
          dispatch(AddPersonToCity(cityId, people));
          dispatch(actionOptions.ItemsAreLoadingAsync(false));
        }
      })
      .catch(err => {
        console.error(err);
        // ToDo
      });
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
    // dispatch(actionOptions.ItemsAreLoadingAsync(true));
    axios
      .delete(apiUrl + id, { cancelToken: actionOptions.CreateCancelToken() })
      .then(response => {
        if (response.status === 200) {
          dispatch(DeleteCity(id));
        }
        // dispatch(actionOptions.ItemsAreLoadingAsync(false));
      })
      .catch(err => {
        console.error(err);
        // ToDo
      });
  };
}
