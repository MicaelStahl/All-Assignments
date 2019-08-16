import axios from "axios";

export const REGISTER = "REGISTER";
export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";
export const LOADING = "LOADING";
export const ERROR = "ERROR";

const apiUrl = "http://localhost:50691/api/identityApi/";

function CreateCancelToken() {
  const cancelToken = axios.CancelToken;
  const Source = cancelToken.source();
  return Source.token;
}

function ItemsAreLoading(isLoading = false) {
  return {
    type: LOADING,
    isLoading
  };
}

function Register(user) {
  return {
    type: REGISTER,
    user
  };
}

export function RegisterAsync(user) {
  return dispatch => {
    dispatch(ItemsAreLoading(true));
    axios
      .post(apiUrl + "register", user, {
        cancelToken: CreateCancelToken(),
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
          dispatch(ErrorHandling("Something went wrong. Please try again"));
        } else if (response.status === 400) {
          dispatch(ErrorHandling(response.data));
        } else {
          throw Error("Something went wrong.");
        }

        dispatch(ItemsAreLoading(false));
      })
      .catch(err => {
        console.error(err);
        // ToDo
      });
  };
}

function SignIn(user) {
  return {
    type: SIGN_IN,
    user
  };
}

export function SignInAsync(user10) {
  return dispatch => {
    dispatch(ItemsAreLoading(true));
    console.log(localStorage.getItem("token"));
    axios
      .post(apiUrl + "signin", user10, {
        cancelToken: CreateCancelToken(),
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
          localStorage.setItem("token", response.data.userToken);
          localStorage.setItem("userId", response.data.userId);

          dispatch(SignIn(response.data));
        } else if (response.status === 404 || response.status === 400) {
          dispatch(ErrorHandling(response.data));
        }
        dispatch(ItemsAreLoading(false));
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

// Later on this will required userToken and userId.
export function SignOutAsync() {
  return dispatch => {
    dispatch(ItemsAreLoading(true));
    axios.interceptors.request.use(
      config => {
        const token = localStorage.getItem("token");

        console.log("[Token]", token);
        if (token !== undefined || token !== null) {
          config.headers["Authorization"] = `Bearer ${token}`;
          config.headers["Access-Control-Allow-Origin"] = "*";
          // config.headers["withCredentials"] = true;
          // config.headers["Content-Type"] = "x-www-form-urlencoded";
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
    const userVM = {
      UserId: localStorage.getItem("userId"),
      UserToken: localStorage.getItem("token"),
      ErrorMessage: null
    };
    // const token = localStorage.getItem("token");
    // console.log("[Token]", token);
    axios
      .post(apiUrl + "signout", userVM, {
        cancelToken: CreateCancelToken(),
        validateStatus: function(status) {
          return status <= 500; // Reject only if the status code is greater than or equal to 500
          // A 500+ error indicates that something went wrong server-side.
        }
        // withCredentials: true
        // "Content-Type": "x-www-form-urlencoded",
        // Authorization: `Bearer ${token}`
        // "Access-Control-Allow-Origin": "*"
        // Add Authorization here later.
      })
      .then(response => {
        if (response.status === 200) {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          dispatch(SignOut(response.data));
        } else {
          dispatch(
            ErrorHandling(
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

function ErrorHandling(error = "Something went wrong.") {
  return {
    type: ERROR,
    error
  };
}
