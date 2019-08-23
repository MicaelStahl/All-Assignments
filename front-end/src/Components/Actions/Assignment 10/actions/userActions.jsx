import axios from "axios";

import * as actionOptions from "./optionsActions";
import * as actionIdentity from "./identityActions";

export const USER_DETAILS = "USER_DETAILS";
export const USER_EDIT = "USER_EDIT";
export const USER_EDIT_PASSWORD = "USER_EDIT_PASSWORD";
export const USER_DELETE = "USER_DELETE";

const userUrl = "http://localhost:50691/api/identityApi/";

//#region USERS

//#region UserDetails

export function UserDetailsAsync(userId, users = []) {
  return dispatch => {
    console.log(userId);
    let userVM = users.find(x => x.userId === userId);
    console.log(userVM);
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

      if (userVM === undefined) {
        userVM = {
          UserToken: localStorage.getItem("userToken"),
          UserId: userId
        };
      }

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

    axios
      .put(userUrl + "edit-user", user10, {
        cancelToken: actionOptions.CreateCancelToken(),
        validateStatus: function(status) {
          return status <= 500;
        }
      })
      .then(response => {
        if (response.data === 200) {
          const index = users.findIndex(x => x.userId === user10.userId);

          if (index === -1) {
            dispatch();
          }
        }
      });
  };
}

//#endregion

//#endregion
