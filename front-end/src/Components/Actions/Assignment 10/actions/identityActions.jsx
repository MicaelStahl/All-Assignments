import axios from "axios";

import * as actionOptions from "./optionsActions";

export const REGISTER = "REGISTER";
export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";
export const UPDATE_USERLIST = "UPDATE_USERLIST";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";
export const ADMIN_DELETE_USER = "ADMIN_DELETE_USER";

const apiUrl = "http://localhost:50691/api/identityApi/";

export function AdminDeleteUser(userId) {
  return {
    type: ADMIN_DELETE_USER,
    userId
  };
}

export function DeleteUser(userId) {
  return {
    type: DELETE_USER,
    userId
  };
}

export function UpdateUser(user) {
  return {
    type: UPDATE_USER,
    user
  };
}

export function UpdateUserList(users) {
  return {
    type: UPDATE_USERLIST,
    users
  };
}

function Register(success) {
  return {
    type: REGISTER,
    success
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
          dispatch(Register(response.data));
        } else if (response.status === 204) {
          dispatch(actionOptions.ErrorMessageAsync(response.data));
        } else if (response.status === 400) {
          dispatch(actionOptions.ErrorMessageAsync(response.data));
        } else {
          throw Error(response.data);
        }

        dispatch(actionOptions.ItemsAreLoadingAsync(false));
      })
      .catch(err => {
        console.error(err);
        dispatch(actionOptions.ErrorMessageAsync(err));
      });
  };
}

function SignIn(roles = []) {
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
              frontEndToken: response.data.frontEndToken
            };
            dispatch(actionOptions.SaveAdminToLocal(admin));
          } else {
            const user = {
              userId: response.data.userId,
              userToken: response.data.userToken,
              frontEndToken: response.data.frontEndToken
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
        } else {
          console.error("Error:", err);
        }
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
