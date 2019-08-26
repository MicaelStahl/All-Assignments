import axios from "axios";

import * as actionOptions from "./optionsActions";
import * as actionIdentity from "./identityActions";
import * as actionAdmin from "./adminActions";

export const USER_DETAILS = "USER_DETAILS";
export const USER_EDIT = "USER_EDIT";
export const USER_EDIT_PASSWORD = "USER_EDIT_PASSWORD";
export const USER_DELETE = "USER_DELETE";

const userUrl = "http://localhost:50691/api/identityApi/";

//#region USERS

//#region UserDetails

export function UserDetailsAsync(userId, users = []) {
  return dispatch => {
    let userVM = users.find(x => x.userId === userId);
    if (userVM !== undefined) {
      dispatch(actionIdentity.UpdateUser(userVM));
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

      userVM = {
        UserToken: localStorage.getItem("userToken"),
        UserId: userId
      };

      userVM.userToken =
        localStorage.getItem("userToken") === undefined
          ? null
          : localStorage.getItem("userToken");

      axios
        .post(userUrl + "get-user", userVM, {
          cancelToken: actionOptions.CreateCancelToken(),
          validateStatus: function(status) {
            return status <= 500;
          }
        })
        .then(response => {
          if (response.status === 200) {
            dispatch(actionIdentity.UpdateUser(response.data));
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

//#region UserEdit

export function UserEditAsync(user, users = []) {
  return dispatch => {
    axios.interceptors.request.use(
      config => {
        const token = actionOptions.BackEndToken();

        if (token !== undefined || token !== null) {
          config.headers["Authentication"] = `Bearer ${token}`;
          config.headers["Access-Control-Allow-Origin"] = "*";
          config.headers["withCredentials"] = true;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
    const savedUser = actionOptions.GetUser();

    const user10 = {
      UserId: savedUser.UserId,
      UserToken: savedUser.UserToken,
      User: {
        UserId: user.UserId,
        UserName: user.UserName,
        FirstName: user.FirstName,
        LastName: user.LastName,
        Age: user.Age,
        Email: user.Email,
        IsAdmin: user.IsAdmin
      }
    };
    dispatch(actionOptions.ItemsAreLoadingAsync(true));
    axios
      .put(userUrl + "edit-user", user10, {
        cancelToken: actionOptions.CreateCancelToken(),
        validateStatus: function(status) {
          return status <= 500;
        }
      })
      .then(response => {
        if (response.status === 200) {
          const index = users.findIndex(x => x.userId === user10.userId);

          if (index === -1) {
            dispatch(actionAdmin.AdminGetUsersAsync());
          } else {
            users = users.splice(index, 1, response.data.user);
            dispatch(actionIdentity.UpdateUserList(users));
          }
        } else if ((response.status === 400) | 404) {
          dispatch(actionOptions.ErrorMessageAsync(response.data));
        } else {
          dispatch(actionOptions.ErrorMessageAsync("Something went wrong."));
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

//#region UserEditPassword

export function UserEditPasswordAsync(user) {
  return dispatch => {
    axios.interceptors.request.use(
      config => {
        const token = actionOptions.BackEndToken();

        if (token !== undefined || token !== null) {
          config.headers["Authentication"] = `Bearer ${token}`;
          config.headers["Access-Control-Allow-Origin"] = "*";
          config.headers["withCredentials"] = true;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    const storedUser = actionOptions.GetUser();

    const changePassword = {
      UserId: storedUser.UserId,
      UserToken: storedUser.UserToken,
      OldPassword: user.OldPassword,
      NewPassword: user.NewPassword,
      ComparePassword: user.ComparePassword
    };

    axios
      .patch(userUrl + "change-password", changePassword, {
        cancelToken: actionOptions.CreateCancelToken(),
        validateStatus: function(status) {
          return status <= 500;
        }
      })
      .then(response => {
        if (response.status === 200) {
          dispatch(actionIdentity.UpdateUser(response.data));
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

//#region UserDelete

function UserDelete(userId) {
  return {
    type: USER_DELETE,
    userId
  };
}

export function UserDeleteAsync(userId) {
  return dispatch => {
    axios.interceptors.request.use(
      config => {
        const token = actionOptions.BackEndToken();

        if (token !== undefined || token !== null) {
          config.headers["Authentication"] = `Bearer ${token}`;
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

    const user = actionOptions.GetUser();

    if (user.UserId !== userId) {
      throw new Error("Something went wrong. Please try again");
    } else {
      axios
        .delete(userUrl + "delete-user/" + userId + "/" + user.UserToken, {
          cancelToken: actionOptions.CreateCancelToken(),
          validateStatus: function(status) {
            return status <= 500;
          }
        })
        .then(response => {
          if (response.status === 200) {
            dispatch(UserDelete(userId));
          } else if ((response.status === 404) | 400) {
            dispatch(actionOptions.ErrorMessageAsync(response.data));
          } else {
            dispatch(actionOptions.ErrorMessageAsync("Something went wrong."));
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

//#endregion
