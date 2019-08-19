import axios from "axios";

// Only for admin.
export const ADMIN_DETAILS_USER = "ADMIN_DETAILS_USER";
export const ADMIN_EDIT_USER = "ADMIN_EDIT_USER";
export const ADMIN_EDIT_USER_PASSWORD = "ADMIN_EDIT_USER_PASSWORD";
export const ADMIN_DELETE_USER = "ADMIN_DELETE_USER";

// For all users.
export const USER_DETAILS = "USER_DETAILS";
export const USER_EDIT = "USER_EDIT";
export const USER_EDIT_PASSWORD = "USER_EDIT_PASSWORD";
export const USER_DELETE = "USER_DELETE";

const apiUrl = "http://localhost:50691/api/identityApi/";

function AdminDetailsUser(user) {
  return {
    type: ADMIN_DETAILS_USER,
    user
  };
}

export function AdminDetailsUserAsync(userId, users = []) {
  return dispatch => {
    const user = users.filter(x => x.userId === userId);

    // If the user exists in the redux state, then dispatch the user.
    if (user !== undefined) {
      dispatch(AdminDetailsUser(user));
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
      axios.post(apiUrl);
    }
  };
}
