import React, { Component } from "react";
import { NavLink, Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import * as actionTypes from "../Actions/Assignment 10/actions/identityActions";
import * as actionUser from "../Actions/Assignment 10/actions/userActions";
import * as actionAdmin from "../Actions/Assignment 10/actions/adminActions";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    };
  }

  handleSignOut = () => {
    this.props.onSignOut();
  };
  // Fix these links later.
  render() {
    return (
      <header>
        <nav className="border-radius5 container navbar navbar-expand-sm navbar-expand-sm navbar-light bg-dark border-bottom box-shadow mb-3">
          <div className="container">
            <Link id="HomeScreen" to="/" className="nav-link text-light">
              Start
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target=".navbar-collapse"
              aria-expanded="false"
              aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="navbar-collapse justify-content-between collapse d-sm-inline-flex flex-sm-row-reverse">
              <ul className="navbar-nav ml-auto">
                {this.props.isAuthenticated ? (
                  <React.Fragment>
                    {this.props.roles.includes("Administrator") === true ? (
                      <li className="nav-item">
                        <NavLink
                          className="nav-link text-light btn btn-dark"
                          to="/users">
                          Users
                        </NavLink>
                      </li>
                    ) : null}
                    <li className="nav-item">
                      {this.props.roles.includes("Administrator") ? (
                        <NavLink
                          to={"/profile/" + localStorage.getItem("userId")}
                          className="nav-link text-light btn btn-dark"
                          onClick={() =>
                            this.props.onAdminProfileClick(
                              localStorage.getItem("userId"),
                              this.props.users
                            )
                          }>
                          Profile
                        </NavLink>
                      ) : (
                        <NavLink
                          to={"/profile/" + localStorage.getItem("userId")}
                          className="nav-link text-light btn btn-dark"
                          onClick={() =>
                            this.props.onProfileClick(
                              localStorage.getItem("userId"),
                              this.props.users
                            )
                          }>
                          Profile
                        </NavLink>
                      )}
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/"
                        className="nav-link text-light btn btn-dark"
                        onClick={() => this.handleSignOut()}>
                        Sign Out
                      </Link>
                    </li>
                  </React.Fragment>
                ) : (
                  <li className="nav-item">
                    <NavLink
                      className="nav-link text-light btn btn-dark"
                      to="/signin">
                      Sign In
                    </NavLink>
                  </li>
                )}
              </ul>
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <NavLink className="nav-link text-light" to="/">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item dropdown">
                  <button
                    className="DropdownList btn btn-dark dropdown-toggle"
                    data-toggle="dropdown">
                    Assignments
                  </button>
                  <div className="dropdown-menu">
                    <NavLink
                      className="btn btn-secondary dropdown-item"
                      to="/calculator">
                      Calculator
                    </NavLink>
                    <div className="dropdown-divider" />
                    <NavLink
                      className="btn btn-secondary dropdown-item"
                      to="/webpage">
                      Webpage
                    </NavLink>
                    <div className="dropdown-divider" />
                    <NavLink
                      className="btn btn-secondary dropdown-item"
                      to="/guessing-game">
                      Guessing Game
                    </NavLink>
                    <div className="dropdown-divider" />
                    <NavLink
                      className="btn btn-secondary dropdown-item"
                      to="/identity">
                      Identity
                    </NavLink>
                  </div>
                </li>
                {this.props.location.pathname.includes("/identity") === true &&
                this.props.isAuthenticated ? (
                  <ul className="navbar-nav mr-auto">
                    <li className="nav-item dropdown">
                      <button
                        className="DropdownList btn btn-dark dropdown-toggle"
                        data-toggle="dropdown">
                        Identity
                      </button>
                      <div className="dropdown-menu">
                        <NavLink
                          to="/identity"
                          className="btn btn-secondary dropdown-item">
                          Index
                        </NavLink>
                        <div className="dropdown-divider" />
                        <NavLink
                          to="/identity/people"
                          className="btn btn-secondary dropdown-item">
                          Person
                        </NavLink>
                        {this.props.roles.includes("Administrator") ? (
                          <React.Fragment>
                            <div className="dropdown-divider" />
                            <NavLink
                              to="/identity/cities"
                              className="btn btn-secondary dropdown-item">
                              City
                            </NavLink>
                            <div className="dropdown-divider" />
                            <NavLink
                              to="/identity/countries"
                              className="btn btn-secondary dropdown-item">
                              Country
                            </NavLink>
                          </React.Fragment>
                        ) : null}
                      </div>
                    </li>
                  </ul>
                ) : null}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.identity.isAuthenticated,
    roles: state.identity.roles,
    users: state.admin.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSignOut: () => dispatch(actionTypes.SignOutAsync()),
    onProfileClick: (userId, users) =>
      dispatch(actionUser.UserDetailsAsync(userId, users)),
    onAdminProfileClick: (userId, users) =>
      dispatch(actionAdmin.AdminGetUserAsync(userId, users))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Navbar));
