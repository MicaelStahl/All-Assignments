import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import personReducer from "./Components/Actions/Assignment 10/reducers/personReducer";
import cityReducer from "./Components/Actions/Assignment 10/reducers/cityReducer";
import countryReducer from "./Components/Actions/Assignment 10/reducers/countryReducer";
import identityReducer from "./Components/Actions/Assignment 10/reducers/identityReducer";
import optionsReducer from "./Components/Actions/Assignment 10/reducers/optionsReducer";
import userReducer from "./Components/Actions/Assignment 10/reducers/userReducer";
import adminReducer from "./Components/Actions/Assignment 10/reducers/adminReducer";

export default history =>
  combineReducers({
    router: connectRouter(history),
    person: personReducer,
    city: cityReducer,
    country: countryReducer,
    identity: identityReducer,
    options: optionsReducer,
    user: userReducer,
    admin: adminReducer
  });
