import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Title from "../../UI/Title";
import * as actionTypes from "../../Actions/Assignment 10/actions/countryActions";
import Loading from "../../UI/Loading";

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      population: null,
      error: "",
      redirect: false
    };
  }

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
    this.setState({ [name]: value, error: "" });
  };

  handleSubmit = event => {
    event.preventDefault();

    const id = event.target.id.value;
    const name = event.target.name.value;
    let population = event.target.population.value;
    let nameFormat = null;
    let populationFormat = null;

    if (name.endsWith(" ")) {
      this.setState({ error: "Name cannot end with a space." });
      return;
    } else if (population.endsWith(" ")) {
      this.setState({ error: "Population cannot end with a space." });
      return;
    }

    nameFormat = name.match(/^([a-ö ]+\s)*[a-öA-Ö ]+$/g);

    populationFormat = population.match(/(^[0-9 ]+$)/g);

    if (nameFormat === null || populationFormat === null) {
      this.setState({
        error: "The given values are not valid. Please try something else."
      });
      return;
    }

    if (Number(population) < 10) {
      this.setState({
        error: "The population cannot bestow of less than 10 citizens."
      });
    } else if (name.length > 80 || name.length < 2) {
      this.setState({
        error: "The name cannot exceed 80 characters nor be less than 2."
      });
    } else if (name === "less than two") {
      this.setState({ error: "Haha, you're so funny." });
    } else if (population.length > 10) {
      this.setState({
        error: "The population cannot exceed 10 characterlength."
      });
    } else {
      population = this.numberWithSpaces(population);

      const country = {
        Id: id,
        Name: name,
        Population: population
      };

      if (country === undefined || null) {
        this.setState({
          error:
            "Something went wrong. Please check the written values and try again."
        });
        return;
      }

      this.props.onEditSubmit(country);

      this.setState({ redirect: true });
    }
  };

  handleReturn = () => {
    this.setState({ redirect: true });
  };

  render() {
    const { name, population, redirect, error } = this.state;

    if (redirect) {
      return <Redirect push to="/identity/country" />;
    }

    if (!this.props.isLoading) {
      const { country } = this.props;

      return (
        <React.Fragment>
          <Title Title={"Editing " + country.name} />
          <button
            onClick={() => this.handleReturn()}
            className="btn btn-primary btn-sm mb-3">
            Return
          </button>

          {error === "" ? null : (
            <p className="font-weight-bold text-danger">{error}</p>
          )}

          <form className="form border-dark" onSubmit={this.handleSubmit}>
            <input type="hidden" name="id" value={country.id} />
            <div className="form-group">
              <label className="col-form-label">Name</label>
              <input
                type="text"
                name="name"
                className="form-inline"
                maxLength="80"
                value={name === null ? country.name : name}
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
                min="10"
                maxLength="10"
                value={population === null ? country.population : population}
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
        </React.Fragment>
      );
    } else {
      return <Loading />;
    }
  }
}

const mapStateToProps = state => {
  return {
    country: state.country.oneCountry,
    isLoading: state.options.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onEditSubmit: country => dispatch(actionTypes.EditCountryAsync(country))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Edit);
