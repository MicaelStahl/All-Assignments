import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AllCities from "./AllCities";
import Create from "./Create";

const City = props => {
  return (
    <Router>
      <Switch>
        <Route exact path={props.match.url + "/create"} component={Create} />
        <Route exact path={props.match.url} component={AllCities} />
      </Switch>
    </Router>
  );
};

export default City;
