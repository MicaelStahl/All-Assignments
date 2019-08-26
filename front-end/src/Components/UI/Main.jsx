import React from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Home from "../../Home";
import Calculator from "../Assignment 1 - Calculator/Calculator";
import HTML from "../Assignment 5 - Webpage/HTML";
import GuessingGame from "../Assignment 7 - Guessing Game/GuessingGame";
import IdentityIndex from "../Assignment 10 - Identity/IdentityIndex";

import AllPeople from "../Assignment 10 - Identity/Person/AllPeople";
import CreatePerson from "../Assignment 10 - Identity/Person/Create";
import DetailsPerson from "../Assignment 10 - Identity/Person/Details";
import EditPerson from "../Assignment 10 - Identity/Person/Edit";
import DeletePerson from "../Assignment 10 - Identity/Person/Delete";

import AllCities from "../Assignment 10 - Identity/City/AllCities";
import CreateCity from "../Assignment 10 - Identity/City/Create";
import DetailsCity from "../Assignment 10 - Identity/City/Details";
import EditCity from "../Assignment 10 - Identity/City/Edit";
import DeleteCity from "../Assignment 10 - Identity/City/Delete";

import AllCountries from "../Assignment 10 - Identity/Country/AllCountries";
import CreateCountry from "../Assignment 10 - Identity/Country/Create";
import DetailsCountry from "../Assignment 10 - Identity/Country/Details";
import EditCountry from "../Assignment 10 - Identity/Country/Edit";
import DeleteCountry from "../Assignment 10 - Identity/Country/Delete";

import Register from "../Assignment 10 - Identity/User/All Users/Register";
import SignIn from "../Assignment 10 - Identity/User/All Users/SignIn";
import Users from "../Assignment 10 - Identity/User/Admin Only/Users";
import Details from "../Assignment 10 - Identity/User/All Users/Details";
import Edit from "../Assignment 10 - Identity/User/All Users/Edit";
import ChangePassword from "../Assignment 10 - Identity/User/All Users/Change-password";
import Delete from "../Assignment 10 - Identity/User/All Users/Delete";

import NoMatch from "./NoMatch";

const countryUrl = "/identity/country";
const personUrl = "/identity/person";
const cityUrl = "identity/city";

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

        {/* ------------------------------ Person ------------------------------ */}

        <Route
          exact
          path={`${personUrl}/create-person`}
          render={() => (props.isAuthenticated ? <CreatePerson /> : <SignIn />)}
        />
        <Route
          exact
          path={`${personUrl}/details/:id`}
          render={() =>
            props.isAuthenticated ? <DetailsPerson /> : <SignIn />
          }
        />
        <Route
          exact
          path={`${personUrl}/edit/:id`}
          render={() => (props.isAuthenticated ? <EditPerson /> : <SignIn />)}
        />
        <Route
          exact
          path={`${personUrl}/delete/:id`}
          render={() => (props.isAuthenticated ? <DeletePerson /> : <SignIn />)}
        />
        <Route
          exact
          path={personUrl}
          render={() => (props.isAuthenticated ? <AllPeople /> : <SignIn />)}
        />

        {/* ------------------------------ City ------------------------------ */}

        <Route
          exact
          path={`${cityUrl}/create`}
          render={() =>
            props.roles.includes("Administrator") ? (
              <CreateCity />
            ) : (
              <IdentityIndex />
            )
          }
        />
        <Route
          exact
          path={`${cityUrl}/details/:id`}
          render={() =>
            props.roles.includes("Administrator") ? (
              <DetailsCity />
            ) : (
              <IdentityIndex />
            )
          }
        />
        <Route
          exact
          path={`${cityUrl}/edit/:id`}
          render={() =>
            props.roles.includes("Administrator") ? (
              <EditCity />
            ) : (
              <IdentityIndex />
            )
          }
        />
        <Route exact path={`${cityUrl}/delete/:id`} component={Delete} />
        <Route
          exact
          path={cityUrl}
          render={() =>
            props.roles.includes("Administrator") ? (
              <DeleteCity />
            ) : (
              <IdentityIndex />
            )
          }
        />

        {/* ------------------------------ Country ------------------------------ */}

        <Route
          exact
          path={`${countryUrl}/create-new-country`}
          render={() =>
            props.roles.includes("Administrator") ? (
              <CreateCountry />
            ) : (
              <IdentityIndex />
            )
          }
        />

        <Route
          exact
          path={`${countryUrl}/details/:id`}
          render={() =>
            props.roles.includes("Administrator") ? (
              <DetailsCountry />
            ) : (
              <IdentityIndex />
            )
          }
        />

        <Route
          exact
          path={`${countryUrl}/edit/:id`}
          render={() =>
            props.roles.includes("Administrator") ? (
              <EditCountry />
            ) : (
              <IdentityIndex />
            )
          }
        />

        <Route
          exact
          path={`${countryUrl}/delete/:id`}
          render={() =>
            props.roles.includes("Administrator") ? (
              <DeleteCountry />
            ) : (
              <IdentityIndex />
            )
          }
        />

        <Route
          exact
          path={countryUrl}
          render={() =>
            props.roles.includes("Administrator") ? (
              <AllCountries />
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
