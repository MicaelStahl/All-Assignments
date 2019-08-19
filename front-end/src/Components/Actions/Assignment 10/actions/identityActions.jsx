import axios from "axios";

import * as actionOptions from "./optionsActions";

export const REGISTER = "REGISTER";
export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";
export const ERROR = "ERROR";
export const GET_USERS = "GET_USERS";

const apiUrl = "http://localhost:50691/api/identityApi/";

function CreateCancelToken() {
  const cancelToken = axios.CancelToken;
  const Source = cancelToken.source();
  return Source.token;
}

function GetUser() {
  return {
    UserId: localStorage.getItem("userId"),
    UserToken: localStorage.getItem("userToken"),
    ErrorMessage: null
  };
}

function GetUsers(users) {
  return {
    type: GET_USERS,
    users
  };
}

export function GetUsersAsync() {
  return dispatch => {
    dispatch(actionOptions.ItemsAreLoadingAsync(true));

    axios.interceptors.request.use(
      config => {
        const token = localStorage.getItem("backend-token");

        if (token !== undefined || token !== null) {
          config.headers["Authorization"] = `Bearer ${token}`;
          config.headers["Access-Control-Allow-Origin"] = "*";
          config.headers["withCredentials"] = true;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    const userVM = GetUser();

    axios
      .post(apiUrl + "users", userVM, {
        cancelToken: CreateCancelToken(),

        validateStatus: function(status) {
          return status < 500; // Reject only if the status code is greater than to 500
          // A 500+ error indicates that something went wrong server-side.
        }
      })
      .then(response => {
        if (response.status === 200) {
          dispatch(GetUsers(response.data));
        } else if (response.status === 401) {
          dispatch(
            ErrorHandling(
              "User is not in a high enough role to request this information."
            )
          );
        }
        dispatch(actionOptions.ItemsAreLoadingAsync(false));
      })
      .catch(err => {
        console.error(err);
        dispatch(ErrorHandling(err));
      });
  };
}

function Register(user) {
  return {
    type: REGISTER,
    user
  };
}

export function RegisterAsync(user) {
  return dispatch => {
    dispatch(actionOptions.ItemsAreLoadingAsync(true));
    axios
      .post(apiUrl + "register", user, {
        cancelToken: CreateCancelToken(),
        validateStatus: function(status) {
          return status < 500; // Reject only if the status code is greater than or equal to 500
          // A 500+ error indicates that something went wrong server-side.
        }
      })
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          dispatch(Register(user));
        } else if (response.status === 204) {
          dispatch(ErrorHandling("Something went wrong. Please try again"));
        } else if (response.status === 400) {
          dispatch(ErrorHandling(response.data));
        } else {
          throw Error("Something went wrong.");
        }

        dispatch(actionOptions.ItemsAreLoadingAsync(false));
      })
      .catch(err => {
        console.error(err);
        // ToDo
      });
  };
}

function SignIn(user) {
  return {
    type: SIGN_IN,
    user
  };
}

export function SignInAsync(user10) {
  return dispatch => {
    dispatch(actionOptions.ItemsAreLoadingAsync(true));
    axios
      .post(apiUrl + "signin", user10, {
        cancelToken: CreateCancelToken(),
        validateStatus: function(status) {
          return status < 500; // Reject only if the status code is greater than or equal to 500
          // A 500+ error indicates that something went wrong server-side.
        },
        auth: {
          username: user10.userName,
          password: user10.password
        }
      })
      .then(response => {
        console.log(response);
        if (response.status === 200 && response.data.userToken !== null) {
          localStorage.setItem("backend-token", response.data.tokenToken);
          localStorage.setItem("userToken", response.data.userToken);
          localStorage.setItem("userId", response.data.userId);

          dispatch(SignIn(response.data));
        } else if (response.status === 404 || response.status === 400) {
          dispatch(ErrorHandling(response.data));
        }
        dispatch(actionOptions.ItemsAreLoadingAsync(false));
      })
      .catch(err => {
        // ToDo
        if (err.status === "notfound") {
          console.error(err.statusText);
        }
        console.error("Error:", err);
        // ToDo
      });
  };
}

function SignOut(success = "") {
  return {
    type: SIGN_OUT,
    success
  };
}

// Later on this will require userToken and userId.
export function SignOutAsync() {
  return dispatch => {
    dispatch(actionOptions.ItemsAreLoadingAsync(true));
    axios.interceptors.request.use(
      config => {
        const token = localStorage.getItem("backend-token");

        if (token !== undefined || token !== null) {
          config.headers["Authorization"] = `Bearer ${token}`;
          config.headers["Access-Control-Allow-Origin"] = "*";
          config.headers["withCredentials"] = true;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    const userVM = GetUser();

    axios
      .post(apiUrl + "signout", userVM, {
        cancelToken: CreateCancelToken(),
        validateStatus: function(status) {
          return status <= 500; // Reject only if the status code is greater than or equal to 500
          // A 500+ error indicates that something went wrong server-side.
        }
        // Authorization: `Bearer ${token}`
        // "Access-Control-Allow-Origin": "*"
      })
      .then(response => {
        if (response.status === 200) {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          localStorage.removeItem("backend-token");
          localStorage.removeItem("userToken");
          console.log(localStorage.getItem("token"));
          dispatch(SignOut(response.data));
        } else {
          dispatch(
            ErrorHandling(
              (response.data === undefined) | null
                ? "Something went wrong."
                : response.data
            )
          );
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
}

function ErrorHandling(error = "Something went wrong.") {
  return {
    type: ERROR,
    error
  };
}
