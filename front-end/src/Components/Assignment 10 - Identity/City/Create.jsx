import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";

import Title from "../../UI/Title";
import Loading from "../../UI/Loading";
import * as actionTypes from "../../Actions/Assignment 10/actions/cityActions";

class Create extends Component {
  state = {
    countryId: "",
    error: "",
    name: "",
    population: "",
    redirect: false
  };

  numberWithSpaces = str => {
    return str.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  handleCityChange = event => {
    this.setState({ countryId: event.target.value, error: "" });
  };

  handleChange = event => {
    const { name, value } = event.target;
    let correctFormat = null;

    if (name === "name") {
      correctFormat = value.match(/^([a-ö ]+\s)*[a-öA-Ö ]+$/g);
    } else if (name === "population") {
      correctFormat = value.match(/(^[0-9 ]+$)/g);
    }

    if (correctFormat === null) {
      if (value.length === 0) {
        this.setState({ [name]: value, error: "" });
      } else {
        this.setState({
          error: "Invalid character entered."
        });
      }
      return;
    }
    this.setState({
      [name]: correctFormat === null ? "" : correctFormat,
      error: ""
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    let population = event.target.population.value;

    if (Number(population) < 10) {
      this.setState({
        error: "The population needs to bestow of at least 10 citizens."
      });
      return;
    }

    // const regex = new RegExp("^[0-9]{1,3}()s?([0-9]{3}s?)+$");
    // const regex = new RegExp("([0-9]{1,3}s?)+");

    // /([0-9]{1,3}\s?)+/g

    // population = population.replace(regex, " ");

    population = this.numberWithSpaces(population);

    // Doing this to replicate the ViewModel existing in the back-end, to reassure
    // The connection between front- and back-end
    const submittedCity = {
      City: {
        Name: event.target.name.value,
        Population: population
      },
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

      this.setState({ redirect: true });
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/identity/cities" />;
    }
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
            onClick={() => this.props.history.goBack()}
            className="btn btn-primary btn-sm mb-3">
            Return
          </button>
          {this.state.error === "" ? null : (
            <p className=" font-weight-bold text-danger">{this.state.error}</p>
          )}
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
                value={this.state.name}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="col-form-label">Population*</label>
              <input
                name="population"
                className="form-inline"
                type="text"
                min="10"
                maxLength="10"
                value={this.state.population}
                onChange={this.handleChange}
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
                className="btn btn-success btn-sm form-inline"
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
    isLoading: state.options.isLoading
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
)(withRouter(Create));
