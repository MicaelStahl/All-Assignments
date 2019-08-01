import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AllPeople from "./AllPeople";
import Create from "./Create";
import Details from "./Details";
import Delete from "./Delete";

const Person = props => {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path={props.match.url + "/create-person"}
          component={Create}
        />
        <Route
          exact
          path={props.match.url + "/details/:id"}
          component={Details}
        />
        <Route
          exact
          path={props.match.url + "/delete/:id"}
          component={Delete}
        />
        <Route exact path={props.match.url} component={AllPeople} />
      </Switch>
    </Router>
  );
};

export default Person;
