import React, { Component } from "react";
import { connect } from "react-redux";

import Title from "../../UI/Title";
import * as actionTypes from "../../Actions/Assignment 10/actions/personActions";

class Edit extends Component {
  state = {
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    gender: "",
    phoneNumber: "",
    city: "",
    cityId: "",
    error: ""
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleCityAndGenderChange = event => {
    if (event.target.name === "city") {
      this.setState({ cityId: event.target.value, error: "" });
    } else if (event.target.name === "gender") {
      this.setState({ gender: event.target.value, error: "" });
    }
  };

  handleSubmit = event => {
    event.preventDefault();

    console.log("[Event]", event.target);

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
      Id: event.target.id.value,
      FirstName: event.target.firstName.value,
      LastName: event.target.lastName.value,
      Age: event.target.age.value,
      Email: event.target.email.value,
      Gender: event.target.gender.value,
      PhoneNumber: event.target.phoneNumber.value
    };

    const personEdit = {
      Person: person,
      CityId: event.target.city.value
    };

    if (person === undefined || person === null) {
      this.setState({
        error:
          "Something went wrong when submitting the data. Please try again."
      });
    } else {
      this.props.onEditAccept(personEdit);

      setTimeout(() => {
        this.props.history.push("/identity/person/details/" + person.Id);
      }, 100);
    }

    // ToDo
  };

  render() {
    if (!this.props.isLoading) {
      const userChoice =
        this.props.person.cityId !== null ? (
          <option value={this.props.person.cityId}>
            {this.props.person.cityName}
          </option>
        ) : null;

      const options = this.props.cities.map((city, index) =>
        city.name === this.props.person.cityName ? null : (
          <option key={index} value={city.id}>
            {city.name}
          </option>
        )
      );
      return (
        <React.Fragment>
          <Title Title={"Editing " + this.props.person.person.firstName} />

          <button
            className="btn btn-primary btn-sm mb-2"
            onClick={() => this.props.history.push("/identity/person")}>
            Return
          </button>

          {this.state.error === "" ? null : (
            <div className="font-weight-bold text-danger text-center">
              {this.state.error}
            </div>
          )}

          <form className="form col-6" onSubmit={this.handleSubmit}>
            <div className="float-left">
              <p>Required fields are marked with *</p>
              <div className="form-group col-4">
                <input
                  type="hidden"
                  name="id"
                  value={this.props.person.person.id}
                />
                <label className="col-form-label">Firstname*</label>
                <input
                  className="form-inline"
                  type="text"
                  name="firstName"
                  value={
                    this.state.firstName === ""
                      ? this.props.person.person.firstName
                      : this.state.firstName
                  }
                  onChange={this.handleChange}
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
                  value={
                    this.state.lastName === ""
                      ? this.props.person.person.lastName
                      : this.state.lastName
                  }
                  onChange={this.handleChange}
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
                  value={
                    this.state.age === ""
                      ? this.props.person.person.age
                      : this.state.age
                  }
                  onChange={this.handleChange}
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
                  value={
                    this.state.email === ""
                      ? this.props.person.person.email
                      : this.state.email
                  }
                  onChange={this.handleChange}
                  placeholder="example@example.com"
                />
              </div>
            </div>

            <div className=" float-right">
              <div className="form-group">
                <label className="col-form-label">Gender*</label>
                <select
                  value={
                    this.state.gender === ""
                      ? this.props.person.person.gender
                      : this.state.gender
                  }
                  onChange={this.handleCityAndGenderChange}
                  name="gender"
                  className="form-inline">
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
                  value={
                    this.state.phoneNumber === ""
                      ? this.props.person.person.phoneNumber
                      : this.state.phoneNumber
                  }
                  onChange={this.handleChange}
                  placeholder="Phonenumber"
                />
              </div>

              <div className="form-group">
                <label className="col-form-label">Available Cities</label>
                <select
                  value={this.state.cityId}
                  onChange={this.handleCityAndGenderChange}
                  className="form-inline"
                  name="city">
                  {userChoice}
                  <option value={null}>None</option>
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
    } else {
      return (
        <React.Fragment>
          <Title Title="Loading..." />
          <p>Loading...</p>
        </React.Fragment>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    person: state.person.onePerson,
    isLoading: state.person.isLoading,
    cities: state.person.allCities
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onEditAccept: person => dispatch(actionTypes.EditPersonAsync(person))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Edit);
