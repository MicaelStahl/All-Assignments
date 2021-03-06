import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";

import Title from "../../UI/Title";
import * as actionTypes from "../../Actions/Assignment 10/actions/personActions";
import Loading from "../../UI/Loading";

class Create extends Component {
  state = {
    cityId: "",
    error: "",
    redirect: false
  };

  handleChange = event => {
    this.setState({ cityId: event.target.value, error: "" });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (event.target.city.value === "Select one") {
      this.setState({
        error:
          "Can't pick " +
          event.target.city.value +
          " as your city. If you don't wish to pick a city, Please select the 'None' option."
      });
      return;
    }

    if (
      event.target.gender.value !== "Male" &&
      event.target.gender.value !== "Female" &&
      event.target.gender.value !== "Apache"
    ) {
      this.setState({
        error: "You didn't pick a valid gender. Please try again."
      });
    }

    const person = {
      FirstName: event.target.firstName.value,
      LastName: event.target.lastName.value,
      Age: event.target.age.value,
      Email: event.target.email.value,
      Gender: event.target.gender.value,
      City: null,
      PhoneNumber: event.target.phoneNumber.value
    };
    const cityId =
      event.target.city.value === "None" ? null : event.target.city.value;

    this.props.onCreated(person, cityId);

    setTimeout(this.setState({ redirect: true }), 200);
  };

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/identity/people" />;
    }
    if (!this.props.isLoading) {
      const options = this.props.cities.map((city, index) => (
        <option key={index} value={city.id}>
          {city.name}
        </option>
      ));
      return (
        <React.Fragment>
          <Title Title="Create new person" />
          <button
            className="btn btn-primary btn-sm mb-3"
            onClick={() => this.props.history.goBack()}>
            Return
          </button>

          {this.state.error === "" ? null : (
            <div className="font-weight-bold text-danger text-center">
              {this.state.error}
            </div>
          )}

          <form
            className="form col-6 shadow box-shadow border mb-3 AlignCenter"
            onSubmit={this.handleSubmit}>
            <h3>Create person</h3>
            <hr />
            <div className="float-left clearfix">
              <p>Required fields are marked with *</p>
              <div className="form-group col-4">
                <label className="col-form-label">Firstname*</label>
                <input
                  className="form-inline"
                  type="text"
                  name="firstName"
                  placeholder="Firstname"
                  required
                />
              </div>

              <div className="form-group col-4">
                <label className="col-form-label">Lastname*</label>
                <input
                  className="form-inline"
                  type="text"
                  name="lastName"
                  placeholder="Lastname"
                  required
                />
              </div>

              <div className="form-group col-4">
                <label className="col-form-label">Age*</label>
                <input
                  className="form-inline"
                  type="number"
                  name="age"
                  min="12"
                  max="110"
                  step="1"
                  placeholder="Age"
                  required
                />
              </div>

              <div className="form-group col-5">
                <label className="col-form-label">E-mail*</label>
                <input
                  className="form-inline"
                  name="email"
                  type="email"
                  placeholder="example@example.com"
                />
              </div>
            </div>

            <div className="float-right">
              <div className="form-group">
                <label className="col-form-label">Gender*</label>
                <select name="gender" className="form-inline">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Apache">Apache</option>
                </select>
              </div>

              <div className="form-group">
                <label className="col-form-label">Phonenumber*</label>
                <input
                  className="form-inline"
                  name="phoneNumber"
                  type="text"
                  maxLength="12"
                  placeholder="Phonenumber"
                />
              </div>

              <div className="form-group">
                <label className="col-form-label">Available Cities</label>
                <select
                  value={this.state.cityId}
                  onChange={this.handleChange}
                  className="form-inline"
                  name="city">
                  <option value="Select one">Select one</option>
                  <option value={null}>None</option>
                  {options}
                </select>
              </div>
            </div>
            <div className="form-group clearFloats">
              <input
                type="submit"
                value="Submit"
                className="btn btn-success btn-sm"
              />
            </div>
          </form>
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
    cities: state.person.allCities,
    status: state.person.status,
    isLoading: state.options.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCreated: (person, cityId) =>
      dispatch(actionTypes.CreatePersonAsync(person, cityId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Create));
