import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AllCountries from "./AllCountries";
import Create from "./Create";
import Details from "./Details";
import Edit from "./Edit";
import Delete from "./Delete";

const Country = props => {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path={props.match.url + "/create-new-country"}
          component={Create}
        />

        <Route
          exact
          path={props.match.url + "/details/:id"}
          component={Details}
        />

        <Route exact path={props.match.url + "/edit/:id"} component={Edit} />

        <Route
          exact
          path={props.match.url + "/delete/:id"}
          component={Delete}
        />

        <Route exact path={props.match.url} component={AllCountries} />
      </Switch>
    </Router>
  );
};

export default Country;
