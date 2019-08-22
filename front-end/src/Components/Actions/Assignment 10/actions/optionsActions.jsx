import axios from "axios";

export const LOADING = "LOADING";
export const ERROR = "ERROR";
export const SAVE_ADMIN_TO_LOCAL = "SAVE_ADMIN_TO_LOCAL";
export const SAVE_USER_TO_LOCAL = "SAVE_USER_TO_LOCAL";

export function CreateCancelToken() {
  const cancelToken = axios.CancelToken;
  const Source = cancelToken.source();
  return Source.token;
}

export function BackEndToken() {
  return localStorage.getItem("backend-token");
}

export function SaveAdminToLocal(admin) {
  return {
    type: SAVE_ADMIN_TO_LOCAL,
    admin
  };
}

export function SaveUserToLocal(user) {
  return {
    type: SAVE_USER_TO_LOCAL,
    user
  };
}

export function GetAdmin() {
  return {
    AdminId: localStorage.getItem("userId"),
    AdminToken: localStorage.getItem("userToken")
    // FrontEndToken: localStorage.getItem("backend-token")
  };
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
