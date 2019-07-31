import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AllPeople from "./AllPeople";
import Details from "./Details";
import Create from "./Create";

const Person = props => {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path={props.match.url + "/details/:id"}
          component={Details}
        />
        <Route
          exact
          path={props.match.url + "/create-person"}
          component={Create}
        />
        <Route exact path={props.match.url} component={AllPeople} />
      </Switch>
    </Router>
  );
};

export default Person;
