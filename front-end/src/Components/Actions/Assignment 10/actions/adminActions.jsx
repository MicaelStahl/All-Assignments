import axios from "axios";

import * as actionOptions from "./optionsActions";
import * as actionIdentity from "./identityActions";

export const ADMIN_CREATE_USER = "ADMIN_CREATE_USER";
export const ADMIN_GET_USERS = "ADMIN_GET_USERS";
export const ADMIN_GET_USER = "ADMIN_GET_USER";
export const ADMIN_EDIT_USER = "ADMIN_EDIT_USER";
export const ADMIN_EDIT_USER_PASSWORD = "ADMIN_EDIT_USER_PASSWORD";
export const ADMIN_DELETE_USER = "ADMIN_DELETE_USER";

const adminUrl = "http://localhost:50691/api/adminApi/";

//#region ADMIN

//#region CreateUser

// function AdminCreateUser(user) {
//   return {
//     type: ADMIN_CREATE_USER,
//     user
//   };
// }

export function AdminCreateUserAsync(user10) {
  return dispatch => {
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

    const admin = actionOptions.GetAdmin();

    const user = {
      AdminId: admin.AdminId,
      AdminToken: admin.AdminToken,
      UserName: user10.UserName,
      FirstName: user10.FirstName,
      LastName: user10.LastName,
      Age: user10.Age,
      Email: user10.Email,
      Password: user10.Password,
      ComparePassword: user10.ComparePassword,
      UserToken: user10.UserToken, // Will always be null.
      Admin: user10.Admin
    };
    console.log("[handleAdminSubmit]", user);

    axios
      .post(adminUrl + "create-user", user, {
        cancelToken: actionOptions.CreateCancelToken(),
        validateStatus: function(status) {
          return status <= 500;
        }
      })
      .then(response => {
        if (response.status === 200) {
          const newAdmin = {
            adminId: response.data.adminId,
            adminToken: response.data.adminToken,
            frontEndToken: response.data.frontEndToken
          };

          actionOptions.SaveAdminToLocal(newAdmin);
          dispatch(actionIdentity.UpdateUser(response.data.user));
        } else if ((response.status === 404) | 400) {
          dispatch(actionOptions.ErrorMessageAsync(response.data));
        } else if (response.status === 401) {
          // ToDo
        } else {
          dispatch(actionOptions.ErrorMessageAsync(response.data));
        }
        dispatch(actionOptions.ItemsAreLoadingAsync(false));
      })
      .catch(err => {
        console.error(err);
        dispatch(actionOptions.ErrorMessageAsync(err));
      });
  };
}

//#endregion

//#region GetUser

// function AdminGetUser(user) {
//   return {
//     type: ADMIN_GET_USER,
//     user
//   };
// }

export function AdminGetUserAsync(userId, users = []) {
  return dispatch => {
    console.log(userId);
    const user = users.filter(x => x.userId === userId);

    // If the user exists in the redux state, then dispatch the user.
    if (user !== undefined || user !== []) {
      dispatch(actionIdentity.UpdateUser(user));
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
            console.log(response.data);
            dispatch(actionIdentity.UpdateUser(response.data.user));
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

//#endregion

//#region GetUsers

// function AdminGetUsers(users) {
//   return {
//     type: ADMIN_GET_USERS,
//     users
//   };
// }

export function AdminGetUsersAsync() {
  return dispatch => {
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
    const admin = actionOptions.GetAdmin();
    axios
      .post(adminUrl + "get-users/", admin, {
        cancelToken: actionOptions.CreateCancelToken(),
        validateStatus: function(status) {
          return status <= 500; // Reject only if the status code is greater than to 500
          // A 500+ error indicates that something went wrong server-side.
        }
      })
      .then(response => {
        if (response.status === 200) {
          console.log(response.data);
          const newAdmin = {
            adminId: response.data.adminId,
            adminToken: response.data.adminToken,
            frontEndToken: response.data.frontEndToken
          };
          actionOptions.SaveAdminToLocal(newAdmin);

          dispatch(actionIdentity.UpdateUserList(response.data.users));
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

//#endregion

//#region EditUser

// function AdminEditUser(users) {
//   return {
//     type: ADMIN_EDIT_USER,
//     users
//   };
// }

export function AdminEditUserAsync(userVM, users = []) {
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
      .put(adminUrl + "edit-user", userVM, {
        cancelToken: actionOptions.CreateCancelToken(),
        validateStatus: function(status) {
          return status <= 500;
        }
      })
      .then(response => {
        if (response.status === 200) {
          const index = users.findIndex(x => x.userId === userVM.userId);

          if (index !== -1) {
            users.splice(index, 1, userVM);
            dispatch(actionIdentity.UpdateUserList(users));
          } else {
            throw new Error("Something went wrong.");
          }
        } else if ((response.status === 400) | 404) {
          dispatch(actionOptions.ErrorMessageAsync(response.data));
        } else {
          dispatch(actionOptions.ErrorMessageAsync(response.data));
        }
      })
      .catch(err => {
        console.error(err);
        dispatch(actionOptions.ErrorMessageAsync(err));
      });
  };
}

//#endregion

//#region EditUserPassword

// function EditUserPassword(user) {
//   return {
//     type: ADMIN_EDIT_USER_PASSWORD,
//     user
//   };
// }

export function EditUserPasswordAsync(user, users = []) {
  return dispatch => {
    // ToDo
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
    const admin = actionOptions.GetAdmin();

    const changePassword = {
      AdminId: admin.AdminId,
      AdminToken: admin.AdminToken,
      UserId: user.userId,
      UserToken: null, // Might need to change this value later.
      NewPassword: user.newPassword,
      OldPassword: user.oldPassword,
      ComparePassword: user.comparePassword
    };

    // ToDo
  };
}

//#endregion

//#region DeleteUser

// function AdminDeleteUser(users) {
//   return {
//     type: ADMIN_DELETE_USER,
//     users
//   };
// }

export function AdminDeleteUserAsync(userId, users = []) {
  return dispatch => {
    const user = users.find(x => (x.userId = userId));

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
          dispatch(actionIdentity.UpdateUserList(users));
        } else {
          dispatch(actionOptions.ErrorMessageAsync(response.data));
        }
        dispatch(actionOptions.ItemsAreLoadingAsync(false));
      })
      .catch(err => {
        console.error(err);
        dispatch(actionOptions.ErrorMessageAsync(err));
      });
  };
}

//#endregion

//#endregion
