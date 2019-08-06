import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AllCities from "./AllCities";
import Create from "./Create";
import Details from "./Details";
import Edit from "./Edit";
import Delete from "./Delete";

const City = props => {
  return (
    <Router>
      <Switch>
        <Route exact path={props.match.url + "/create"} component={Create} />
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
        <Route exact path={props.match.url} component={AllCities} />
      </Switch>
    </Router>
  );
};

export default City;
