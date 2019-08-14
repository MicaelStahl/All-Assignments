import axios from "axios";

// ----- Country ----- \\

export const ALL_COUNTRIES = "ALL_COUNTRIES";
export const CREATE_COUNTRY = "CREATE_COUNTRY";
export const FIND_COUNTRY = "FIND_COUNTRY";
export const EDIT_COUNTRY = "EDIT_COUNTRY";
export const ADD_CITY_TO_COUNTRY = "ADD_CITY_TO_COUNTRY";
export const DELETE_COUNTRY = "DELETE_COUNTRY";
export const ITEMS_ARE_LOADING = "ITEMS_ARE_LOADING";

const apiUrl = "http://localhost:50691/api/countryApi/";

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

function ItemsAreLoading(isLoading = false) {
  return {
    type: ITEMS_ARE_LOADING,
    isLoading
  };
}

function AllCountries(countries) {
  return {
    type: ALL_COUNTRIES,
    countries
  };
}

export function AllCountriesAsync() {
  return dispatch => {
    dispatch(ItemsAreLoading(true));
    setTimeout(() => {
      axios
        .get(apiUrl, {
          "Content-Type": "application/json",
          cancelToken: source.token
        })
        .then(response => {
          if (response.status === 200) {
            dispatch(AllCountries(response.data));
          }
          dispatch(ItemsAreLoading(false));
        })
        .catch(err => {
          console.error(err);
          // ToDo
        });
    }, 200);
  };
}

function CreateCountry(country) {
  return {
    type: CREATE_COUNTRY,
    country: country
  };
}

export function CreateCountryAsync(country) {
  return dispatch => {
    axios
      .post(apiUrl, country, { cancelToken: source.token })
      .then(response => {
        if (response.status === 200) {
          dispatch(CreateCountry(country));
        }
      })
      .catch(err => {
        console.error(err);
        // ToDo
      });
  };
}

function FindCountry(country) {
  return {
    type: FIND_COUNTRY,
    country
  };
}

export function FindCountryAsync(id) {
  return dispatch => {
    dispatch(ItemsAreLoading(true));
    axios
      .get(apiUrl + id, {
        "Content-Type": "application/json",
        cancelToken: source.token
      })
      .then(response => {
        if (response.status === 200) {
          dispatch(FindCountry(response.data));
        }
        dispatch(ItemsAreLoading(false));
      })
      .catch(err => {
        console.error(err);
        // ToDo
      });
  };
}

export function FindCountryForEditAsync(country) {
  return dispatch => {
    dispatch(ItemsAreLoading(true));
    dispatch(FindCountry(country));
    dispatch(ItemsAreLoading(false));
  };
}

function EditCountry(country) {
  return {
    type: EDIT_COUNTRY,
    country: country
  };
}

export function EditCountryAsync(country) {
  return dispatch => {
    axios
      .put(apiUrl + country.id, country, { cancelToken: source.token })
      .then(response => {
        if (response.status === 200) {
          dispatch(EditCountry(country));
        }
      })
      .catch(err => {
        console.error(err);
        // ToDo
      });
  };
}

function AddCityToCountry(countryId, cities) {
  return {
    type: ADD_CITY_TO_COUNTRY,
    countryId: countryId,
    cities: cities
  };
}

// Fix later
export function AddCityToCountryAsync(countryId, cities) {
  return dispatch => {
    setTimeout(() => {
      dispatch(AddCityToCountry(countryId, cities));
    }, 1000);
  };
}

function DeleteCountry(id) {
  return {
    type: DELETE_COUNTRY,
    id: id
  };
}

export function DeleteCountryAsync(id) {
  return dispatch => {
    dispatch(ItemsAreLoading(true));
    axios
      .delete(apiUrl + id, { cancelToken: source.token })
      .then(response => {
        if (response.status === 200) {
          dispatch(DeleteCountry(id));
        }
        dispatch(ItemsAreLoading(false));
      })
      .catch(err => {
        console.error(err);
        // ToDo
      });
  };
}
