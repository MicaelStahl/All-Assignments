import React, { Component } from "react";
import { connect } from "react-redux";

import Title from "../../UI/Title";
import Loading from "../../UI/Loading";
import * as actionTypes from "../../Actions/Assignment 10/actions/cityActions";

class Create extends Component {
  state = {
    countryId: "",
    error: "",
    population: ""
  };

  handleCityChange = event => {
    this.setState({ countryId: event.target.value });
  };

  handlePopChange = event => {
    const { value } = event.target;

    value.replace(",", ".");

    this.setState({ population: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const city = {
      Name: event.target.name.value,
      Population: event.target.population.value
    };

    if (city === undefined || city === null) {
      this.setState({ error: "Something went wrong. Please try again." });
      return;
    }

    // Doing this to replicate the ViewModel existing in the back-end, to reassure
    // The connection between front- and back-end
    const submittedCity = {
      City: city,
      CountryId:
        event.target.countryId.value === "None"
          ? null
          : event.target.countryId.value
    };

    if (submittedCity === undefined || submittedCity === null) {
      this.setState({ error: "Something went wrong. Please try again." });
    } else {
      console.log("[submittedCity]", submittedCity);

      this.props.onCreateSubmit(submittedCity);

      setTimeout(this.props.history.push("/identity/city"), 200);
    }
  };

  render() {
    if (!this.props.isLoading) {
      const options = this.props.countries.map(country => (
        <option key={country.id} value={country.id}>
          {country.name}
        </option>
      ));

      return (
        <React.Fragment>
          <Title Title="Create new city" />
          <button
            onClick={() => this.props.history.push("/identity/city")}
            className="btn btn-primary btn-sm mb-3">
            Return
          </button>
          <form className="form col-6" onSubmit={this.handleSubmit}>
            <p>Required fields are marked with *</p>
            <div className="form-group">
              <label className="col-form-label">Name*</label>
              <input
                className="form-inline"
                type="text"
                name="name"
                placeholder="Name"
                maxLength="80"
                required
              />
            </div>
            <div className="form-group">
              <label className="col-form-label">Population*</label>
              <input
                name="population"
                className="form-inline"
                type="number"
                value={this.state.population}
                onChange={this.handlePopChange}
                placeholder="Population"
                required
              />
            </div>
            <div className="form-group">
              <label>Country</label>
              <select
                className="form-inline"
                name="countryId"
                value={this.state.countryId}
                onChange={this.handleCityChange}>
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
          </form>
        </React.Fragment>
      );
    } else {
      return <Loading />;
    }
  }
}

const mapStateToProps = state => {
  return {
    countries: state.city.countries,
    isLoading: state.city.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCreateSubmit: city => dispatch(actionTypes.CreateCityAsync(city))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Create);
