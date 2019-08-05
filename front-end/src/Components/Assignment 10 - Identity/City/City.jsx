import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AllCities from "./AllCities";

const City = props => {
  return (
    <Router>
      <Switch>
        <Route path={props.match.url} component={AllCities} />
        <div>hello world!</div>
      </Switch>
    </Router>
  );
};

export default City;
