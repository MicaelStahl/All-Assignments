import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Title from "../../../UI/Title";
import * as actionTypes from "../../../Actions/Assignment 10/actions/identityActions";
import * as actionAdmin from "../../../Actions/Assignment 10/actions/adminActions";

class Register extends Component {
  state = {
    redirect: false,
    userName: "",
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: "",
    admin: false
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

  validateEmailInput = str => {
    // This regex validates the Email-address given
    // examples of valid Email-addresses:
    // x.x@x.xx & x.x@x.xxxx
    // test.test@testing.test
    // testing.test@t.com
    // Not valid Email-addresses:
    // .x@test.com
    // x.@test.com
    // x@.test.com
    return str.match("^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,4})+$");
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
    const { name, value } = event.target;
    let correctFormat = null;

    // Could probably make these into a giant x === null ? null : null statement

    if (name === "userName") {
      correctFormat = value.match(/^[a-öA-Ö0-9]*$/);
      if (correctFormat === null) {
        this.setState({
          error: "Invalid username input. \nOnly letters and numbers allowed."
        });
        return;
      }
      // So I don't have to write a copypaste for lastName, I decided to do like this.
    } else if (name === "firstName" || name === "lastName") {
      correctFormat = value.match(/^[a-öA-Ö]*$/);
      if (correctFormat === null) {
        this.setState({
          error: `Invalid ${name.toLowerCase()} input. \nOnly letters allowed.`
        });
        return;
      }
    } else if (name === "age") {
      correctFormat = value.match("^[0-9]+$");
      if (correctFormat === null) {
        this.setState({ error: "Invalid age input. \nOnly numbers allowed." });
        return;
      }
    } else if (name === "email") {
      correctFormat = value.match(/^([a-ö-A-Ö0-9$@._-])*$/);
      if (correctFormat === null) {
        this.setState({
          error:
            "Invalid email input. \nValid inputs are: \n" +
            "All letters and numbers\n" +
            "( . _ - @ )"
        });
        return;
      }
    } else if (name === "admin") {
      this.setState({ admin: !this.state.admin, error: "" });
      return;
    }

    this.setState({ [name]: value, error: "" });
  };

  handleValidateSubmit = user => {
    console.log("handleValidateSubmit", user);
    if (this.validateUserNameInput(user.UserName) === undefined) {
      this.setState({ error: "Invalid username" });
      return;
    } else if (
      this.validateFirstAndLastNameInput(user.FirstName) === undefined
    ) {
      this.setState({ error: "Invalid firstname" });
      return;
    } else if (
      this.validateFirstAndLastNameInput(user.LastName) === undefined
    ) {
      this.setState({ error: "Invalid lastname" });
      return;
    } else if (this.validatePasswordInput(user.Password) === undefined) {
      this.setState({ error: "Invalid password" });
      return;
    } else if (user.Password !== user.ComparePassword) {
      this.setState({ error: "The passwords does not match." });
      return;
    } else if (this.validateEmailInput(user.Email) === undefined) {
      this.setState({ error: "Invalid email" });
      return;
    } else if (Number(user.Age) > 110 || Number(user.Age) < 18) {
      this.setState({
        error: "Invalid age given. Must be between 18 to 110 years old."
      });
      return;
    }
  };

  handleSubmit = event => {
    // ToDo
    event.preventDefault();

    const {
      userName,
      firstName,
      lastName,
      age,
      email,
      password,
      confirmPassword
    } = event.target;

    const user = {
      UserName: userName.value,
      FirstName: firstName.value,
      LastName: lastName.value,
      Age: age.value,
      Email: email.value,
      Password: password.value,
      ComparePassword: confirmPassword.value
    };
    this.handleValidateSubmit(user);

    if (this.state.error === "") {
      this.props.onRegistrationSubmit(user);
    }

    // Temporary setTimeout to make sure everything works properly.
    // Currently inactive due to me testing Registration.
    // setTimeout(this.setState({ redirect: true }), 100);

    // ToDo
  };

  handleAdminSubmit = event => {
    event.preventDefault();

    const {
      userName,
      firstName,
      lastName,
      age,
      email,
      password,
      confirmPassword
    } = event.target;

    const user = {
      UserName: userName.value,
      FirstName: firstName.value,
      LastName: lastName.value,
      Age: age.value,
      Email: email.value,
      Admin: this.state.admin,
      Password: password.value,
      ComparePassword: confirmPassword.value
    };

    this.handleValidateSubmit(user);

    if (this.state.error === "") {
      console.log("[handleAdminSubmit]", "Hello");
      this.props.onAdminRegistrationSubmit(user);
    }
  };

  handleRedirect = () => {
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect === true) {
      return (
        <Redirect
          push
          to={
            this.props.history.goBack() === undefined
              ? "/"
              : this.props.history.goBack()
          }
        />
      );
    }
    const {
      userName,
      firstName,
      lastName,
      age,
      email,
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
          <form
            className="form"
            onSubmit={
              this.props.roles.includes("Administrator") === true
                ? this.handleAdminSubmit
                : this.handleSubmit
            }>
            {this.props.error === "" ? null : (
              <p className="text-danger font-weight-bold text-center">
                {this.props.error}
              </p>
            )}

            {this.props.success === "" ? null : (
              <p className="text-success font-weight-bold text-center">
                {this.props.success}
              </p>
            )}

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
                  minLength="4"
                  maxLength="20"
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
                  minLength="2"
                  maxLength="20"
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
                  minLength="2"
                  maxLength="20"
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
                  type="number"
                  name="age"
                  min="18"
                  max="110"
                  value={age}
                  onChange={this.handleChange}
                  className="form-inline"
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label className="col-form-label">
                Email
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                  className="form-inline"
                  required
                />
              </label>
            </div>
            {this.props.roles.includes("Administrator") === true ? (
              <div className="form-group">
                <label className="col-form-label">Admin</label>
                <input
                  type="checkbox"
                  name="admin"
                  onChange={this.handleChange}
                  checked={this.state.admin}
                  className="form-inline"
                />
              </div>
            ) : null}
            <div className="form-group">
              <label className="col-form-label">
                Password
                <input
                  type="password"
                  name="password"
                  minLength="8"
                  maxLength="20"
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
                  minLength="8"
                  maxLength="20"
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
        <hr />
        {/* ^ Half-assed solution, but works for now. 
        Referring to the fact that there was no space between the form and the bottom-layer */}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.identity.error,
    success: state.identity.success,
    roles: state.identity.roles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRegistrationSubmit: user => dispatch(actionTypes.RegisterAsync(user)),
    onAdminRegistrationSubmit: user =>
      dispatch(actionAdmin.AdminCreateUserAsync(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
