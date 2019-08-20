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

import Register from "../Assignment 10 - Identity/User/All Users/Register";
import SignIn from "../Assignment 10 - Identity/User/All Users/SignIn";
import Users from "../Assignment 10 - Identity/User/Admin Only/Users";
import Details from "../Assignment 10 - Identity/User/All Users/Details";

const Main = props => {
  return (
    <React.Fragment>
      <Switch>
        {/* ---------- Assignment 1 ---------- */}
        <Route exact path="/calculator" component={Calculator} />

        {/* ---------- Assignment 2 ---------- */}

        {/* ---------- Assignment 3 ---------- */}

        {/* ---------- Assignment 4 ---------- */}

        {/* ---------- Assignment 5 ---------- */}
        <Route exact path="/webpage" component={HTML} />

        {/* ---------- Assignment 6 ---------- */}

        {/* ---------- Assignment 7 ---------- */}
        <Route exact path="/guessing-game" component={GuessingGame} />

        {/* ---------- Assignment 8 ---------- */}

        {/* ---------- Assignment 9 ---------- */}

        {/* ---------- Assignment 10 ---------- */}
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
        <Route exact path="/users/details/:id" component={Details} />
        {/* Change these later. */}
        <Route exact path="/user/edit/:id" component={Details} />
        <Route exact path="/user/edit-password/:id" component={Details} />
        <Route exact path="/user/delete/:id" component={Details} />

        <Route exact path="/identity" component={IdentityIndex} />
        <Route exact path="/identity/person" component={Person} />
        <Route exact path="/identity/city" component={City} />
        <Route exact path="/identity/country" component={Country} />

        {/* ---------- Assignment 11 ---------- */}

        {/* ---------- Globals ---------- */}
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
