import React, { Component } from "react";
import { connect } from "react-redux";

import { Redirect } from "react-router-dom";

import * as actionUser from "../../../Actions/Assignment 10/actions/userActions";
import * as actionAdmin from "../../../Actions/Assignment 10/actions/adminActions";
import Loading from "../../../UI/Loading";
import Title from "../../../UI/Title";

class Edit extends Component {
  state = {
    userName: null,
    firstName: null,
    lastName: null,
    age: null,
    email: null,
    isAdmin: this.props.roles.includes("Administrator") ? true : false,
    error: "",
    redirect: false
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
    } else if (name === "isAdmin") {
      this.setState({ isAdmin: !this.state.isAdmin, error: "" });
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

    const { userName, firstName, lastName, age, email } = event.target;

    const user = {
      UserName: userName.value,
      FirstName: firstName.value,
      LastName: lastName.value,
      Age: age.value,
      Email: email.value,
      Roles: this.props.roles
    };
    this.handleValidateSubmit(user);

    if (this.state.error === "") {
      this.props.onUserSubmit(user, this.props.users);
    }

    // Temporary setTimeout to make sure everything works properly.
    // Currently inactive due to me testing Registration.
    // setTimeout(this.setState({ redirect: true }), 100);

    // ToDo
  };

  handleAdminSubmit = event => {
    event.preventDefault();

    const { userId, userName, firstName, lastName, age, email } = event.target;

    const user = {
      UserId: userId.value,
      UserName: userName.value,
      FirstName: firstName.value,
      LastName: lastName.value,
      Age: age.value,
      Email: email.value,
      IsAdmin:
        this.state.isAdmin === ""
          ? this.props.user.isAdmin
          : this.state.isAdmin,
      Roles: this.props.roles
    };

    this.handleValidateSubmit(user);

    if (this.state.error === "") {
      console.log("[handleAdminSubmit]", "Hello");
      this.props.onAdminSubmit(user, this.props.users);
    }
  };

  handleRedirect = () => {
    this.setState({ redirect: !this.state.redirect });
  };

  render() {
    if (!this.props.isLoading) {
      if (this.state.redirect) {
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

      const user = this.props.user;

      // this is because getting the values from redux turns it into an array.

      const {
        userId,
        userName,
        firstName,
        lastName,
        age,
        email,
        isAdmin
      } = user;

      return (
        <React.Fragment>
          <Title Title={"Editing " + userName} />

          <div className="mt-3 AlignCenter col-3 border shadow box-shadow">
            <h3>Edit {userName}</h3>
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
              <input type="hidden" value={userId} name="userId" />
              <div className="form-group">
                <label className="col-form-label">
                  Username
                  <input
                    type="text"
                    name="userName"
                    value={
                      this.state.userName === null
                        ? userName
                        : this.state.userName
                    }
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
                    value={
                      this.state.firstName === null
                        ? firstName
                        : this.state.firstName
                    }
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
                    value={
                      this.state.lastName === null
                        ? lastName
                        : this.state.lastName
                    }
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
                    value={this.state.age === null ? age : this.state.age}
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
                    value={this.state.email === null ? email : this.state.email}
                    onChange={this.handleChange}
                    className="form-inline "
                    required
                  />
                </label>
              </div>
              {this.props.roles.includes("Administrator") ? (
                <div className="form-group">
                  <label className="col-form-label">Admin</label>
                  <input
                    type="checkbox"
                    name="isAdmin"
                    onChange={this.handleChange}
                    checked={
                      this.state.isAdmin === null ? isAdmin : this.state.isAdmin
                    }
                    className="form-inline"
                  />
                </div>
              ) : null}
              <div className="form-group">
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-primary btn-sm "
                />
                <button
                  className="btn btn-primary btn-sm float-right"
                  onClick={() => this.props.history.goBack()}>
                  Return
                </button>
              </div>
            </form>
          </div>
          <hr />
        </React.Fragment>
      );
    } else {
      return <Loading />;
    }
  }
}

const mapStateToProps = state => {
  return {
    users: state.identity.users,
    user: state.identity.user,
    isLoading: state.options.isLoading,
    roles: state.identity.roles,
    error: state.options.errorMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAdminSubmit: (user, users) =>
      dispatch(actionAdmin.AdminEditUserAsync(user, users)),
    onUserSubmit: (user, users) => dispatch(actionUser)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Edit);
