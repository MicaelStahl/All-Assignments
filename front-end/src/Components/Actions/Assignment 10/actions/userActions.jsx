import axios from "axios";

import * as actionOptions from "./optionsActions";

export const USER_DETAILS = "USER_DETAILS";
export const USER_EDIT = "USER_EDIT";
export const USER_EDIT_PASSWORD = "USER_EDIT_PASSWORD";
export const USER_DELETE = "USER_DELETE";

const userUrl = "http://localhost:50691/api/identityApi/";

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
