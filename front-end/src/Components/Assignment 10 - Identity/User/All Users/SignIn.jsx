import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Title from "../../../UI/Title";
import * as actionIdentity from "../../../Actions/Assignment 10/actions/identityActions";

class LoginScreen extends Component {
  state = {
    userName: "",
    password: "",
    error: "",
    success: ""
  };

  validateUserNameInput = str => {
    // This regex checks so that the username contains the following;
    // At least one uppercase letter A-Ö
    // At least one lowercast letter a-ö
    // At least 4 characters.
    // And less or exactly 20 characters long.
    // No spaces.
    return str.match("^(?=.*?[A-Ö])(?=.*?[a-ö]).{4,20}$");
  };

  validatePasswordInput = str => {
    // This regex checks so that the password contains the following;
    // At least one uppercase letter A-Ö
    // At least one lowercase letter a-ö
    // At least one number 0-9
    // At least one special character ( @ $ % ^ & * - )
    // At least 8 characters long.
    // And less or exactly 20 characters long.
    // No spaces.
    return str.match(
      "^(?=.*?[A-Ö])(?=.*?[a-ö])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$"
    );
  };

  handleChange = event => {
    const { name, value } = event.target;
    let correctFormat = null;

    if (name === "userName") {
      // Checks so the given value is either a letter or a number.
      correctFormat = value.match(/^[a-öA-Ö0-9]*$/);
      if (correctFormat === null) {
        this.setState({
          error: `Incorrect character input.  \nOnly letters and numbers allowed as username.`
        });
        return;
      }
    } else if (name === "password") {
      // Checks so the given value is either a letter, number or ( $ ! @ $ . , * - _ )
      correctFormat = value.match(/^[a-öA-Ö0-9$!@$.,*-]*$/);
      if (correctFormat === null) {
        this.setState({
          error:
            "Incorrect character input. \nAllowed special characters are: \n( $ ! @ $ . , * - _ ) \nNo spaces"
        });
        return;
      }
    }

    this.setState({ [name]: value, error: "" });
  };

  handleSubmit = event => {
    event.preventDefault();

    const userName = event.target.userName.value;
    const password = event.target.password.value;
    let correctUserNameFormat = null;
    let correctPasswordFormat = null;

    correctUserNameFormat = this.validateUserNameInput(userName);
    correctPasswordFormat = this.validatePasswordInput(password);

    if (correctUserNameFormat === null) {
      this.setState({
        error:
          "Incorrect username given. \nThe required format is:" +
          "\nAt least 1 uppercase letter A-Ö" +
          "\nAt least 1 lowercase letter a-ö" +
          "\nBetween 4-20 characters long." +
          "\nNo spaces."
      });
      return;
    } else if (correctPasswordFormat === null) {
      this.setState({
        error:
          "Incorrect password given. \nThe required format is:" +
          "\nAt least 1 uppercase letter A-Ö" +
          "\nAt least 1 lowercase letter a-ö" +
          "\nAt least 1 number 0-9" +
          "\nAt least 1 special character \n( @ $ % ^ & * - )" +
          "\nBetween 8-20 characters long." +
          "\nNo spaces."
      });
      return;
    }

    const user10 = {
      UserName: userName,
      Password: password
    };

    this.props.onSigninSubmit(user10);

    if (this.props.isAuthenticated) {
      this.setState({ success: "User was successfully signed in" });
    }

    // Temporary setTimeout to make sure everything works.

    // ToDo
  };

  render() {
    const { userName, password, error } = this.state;
    return (
      <React.Fragment>
        <Title Title="Sign In" />
        <div className="mt-5 mb-5 col-3 AlignCenter border box-shadow shadow">
          <h3 className="text-center">Login</h3>
          <form className="form" onSubmit={this.handleSubmit}>
            {this.props.error === "" ? null : (
              <p className="text-danger font-weight-bold">{this.props.error}</p>
            )}
            {this.props.isAuthenticated ? (
              <p className="text-success font-weight-bold">
                {this.props.success}
              </p>
            ) : null}
            {error === "" ? null : (
              <ul className="list-unstyled">
                {error.split("\n").map((err, index) => (
                  <li className="font-weight-bold text-danger" key={index}>
                    {err}
                  </li>
                ))}
              </ul>
            )}
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="userName"
                value={userName}
                onChange={this.handleChange}
                minLength="4"
                maxLength="20"
                className="form-inline"
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={this.handleChange}
                className="form-inline"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Submit"
                className="btn btn-primary btn-sm float-left"
              />
              <p className="float-left ml-1">No account?</p>
              <Link className="ml-3" to="/register">
                <ins>Register</ins>
              </Link>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.identity.error,
    isAuthenticated: state.identity.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSigninSubmit: user10 => dispatch(actionIdentity.SignInAsync(user10))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
