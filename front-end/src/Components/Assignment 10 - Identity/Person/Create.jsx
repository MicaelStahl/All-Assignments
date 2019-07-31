import React, { Component } from "react";
import { connect } from "react-redux";

import Title from "../../UI/Title";
import * as actionTypes from "../../Actions/Assignment 10/actions/personActions";

class Create extends Component {
  state = { cityId: "" };

  handleChange = event => {
    this.setState({ cityId: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const person = {
      FirstName: event.target.firstName.value,
      LastName: event.target.lastName.value,
      Age: event.target.age.value,
      Email: event.target.email.value,
      Gender: event.target.gender.value,
      City: null,
      PhoneNumber: event.target.phoneNumber.value
    };
    console.log("[Form Submitted]", person);

    this.props.onCreated(person, event.target.city.value);

    // Make this into a redirect to Details instead... how?
    this.props.history.push("/identity/person");
  };

  render() {
    console.log(this.props.cities);
    const options = this.props.cities.map((city, index) => (
      <option key={index} value={city.id}>
        {city.name}
      </option>
    ));
    return (
      <React.Fragment>
        <Title Title="Create new person" />
        <button
          className="btn btn-primary btn-sm mb-2"
          onClick={() => this.props.history.push("/identity/person")}>
          Return
        </button>

        <form className="form col-6" onSubmit={this.handleSubmit}>
          <div className="float-left">
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

          <div className=" float-right">
            <div className="form-group">
              <label className="col-form-label">Gender*</label>
              <select name="gender" className="form-inline">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Apache-helicopter">Apache-helicopter</option>
              </select>
            </div>

            <div className="form-group">
              <label className="col-form-label">Phonenumber</label>
              <input
                className="form-inline"
                name="phoneNumber"
                type="text"
                maxLength="12"
              />
            </div>

            <div className="form-group">
              <label className="col-form-label">Available Cities</label>
              <select
                value={this.state.cityId}
                onChange={this.handleChange}
                className="form-inline"
                name="city">
                {options}
              </select>
            </div>

            <div className="form-group">
              <input
                type="submit"
                value="Submit"
                className="btn btn-success btn-sm"
              />
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    cities: state.person.allCities
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
)(Create);
