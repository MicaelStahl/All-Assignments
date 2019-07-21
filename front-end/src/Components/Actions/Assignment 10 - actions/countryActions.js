// ----- Country ----- \\

export const ALL_COUNTRIES = "ALL_COUNTRIES";
export const CREATE_COUNTRY = "CREATE_COUNTRY";
export const FIND_COUNTRY = "FIND_COUNTRY";
export const EDIT_COUNTRY = "EDIT_COUNTRY";
export const ADD_CITY_TO_COUNTRY = "ADD_CITY_TO_COUNTRY";
export const DELETE_COUNTRY = "DELETE_COUNTRY";

function AllCountries() {
  return {
    type: ALL_COUNTRIES
  };
}

export function AllCountriesAsync() {
  return dispatch => {
    setTimeout(() => {
      dispatch(AllCountries());
    }, 1000);
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
    setTimeout(() => {
      dispatch(CreateCountry(country));
    }, 1000);
  };
}

function FindCountry(id) {
  return {
    type: FIND_COUNTRY,
    id: id
  };
}

export function FindCountryAsync(id) {
  return dispatch => {
    setTimeout(() => {
      dispatch(FindCountry(id));
    }, 1000);
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
    setTimeout(() => {
      dispatch(EditCountry(country));
    }, 1000);
  };
}

function AddCityToCountry(id, city) {
  return {
    type: ADD_CITY_TO_COUNTRY,
    id: id,
    city: city
  };
}

export function AddCityToCountryAsync(id, city) {
  return dispatch => {
    setTimeout(() => {
      dispatch(AddCityToCountry(id, city));
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
    setTimeout(() => {
      dispatch(DeleteCountry(id));
    }, 1000);
  };
}
