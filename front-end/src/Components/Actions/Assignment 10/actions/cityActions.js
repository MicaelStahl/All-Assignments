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
    cities,
    status
  };
}

export function AllCitiesAsync() {
  return dispatch => {
    setTimeout(() => {
      dispatch(ItemsAreLoading(true));
      Axios.get(apiUrl + "cities", { "Content-Type": "application/json" })
        .then(response => {
          console.log("[Response]", response.data);
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
    dispatch(ItemsAreLoading(true));
    Axios.post(apiUrl + city.city.Id, city)
      .then(response => {
        if (response.status === 200) {
          dispatch(CreateCity(city));
          dispatch(ItemsAreLoading(false));
        }
      })
      .catch(err => {
        console.error(err);
        // ToDo
      });
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
    dispatch(ItemsAreLoading(true));
    setTimeout(() => {
      Axios.get(apiUrl + id)
        .then(response => {
          if (response.status === 200) {
            dispatch(FindCity(id));
            dispatch(ItemsAreLoading(false));
          }
        })
        .catch(err => {
          console.error(err);
          // ToDo
        });
    }, 100);
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
    dispatch(ItemsAreLoading(true));
    Axios.put(apiUrl + city.city.Id, city)
      .then(response => {
        if (response.status === 200) {
          dispatch(EditCity(city));
          dispatch(ItemsAreLoading(false));
        }
      })
      .catch(err => {
        console.error(err);
        // ToDo
      });
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
    dispatch(ItemsAreLoading(true));
    Axios.put(apiUrl + "/add-people", { cityId: cityId, people: people })
      .then(response => {
        if (response.status === 200) {
          dispatch(AddPersonToCity(cityId, people));
          dispatch(ItemsAreLoading(false));
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
    dispatch(ItemsAreLoading(true));
    Axios.delete(apiUrl + id)
      .then(response => {
        if (response.status === 200 && response.data === true) {
          dispatch(DeleteCity(id));
          dispatch(ItemsAreLoading(false));
        }
      })
      .catch(err => {
        console.error(err);
        // ToDo
      });
  };
}
