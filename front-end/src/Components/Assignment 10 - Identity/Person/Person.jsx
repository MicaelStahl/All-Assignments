import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import AllPeople from "./AllPeople";
import Details from "./Details";

const Person = props => {
  console.log(props.match.url);
  return (
    <React.Fragment>
      <Switch>
        <Route exact path={props.match.url + "/details/"} component={Details} />
        <Route exact path={props.match.url} component={AllPeople} />
      </Switch>
    </React.Fragment>
  );
};

export default withRouter(Person);
