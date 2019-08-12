import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import Title from "../../UI/Title";

class Register extends Component {
  state = {
    redirect: false,
    userName: "",
    firstName: "",
    lastName: "",
    age: "",
    password: "",
    confirmPassword: "",
    error: ""
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

  validateFirstAndLastNameInput = str => {
    // This regex is identical to the regex above, only that it allows 2-20 characters.
    return str.match("^(?=.*?[A-Ö])(?=.*?[a-ö]).{2,20}$");
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
    // ToDo
  };

  handleSubmit = event => {
    // ToDo
  };

  handleRedirect = () => {
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect === true) {
      return <Redirect push to="/identity" />;
    }
    const {
      userName,
      firstName,
      lastName,
      age,
      password,
      confirmPassword,
      error
    } = this.state;
    return (
      <React.Fragment>
        <Title Title="Register" />
        <button
          onClick={this.handleRedirect}
          className="btn btn-primary btn-sm mb-3 float-left">
          Return
        </button>
        <div className="mt-3 col-3 AlignCenter border box-shadow shadow">
          <h3 className="text-center">Register user</h3>
          <form className="form" onSubmit={this.handleSubmit}>
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
              <label className="col-form-label">
                Username
                <input
                  type="text"
                  name="userName"
                  value={userName}
                  onChange={this.handleChange}
                  className="form-inline"
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label className="col-form-label">
                Firstname
                <input
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={this.handleChange}
                  className="form-inline"
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label className="col-form-label">
                Lastname
                <input
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={this.handleChange}
                  className="form-inline"
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label className="col-form-label">
                Age
                <input
                  type="text"
                  name="age"
                  value={age}
                  onChange={this.handleChange}
                  className="form-inline"
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label className="col-form-label">
                Password
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                  className="form-inline"
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label className="col-form-label">
                Confirm password
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={this.handleChange}
                  className="form-inline"
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Register"
                className="btn btn-primary btn-sm "
              />
            </div>
          </form>
        </div>
        <hr /> {/* Half-assed solution, but works for now. */}
      </React.Fragment>
    );
  }
}

export default Register;
