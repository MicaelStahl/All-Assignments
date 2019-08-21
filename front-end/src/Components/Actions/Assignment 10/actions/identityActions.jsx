import axios from "axios";

import * as actionOptions from "./optionsActions";

export const REGISTER = "REGISTER";
export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";

const apiUrl = "http://localhost:50691/api/identityApi/";

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
        cancelToken: actionOptions.CreateCancelToken(),
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
          dispatch(
            actionOptions.ErrorMessageAsync(
              "Something went wrong. Please try again"
            )
          );
        } else if (response.status === 400) {
          dispatch(actionOptions.ErrorMessageAsync(response.data));
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

function SignIn(roles) {
  return {
    type: SIGN_IN,
    roles
  };
}

export function SignInAsync(user10) {
  return dispatch => {
    dispatch(actionOptions.ItemsAreLoadingAsync(true));
    axios
      .post(apiUrl + "signin", user10, {
        cancelToken: actionOptions.CreateCancelToken(),
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
          if (response.data.roles.includes("Administrator")) {
            const admin = {
              adminId: response.data.userId,
              adminToken: response.data.userToken,
              frontEndToken: response.data.tokenToken
            };
            dispatch(actionOptions.SaveAdminToLocal(admin));
          } else {
            const user = {
              userId: response.data.userId,
              userToken: response.data.userToken,
              tokenToken: response.data.tokenToken
            };
            dispatch(actionOptions.SaveUserToLocal(user));
          }
          dispatch(SignIn(response.data.roles));
        } else if (response.status === 404 || response.status === 400) {
          dispatch(actionOptions.ErrorMessageAsync(response.data));
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

    const userVM = actionOptions.GetUser();

    axios
      .post(apiUrl + "signout", userVM, {
        cancelToken: actionOptions.CreateCancelToken(),
        validateStatus: function(status) {
          return status <= 500; // Reject only if the status code is greater than or equal to 500
          // A 500+ error indicates that something went wrong server-side.
        }
      })
      .then(response => {
        if (response.status === 200) {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          localStorage.removeItem("backend-token");
          localStorage.removeItem("userToken");
          dispatch(SignOut(response.data));
        } else {
          dispatch(
            actionOptions.ErrorMessageAsync(
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
