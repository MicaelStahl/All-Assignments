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
import Edit from "../Assignment 10 - Identity/User/All Users/Edit";
import ChangePassword from "../Assignment 10 - Identity/User/All Users/Change-password";
import Delete from "../Assignment 10 - Identity/User/All Users/Delete";

const Main = props => {
  // This is what I'd like to call organized chaos.
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
            props.roles.includes("Administrator") === true ? (
              <Users />
            ) : (
              <Redirect to="/" />
            )
          }
        />
        <Redirect exact from="/profile/:id" to="/users/details/:id" />
        <Route exact path="/users/details/:id" component={Details} />
        <Route exact path="/profile/:id" component={Details} />
        <Route exact path="/users/edit/:id" component={Edit} />
        <Route
          exact
          path="/users/change-password/:id"
          component={ChangePassword}
        />
        <Route exact path="/users/delete/:id" component={Delete} />
        <Route exact path="/identity" component={IdentityIndex} />
        <Route
          exact
          path="/identity/person"
          // Because if a user cannot access Person, he/she is not signed in.
          render={() => (props.isAuthenticated ? <Person /> : <SignIn />)}
        />
        <Route
          exact
          path="/identity/city"
          render={() =>
            props.roles.includes("Administrator") ? <City /> : <IdentityIndex />
          }
        />
        <Route
          exact
          path="/identity/country"
          render={() =>
            props.roles.includes("Administrator") ? (
              <Country />
            ) : (
              <IdentityIndex />
            )
          }
        />
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
    isAuthenticated: state.identity.isAuthenticated,
    roles: state.identity.roles
  };
};

export default connect(mapStateToProps)(withRouter(Main));
