import axios from "axios";

export const LOADING = "LOADING";
export const ERROR = "ERROR";

export function CreateCancelToken() {
  const cancelToken = axios.CancelToken;
  const Source = cancelToken.source();
  return Source.token;
}

export function GetUser() {
  return {
    UserId: localStorage.getItem("userId"),
    UserToken: localStorage.getItem("userToken"),
    ErrorMessage: null
  };
}

function ItemsAreLoading(isLoading) {
  return {
    type: LOADING,
    isLoading
  };
}

export function ItemsAreLoadingAsync(isLoading = false) {
  return dispatch => {
    dispatch(ItemsAreLoading(isLoading));
  };
}

function ErrorMessage(errorMessage) {
  return {
    type: ERROR,
    errorMessage
  };
}

export function ErrorMessageAsync(errorMessage = "Something went wrong") {
  return dispatch => {
    dispatch(ErrorMessage(errorMessage));
  };
}
