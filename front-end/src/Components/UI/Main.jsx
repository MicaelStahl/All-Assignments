import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import Home from "../../Home";
import Calculator from "../Assignment 1 - Calculator/Calculator";
import HTML from "../Assignment 5 - Webpage/HTML";
import GuessingGame from "../Assignment 7 - Guessing Game/GuessingGame";
import IdentityIndex from "../Assignment 10 - Identity/IdentityIndex";
import Person from "../Assignment 10 - Identity/Person/Person";
import City from "../Assignment 10 - Identity/City/City";

const Main = () => {
  return (
    <Switch>
      <Route exact path="/calculator" component={Calculator} />
      <Route exact path="/webpage" component={HTML} />
      <Route exact path="/guessing-game" component={GuessingGame} />
      <Route exact path="/identity" component={IdentityIndex} />
      <Route exact path="/identity/person" component={Person} />
      <Route exact path="/identity/city" component={City} />
      <Route exact path="/" component={Home} />
    </Switch>
  );
};

export default withRouter(Main);
