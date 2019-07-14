import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../../Home";
import Calculator from "../Assignment 1 - Calculator/Calculator";
import HTML from "../Assignment 5 - Webpage/HTML";
import GuessingGame from "../Assignment 7 - Guessing Game/GuessingGame";

const Main = () => {
  return (
    <Switch>
      <Route exact path="/calculator" component={Calculator} />
      <Route exact path="/webpage" component={HTML} />
      <Route exact path="/guessing-game" component={GuessingGame} />
      <Route exact path="/" component={Home} />
    </Switch>
  );
};

export default Main;
