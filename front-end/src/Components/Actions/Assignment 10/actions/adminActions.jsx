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
      IsAdmin: user10.IsAdmin
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
    const user = users.find(x => x.userId === userId);

    // If the user exists in the redux state, then dispatch the user.
    if (user !== undefined) {
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

      const getAdmin = actionOptions.GetAdmin();

      const admin = {
        AdminId: getAdmin.AdminId,
        AdminToken: getAdmin.AdminToken,
        UserId: userId
      };

      axios
        .post(adminUrl + "get-user", admin, {
          cancelToken: actionOptions.CreateCancelToken(),
          validateStatus: function(status) {
            return status < 500;
          }
        })
        .then(response => {
          if (response.status === 200) {
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

export function AdminEditUserAsync(user, users = []) {
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

    const admin = actionOptions.GetAdmin();

    const userVM = {
      User: {
        UserId: user.UserId,
        UserName: user.UserName,
        FirstName: user.FirstName,
        LastName: user.LastName,
        Age: user.Age,
        Email: user.Email,
        IsAdmin: user.IsAdmin,
        Roles: user.Roles
      },
      AdminId: admin.AdminId,
      AdminToken: admin.AdminToken
    };

    console.log(userVM);

    axios
      .put(adminUrl + "edit-user", userVM, {
        cancelToken: actionOptions.CreateCancelToken(),
        validateStatus: function(status) {
          return status <= 500;
        }
      })
      .then(response => {
        if (response.status === 200) {
          const index = users.findIndex(x => x.userId === userVM.UserId);
          if (index !== -1) {
            users.splice(index, 1, userVM);
            dispatch(actionIdentity.UpdateUserList(users));
            dispatch(actionIdentity.UpdateUser(response.data));
          } else {
            dispatch(AdminGetUsersAsync());
          }
        } else if ((response.status === 400) | 404) {
          dispatch(actionOptions.ErrorMessageAsync(response.data));
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

//#region EditUserPassword

// function EditUserPassword(user) {
//   return {
//     type: ADMIN_EDIT_USER_PASSWORD,
//     user
//   };
// }

export function EditUserPasswordAsync(user) {
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
    dispatch(actionOptions.ItemsAreLoadingAsync(true));

    const admin = actionOptions.GetAdmin();

    const changePassword = {
      AdminId: admin.AdminId,
      AdminToken: admin.AdminToken,
      UserId: user.UserId,
      UserToken:
        (admin.AdminId === user.UserId) === true ? admin.AdminToken : null,
      NewPassword: user.NewPassword,
      OldPassword: user.OldPassword,
      ComparePassword: user.ComparePassword
    };

    axios
      .patch(adminUrl + "change-password", changePassword, {
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
        } else {
          dispatch(actionOptions.ErrorMessageAsync(response.data));
        }
        dispatch(actionOptions.ItemsAreLoadingAsync(false));
      })
      .catch(err => {
        console.error(err);
        dispatch(actionOptions.ErrorMessageAsync(err));
      });
    // ToDo
  };
}

//#endregion

//#region DeleteUser

// function AdminDeleteUser(userId) {
//   return {
//     type: ADMIN_DELETE_USER,
//     userId
//   };
// }

export function AdminDeleteUserAsync(userId) {
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

    const admin = actionOptions.GetAdmin();

    const verificationVM = {
      UserId: userId,
      AdminId: admin.AdminId,
      AdminToken: admin.AdminToken
    };

    // const adminId = admin.AdminId;
    // const adminToken = admin.AdminToken;

    axios
      // .delete(`${adminUrl}${userId}/${adminId}/${adminToken}`, {
      .post(adminUrl + "delete-user", verificationVM, {
        cancelToken: actionOptions.CreateCancelToken(),
        validateStatus: function(status) {
          return status <= 500;
        }
      })
      .then(response => {
        if (response.status === 200) {
          dispatch(AdminGetUsersAsync());
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
