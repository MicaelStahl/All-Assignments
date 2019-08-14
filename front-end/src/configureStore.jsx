import { createBrowserHistory } from "history";
import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import createRootReducer from "./reducers";
import thunk from "redux-thunk";

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");
export const history = createBrowserHistory({ basename: baseUrl });

export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    compose(applyMiddleware(routerMiddleware(history), thunk))
  );

  return store;
}

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
