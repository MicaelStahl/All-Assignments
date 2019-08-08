import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

import "bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./Components/css/index.css";
import "./Components/css/App.css";
import "./Components/css/Style.css";
import "./Components/css/site.css";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import personReducer from "./Components/Actions/Assignment 10/reducers/personReducer";
import cityReducer from "./Components/Actions/Assignment 10/reducers/cityReducer";
import countryReducer from "./Components/Actions/Assignment 10/reducers/countryReducer";
import Loading from "./Components/UI/Loading";

const reducer = combineReducers({
  person: personReducer,
  city: cityReducer,
  country: countryReducer
});

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, reducer);

let store = createStore(persistedReducer, applyMiddleware(thunk));

let persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// const logger = store => {
//   return next => {
//     return action => {
//       console.log("[Middleware] dispatching", action);
//       const result = next(action);
//       console.log("[Middleware] next state", store.getState());
//       return result;
//     };
//   };
// };
