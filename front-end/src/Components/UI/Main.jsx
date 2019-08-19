import React from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Home from "../../Home";
import Calculator from "../Assignment 1 - Calculator/Calculator";
import HTML from "../Assignment 5 - Webpage/HTML";
import GuessingGame from "../Assignment 7 - Guessing Game/GuessingGame";
import IdentityIndex from "../Assignment 10 - Identity/IdentityIndex";
import Person from "../Assignment 10 - Identity/Person/Person";
import City from "../Assignment 10 - Identity/City/City";
import NoMatch from "./NoMatch";

import Country from "../Assignment 10 - Identity/Country/Country";

import Register from "../Assignment 10 - Identity/User/Register";
import SignIn from "../Assignment 10 - Identity/User/SignIn";
import Users from "../Assignment 10 - Identity/User/Admin Only/Users";

const Main = props => {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/signin" component={SignIn} />

        <Route exact path="/register" component={Register} />

        <Route
          exact
          path="/users"
          render={() =>
            props.isAuthenticated === true ? (
              <Users />
            ) : (
              <Redirect to="/signin" />
            )
          }
        />

        <Route exact path="/calculator" component={Calculator} />

        <Route exact path="/webpage" component={HTML} />

        <Route exact path="/guessing-game" component={GuessingGame} />

        <Route exact path="/identity" component={IdentityIndex} />

        <Route exact path="/identity/person" component={Person} />

        <Route exact path="/identity/city" component={City} />

        <Route exact path="/identity/country" component={Country} />

        <Route exact path="/" component={Home} />

        <Route component={NoMatch} />
      </Switch>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.identity.isAuthenticated
  };
};

export default connect(mapStateToProps)(withRouter(Main));
