import React, { Component } from "react";
import { connect } from "react-redux";

import Title from "../../../UI/Title";
import * as actionUser from "../../../Actions/Assignment 10/actions/userActions";
import * as actionAdmin from "../../../Actions/Assignment 10/actions/adminActions";

class ChangePassword extends Component {
  state = {
    oldPassword: "",
    newPassword: "",
    comparePassword: "",
    error: "",
    success: ""
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

    // return str.match("(.*[a-z].*)(.*[A-Z].*)(.*d.*).{8,20}$");
    return str.match(
      "^(?=.*?[A-Ö])(?=.*?[a-ö])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$"
    );
  };
  //  (.*[a-z].*)       // For lower cases
  //(.*[A-Z].*)       // For upper cases
  //(.*\d.*)          // For digits

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value, error: "" });
  };

  handleValidateSubmit = changePassword => {
    if (this.validatePasswordInput(changePassword.OldPassword) === null) {
      this.setState({ error: "Invalid password" });
      return "Failed";
    } else if (
      this.validatePasswordInput(changePassword.NewPassword) === null
    ) {
      this.setState({ error: "Invalid new password format." });
      return "Failed";
    } else if (changePassword.NewPassword !== changePassword.ComparePassword) {
      this.setState({ error: "The passwords does not match." });
      return "Failed";
    }
  };

  handleSubmit = event => {
    event.preventDefault();

    const { oldPassword, newPassword, comparePassword } = event.target;

    const changePassword = {
      OldPassword: oldPassword.value,
      NewPassword: newPassword.value,
      ComparePassword: comparePassword.value
    };

    const verification = this.handleValidateSubmit(changePassword);

    if (verification !== "Failed") {
      // ToDo
      this.props.onUserFormSubmit(changePassword);

      this.setState({ success: "Password was successfully changed." });
    }
  };

  handleAdminSubmit = event => {
    event.preventDefault();

    const { userId, oldPassword, newPassword, comparePassword } = event.target;

    const changePassword = {
      UserId: userId.value,
      OldPassword: oldPassword.value,
      NewPassword: newPassword.value,
      ComparePassword: comparePassword.value
    };

    console.log(changePassword);

    const verification = this.handleValidateSubmit(changePassword);

    if (verification !== "Failed") {
      // ToDo
      this.props.onAdminFormSubmit(changePassword);

      this.setState({ success: "Password was successfully changed." });
    }
  };

  render() {
    // console.log(this.props.user);
    return (
      <React.Fragment>
        <Title Title="Change password" />
        <div className="col-4 shadow box-shadow border AlignCenter">
          <form
            className="form"
            onSubmit={
              this.props.roles.includes("Administrator")
                ? this.handleAdminSubmit
                : this.handleSubmit
            }>
            <h3>Change password</h3>
            {this.state.error === "" ? null : (
              <ul className="list-unstyled">
                {this.state.error.split("\n").map((err, index) => (
                  <li key={index} className="font-weight-bold text-danger">
                    {err}
                  </li>
                ))}
              </ul>
            )}
            {this.state.success === "" ? null : (
              <p className="text-success font-weight-bold">
                {this.state.success}
              </p>
            )}
            <hr />

            <input type="hidden" value={this.props.user.userId} name="userId" />

            <div className="form-group">
              <label className="col-form-label">
                <b>Old password:</b>
              </label>
              <input
                className="form-inline"
                type="password"
                value={this.state.oldPassword}
                onChange={this.handleChange}
                name="oldPassword"
                required
              />
            </div>

            <div className="form-group">
              <label className="col-form-label">
                <b>New password:</b>
              </label>
              <input
                className="form-inline"
                type="password"
                value={this.state.newPassword}
                onChange={this.handleChange}
                name="newPassword"
                required
              />
            </div>

            <div className="form-group">
              <label className="col-form-label">
                <b>Verify password:</b>
              </label>
              <input
                className="form-inline"
                type="password"
                value={this.state.comparePassword}
                onChange={this.handleChange}
                name="comparePassword"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Submit"
                className="btn btn-success btn-sm"
              />
              <button
                onClick={() => this.props.history.goBack()}
                className="float-right btn btn-primary btn-sm">
                Return
              </button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.identity.user,
    isLoading: state.options.isLoading,
    roles: state.identity.roles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAdminFormSubmit: changePassword =>
      dispatch(actionAdmin.EditUserPasswordAsync(changePassword)),
    onUserFormSubmit: changePassword =>
      dispatch(actionUser.UserEditPasswordAsync(changePassword))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePassword);
