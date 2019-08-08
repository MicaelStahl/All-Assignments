import React, { Component } from "react";
import { connect } from "react-redux";

import Title from "../../UI/Title";
import * as actionTypes from "../../Actions/Assignment 10/actions/countryActions";

class Create extends Component {
  state = {
    error: "",
    name: "",
    population: ""
  };

  // This function retrieves a string and returns a thousand separator handled string.
  // Thousand separator is for example: 1 000, 10 000, 100 000 (in this case, space between every thousand)
  numberWithSpaces = str => {
    return str.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
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

    let name = event.target.name.value;
    let population = event.target.population.value;

    if (name.length > 80 || name.length < 2) {
      this.setState({
        error: "The name has to be between 2 to 80 characters."
      });
      return;
    } else if (population.length > 10) {
      this.setState({
        error: "The population cannot exceed 10 characterlength."
      });
      return;
    } else if (Number(population) < 5) {
      this.setState({
        error: "The population cannot bestow of less than 5 citizens."
      });
      return;
    }

    population = this.numberWithSpaces(population);

    const country = {
      Name: name,
      Population: population
    };

    this.props.onCreateSubmit(country);

    setTimeout(this.props.history.push("/identity/country"), 100);
  };

  render() {
    return (
      <React.Fragment>
        <Title Title="Create new country" />
        <button
          onClick={() => this.props.history.push("/identity/country")}
          className="btn btn-primary btn-sm mb-3">
          Return
        </button>
        {this.state.error === "" ? null : (
          <p className="font-weight-bold text-danger">{this.state.error}</p>
        )}
        <form className="form border-dark" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label className="col-form-label">Name</label>
            <input
              type="text"
              name="name"
              className="form-inline"
              maxLength="80"
              value={this.state.name}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="col-form-label">Population</label>
            <input
              type="text"
              name="population"
              className="form-inline"
              value={this.state.population}
              min="10"
              maxLength="10"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Submit"
              className="btn btn-success btn-sm"
            />
          </div>
        </form>
        <p>
          At a later date, implement a function that will allow you to select
          cities that currently don't exist in a country.
          <br />
          Not a high priority atm however.
        </p>
      </React.Fragment>
    );
  }
}

// // Potential use later when I might make it possible
// // to add cities that aren't in an already existing city.
// const mapStateToProps = state => {
//   return {
//     // ToDo
//   }
// }

const mapDispatchToProps = dispatch => {
  return {
    onCreateSubmit: country => dispatch(actionTypes.CreateCountryAsync(country))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Create);
