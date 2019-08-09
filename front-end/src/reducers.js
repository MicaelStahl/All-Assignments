import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import personReducer from "./Components/Actions/Assignment 10/reducers/personReducer";
import cityReducer from "./Components/Actions/Assignment 10/reducers/cityReducer";
import countryReducer from "./Components/Actions/Assignment 10/reducers/countryReducer";

export default history =>
  combineReducers({
    router: connectRouter(history),
    person: personReducer,
    city: cityReducer,
    country: countryReducer
  });
