import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // Fix these links later.
  render() {
    return (
      <header>
        <nav className="border-radius5 container navbar navbar-expand-sm navbar-expand-sm navbar-light bg-dark border-bottom box-shadow mb-3">
          <div className="container">
            <a id="HomeScreen" className="navbar-brand text-light" href="#">
              Start
            </a>
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
                {this.state.authenticated ? (
                  <React.Fragment>
                    <li className="nav-item">
                      <NavLink className="nav-link text-light" to="/profile">
                        Profile
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link text-light btn btn-dark"
                        onClick={this.logout}>
                        Logout
                      </a>
                    </li>
                  </React.Fragment>
                ) : (
                  <li className="nav-item">
                    <button
                      className="nav-link text-light btn btn-dark"
                      onClick={this.login}>
                      Login
                    </button>
                  </li>
                  // <NavLink className="nav-link text-light" to="/login">
                  //   Login
                  // </NavLink>
                )}
              </ul>
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <NavLink className="nav-link text-light" to="/">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="DropdownList nav-link text-light dropdown-toggle"
                    data-toggle="dropdown">
                    Assignments
                  </a>
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
                {this.props.location.pathname.includes("/identity") === true ? (
                  <ul className="navbar-nav mr-auto">
                    <li className="nav-item dropdown">
                      <a
                        className="DropdownList nav-link text-light dropdown-toggle"
                        data-toggle="dropdown">
                        Identity
                      </a>
                      <div className="dropdown-menu">
                        <NavLink
                          to="/identity"
                          className="btn btn-secondary dropdown-item">
                          Index
                        </NavLink>
                        <div className="dropdown-divider" />
                        <NavLink
                          to="/identity/person"
                          className="btn btn-secondary dropdown-item">
                          Person
                        </NavLink>
                        <div className="dropdown-divider" />
                        <NavLink
                          to="/identity/city"
                          className="btn btn-secondary dropdown-item">
                          City
                        </NavLink>
                        <div className="dropdown-divider" />
                        <NavLink
                          to="/identity/country"
                          className="btn btn-secondary dropdown-item">
                          Country
                        </NavLink>
                      </div>
                    </li>
                  </ul>
                ) : (
                  console.log(this.props.location)
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

export default withRouter(Navbar);