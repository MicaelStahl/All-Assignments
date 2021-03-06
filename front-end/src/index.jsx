import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import configureStore, { history } from "./configureStore";

import "bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./Components/css/index.css";
import "./Components/css/App.css";
import "./Components/css/Style.css";
import "./Components/css/site.css";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import StateLoader from "./StateLoader";

// const initialState = window.initialReduxState;

const stateLoader = new StateLoader();

// // This line is for whenever something goes wrong. it deletes all internal state values from redux.
// stateLoader.ClearState();

const store = configureStore(stateLoader.loadState());

store.subscribe(() => {
  // ToDo
  stateLoader.SaveState(store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
