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

const adminUrl = "http://localhost:50691/api/adminApi/";
const userUrl = "http://localhost:50691/api/identityApi/";

// ---------------------------------------- ADMIN ---------------------------------------- \\
//#region ADMIN

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
          const token = actionOptions.BackEndToken();

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
        .get(adminUrl + "get-user/" + userId, {
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
        const token = actionOptions.BackEndToken();

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
      .get(adminUrl + "get-users", {
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

function AdminDeleteUser(users) {
  return {
    type: ADMIN_DELETE_USER,
    users
  };
}

export function AdminDeleteUserAsync(userId, users = []) {
  return dispatch => {
    const user = users.find(x => (x.userId = userId));

    if (user !== undefined) {
      users = users.filter(x => x.userId !== user.userId);
      dispatch(AdminDeleteUser(users));
    } else {
      dispatch(actionOptions.ItemsAreLoadingAsync(true));

      axios.interceptors.request.use(
        config => {
          const token = actionOptions.BackEndToken();

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
        .delete(adminUrl + user.userId, {
          cancelToken: actionOptions.CreateCancelToken(),
          validateStatus: function(status) {
            return status <= 500;
          }
        })
        .then(response => {
          if (response.status === 200) {
            users = users.filter(x => x.userId !== userId);
            dispatch(AdminDeleteUser(users));
          } else {
            dispatch(actionOptions.ErrorMessageAsync(response.data));
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

//#endregion

// ---------------------------------------- USERS ---------------------------------------- \\
//#region USERS

function UserDetails(user) {
  return {
    type: USER_DETAILS,
    user
  };
}

export function UserDetailsAsync(userId, users = []) {
  return dispatch => {
    const userVM = users.filter(x => x.userId === userId);

    if (userVM !== undefined) {
      dispatch(UserDetails(userVM[0]));
    } else {
      dispatch(actionOptions.ItemsAreLoadingAsync(true));
      axios.interceptors.request.use(
        config => {
          const token = actionOptions.BackEndToken();

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

      userVM.userToken = localStorage.getItem("userToken");

      axios
        .post(userUrl + "get-user", userVM[0], {
          cancelToken: actionOptions.CreateCancelToken(),
          validateStatus: function(status) {
            return status <= 500;
          }
        })
        .then(response => {
          if (response.status === 200) {
            dispatch(UserDetails(response.data));
          } else if ((response.status === 404) | 400) {
            dispatch(actionOptions.ErrorMessageAsync(response.data));
          } else if (response.status === 401) {
            // ToDo
            // Make this show a message to the user, prompting the user to sign in.
            // If the user is signed in however, show a message that the user does not have
            // Authority to check this content (However that'd be possible)
          } else {
            dispatch(actionOptions.ErrorMessageAsync(response.data));
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

//#endregion
