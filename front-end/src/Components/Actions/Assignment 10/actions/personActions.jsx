// ----- Person ----- \\

import axios from "axios";

import * as actionOptions from "./optionsActions";

export const ALL_PEOPLE = "ALL_PEOPLE";
export const CREATE_PERSON = "CREATE_PERSON";
export const FIND_PERSON = "FIND_PERSON";
export const FIND_PERSON_TO_EDIT = "FIND_PERSON_TO_EDIT";
export const EDIT_PERSON = "EDIT_PERSON";
export const DELETE_PERSON = "DELETE_PERSON";
export const ERROR404MESSAGE = "ERROR404MESSAGE";
export const GET_ALL_CITIES = "GET_ALL_CITIES";

const apiUrl = "http://localhost:50691/api/PersonApi/";

//#region Error404

function Error404(err = "404 Error", status) {
  return {
    type: ERROR404MESSAGE,
    error: err,
    status
  };
}

//#endregion

//#region AllPeople

function AllPeople(allPeople, status) {
  return {
    type: ALL_PEOPLE,
    allPeople,
    status
  };
}

export function AllPeopleAsync() {
  return dispatch => {
    dispatch(actionOptions.ItemsAreLoadingAsync(true));
    setTimeout(() => {
      axios
        .get(apiUrl, {
          "Content-Type": "application/json",
          cancelToken: actionOptions.CreateCancelToken()
        })
        .then(response => {
          console.log("[Response]", response);
          if (response.status === 200) {
            dispatch(AllPeople(response.data, response.status));
          } else {
            dispatch(
              Error404(
                "Could not find any people. Please try again.",
                response.status
              )
            );
          }
        })
        .catch(err => {
          dispatch(Error404(err, 400));
        });
      dispatch(actionOptions.ItemsAreLoadingAsync(false));
    }, 200);
  };
}

//#endregion

//#region Create

function CreatePerson(person, status) {
  return {
    type: CREATE_PERSON,
    person,
    status
  };
}

export function CreatePersonAsync(person, cityId) {
  return dispatch => {
    dispatch(actionOptions.ItemsAreLoadingAsync(true));
    axios
      .post(
        apiUrl,
        { person: person, cityId: cityId },
        {
          cancelToken: actionOptions.CreateCancelToken()
        }
      )
      .then(response => {
        if (response.status === 200) {
          dispatch(CreatePerson(response.data, response.status));
        } else if (response.status === 204) {
          dispatch(
            Error404(
              "The requested person could not be created. Please try again.",
              response.status
            )
          );
        } else {
          dispatch(
            Error404(
              response.statusText !== "No Content"
                ? "Something went wrong. Please try again"
                : response.statusText,
              response.status
            )
          );
        }
        dispatch(actionOptions.ItemsAreLoadingAsync(false));
      })
      .catch(err => {
        console.error(err);
      });
  };
}

//#endregion

//#region FindPerson

function FindPerson(person, status) {
  return {
    type: FIND_PERSON,
    person,
    status
  };
}

export function FindPersonAsync(id) {
  return dispatch => {
    dispatch(actionOptions.ItemsAreLoadingAsync(true));
    axios
      .get(apiUrl + id, {
        "Content-Type": "application/json",
        cancelToken: actionOptions.CreateCancelToken()
      })
      .then(response => {
        console.log("[Response]", response);
        if (response.status === 200) {
          dispatch(FindPerson(response.data, response.status));
          dispatch(actionOptions.ItemsAreLoadingAsync(false));
        } else {
          dispatch(
            Error404(
              "Could not find the requested person. Please try again.",
              response.status
            )
          );
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
}

export function FindPersonToEditAsync(id) {
  return dispatch => {
    dispatch(AllCitiesAsync());
    dispatch(FindPersonAsync(id));
  };
}

//#endregion

//#region AllCities

function AllCities(cities, status) {
  return {
    type: GET_ALL_CITIES,
    cities,
    status
  };
}

export function AllCitiesAsync() {
  return dispatch => {
    // dispatch(actionOptions.ItemsAreLoadingAsync(true));
    axios
      .get("http://localhost:50691/api/cityApi/", {
        cancelToken: actionOptions.CreateCancelToken()
      })
      .then(response => {
        console.log("[Response]", response);
        if (response.data !== null) {
          dispatch(AllCities(response.data, response.status));
        } else {
          dispatch(
            Error404(
              "Couldn't find any cities. Please try again.",
              response.status
            )
          );
        }
        // dispatch(actionOptions.ItemsAreLoadingAsync(false));
      })
      .catch(err => {
        console.error(err);
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
  return dispatch => {
    dispatch(actionOptions.ItemsAreLoadingAsync(true));
    console.log("[EditPersonAsync]", person);
    axios
      .put(apiUrl + person.Person.Id, person, {
        cancelToken: actionOptions.CreateCancelToken()
      })
      .then(response => {
        console.log("[Response]", response);
        if (response.status === 200) {
          dispatch(EditPerson(response.data));
        } else if (response.status === 204) {
          dispatch(
            Error404(
              "Something went wrong when updating the person. Please try again.",
              response.status
            )
          );
        } else {
          dispatch(
            Error404("Something went wrong, Please try again.", response.status)
          );
        }
      })
      .catch(err => {
        console.error(err);
        dispatch(Error404(err));
      });
    dispatch(actionOptions.ItemsAreLoadingAsync(false));
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
  return dispatch => {
    axios
      .delete(apiUrl + id, { cancelToken: actionOptions.CreateCancelToken() })
      .then(response => {
        console.log("[Response]", response);
        if (response.status === 200) {
          dispatch(DeletePerson(id));
        } else {
          dispatch(
            Error404("Could not remove the requested person. Please try again.")
          );
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
}

//#endregion
