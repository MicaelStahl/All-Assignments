import axios from "axios";

import * as actionOptions from "./optionsActions";

// Only for admin.
export const ADMIN_GET_USERS = "ADMIN_GET_USERS";
export const ADMIN_GET_USER = "ADMIN_GET_USER";
export const ADMIN_EDIT_USER = "ADMIN_EDIT_USER";
export const ADMIN_EDIT_USER_PASSWORD = "ADMIN_EDIT_USER_PASSWORD";
export const ADMIN_DELETE_USER = "ADMIN_DELETE_USER";

// For all users.
export const USER_DETAILS = "USER_DETAILS";
export const USER_EDIT = "USER_EDIT";
export const USER_EDIT_PASSWORD = "USER_EDIT_PASSWORD";
export const USER_DELETE = "USER_DELETE";

const apiUrl = "http://localhost:50691/api/adminApi/";

function AdminGetUser(user) {
  return {
    type: ADMIN_GET_USER,
    user
  };
}

export function AdminGetUserAsync(userId, users = []) {
  return dispatch => {
    const user = users.filter(x => x.userId === userId);

    // If the user exists in the redux state, then dispatch the user.
    if (user !== undefined) {
      dispatch(AdminGetUser(user));
    }
    // Else if the user doesn't exist in the redux state, then call the backend for the user.
    // If it doesn't exist in the backend either, return a 404 not found.
    else {
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
      dispatch(actionOptions.ItemsAreLoadingAsync(true));
      axios
        .get(apiUrl + "get-user/" + userId, {
          "Content-Type": "application/json",
          cancelToken: actionOptions.CreateCancelToken(),
          validateStatus: function(status) {
            return status < 500;
          }
        })
        .then(response => {
          if (response.status === 200) {
            dispatch(AdminGetUser(response.data));
          } else if (response.status === 404 || response.status === 400) {
            dispatch(actionOptions.ErrorMessageAsync(response.data));
          } else if (response.status === 401) {
            dispatch(
              actionOptions.ErrorMessageAsync(
                "User does not have access to this content."
              )
            );
          } else {
            console.error(response.data);
            dispatch(actionOptions.ErrorMessageAsync());
          }
          dispatch(actionOptions.ItemsAreLoadingAsync(false));
        })
        .catch(err => {
          console.error(err);
          dispatch(actionOptions.ErrorMessageAsync(err));
        });
    }
  };
}

function AdminGetUsers(users) {
  return {
    type: ADMIN_GET_USERS,
    users
  };
}

export function AdminGetUsersAsync() {
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

    axios
      .get(apiUrl + "get-users", {
        cancelToken: actionOptions.CreateCancelToken(),
        validateStatus: function(status) {
          return status <= 500; // Reject only if the status code is greater than to 500
          // A 500+ error indicates that something went wrong server-side.
        }
      })
      .then(response => {
        if (response.status === 200) {
          dispatch(AdminGetUsers(response.data));
        } else if (response.status === 401) {
          dispatch(
            actionOptions.ErrorMessageAsync(
              "User is not authorized to access this information."
            )
          );
        }
        dispatch(actionOptions.ItemsAreLoadingAsync(false));
      })
      .catch(err => {
        console.error(err);
        dispatch(actionOptions.ErrorMessageAsync(err));
      });
  };
}
