import React from "react";
import { Route, withRouter } from "react-router-dom";

import Home from "../../Home";
import Calculator from "../Assignment 1 - Calculator/Calculator";
import HTML from "../Assignment 5 - Webpage/HTML";
import GuessingGame from "../Assignment 7 - Guessing Game/GuessingGame";
import IdentityIndex from "../Assignment 10 - Identity/IdentityIndex";
import Person from "../Assignment 10 - Identity/Person/Person";
import City from "../Assignment 10 - Identity/City/City";

import Country from "../Assignment 10 - Identity/Country/Country";

import Register from "../Assignment 10 - Identity/User/Register";
import SignIn from "../Assignment 10 - Identity/User/SignIn";

const Main = () => {
  return (
    <React.Fragment>
      <Route exact path="/signin" component={SignIn} />

      <Route exact path="/register" component={Register} />

      <Route exact path="/calculator" component={Calculator} />

      <Route exact path="/webpage" component={HTML} />

      <Route exact path="/guessing-game" component={GuessingGame} />

      <Route exact path="/identity" component={IdentityIndex} />

      <Route exact path="/identity/person" component={Person} />

      <Route exact path="/identity/city" component={City} />

      <Route exact path="/identity/country" component={Country} />

      <Route exact path="/" component={Home} />
    </React.Fragment>
  );
};

export default withRouter(Main);
