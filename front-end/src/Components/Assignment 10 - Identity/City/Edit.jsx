import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";

import Loading from "../../UI/Loading";
import Title from "../../UI/Title";
import * as actionTypes from "../../Actions/Assignment 10/actions/cityActions";

class Edit extends Component {
  state = {
    name: null,
    population: null,
    countryId: "",
    error: "",
    redirect: false
  };

  numberWithSpaces = str => {
    return str.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value, error: "" });
  };

  handleCountryChange = event => {
    const { value } = event.target;

    this.setState({ countryId: value, error: "" });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { id, name, countryId } = event.target;
    let population = event.target.population.value;

    if (population.includes(".") || population.includes(",")) {
      population = population.replace(".", "").replace(",", "");
    }

    if (Number(population) < 10) {
      this.setState({
        error: "The city cannot bestow of less than 10 citizens."
      });
      return;
    }

    population = this.numberWithSpaces(population);

    const cityVM = {
      City: {
        Id: id.value,
        Name: name.value,
        Population: population
      },
      CountryId: countryId.value === "None" ? null : countryId.value
    };

    if (cityVM === undefined || cityVM === null) {
      this.setState({
        error:
          "Something went wrong when submitting the changes. Please try again."
      });
    } else {
      this.props.onEditSubmit(cityVM);

      setTimeout(this.setState({ redirect: true }), 200);
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/identity/cities" />;
    }
    if (!this.props.isLoading) {
      const { city } = this.props;
      const userChoice =
        city.countryId !== null ? (
          <option value={city.countryId}>{city.countryName}</option>
        ) : null;

      const options = city.countries.map(country =>
        country.name === city.countryName ? null : (
          <option key={country.id} value={country.id}>
            {country.name}
          </option>
        )
      );

      return (
        <React.Fragment>
          <Title Title={"Editing " + city.city.name} />
          <button
            className="btn btn-primary btn-sm mb-3"
            onClick={() => this.props.history.goBack()}>
            Return
          </button>
          {this.state.error === "" ? null : (
            <p className="font-weight-bold text-danger">{this.state.error}</p>
          )}
          <form onSubmit={this.handleSubmit} className="form">
            <input type="hidden" name="id" value={city.city.id} readOnly />
            <div className="form-group">
              <label className="col-form-label">Name</label>
              <input
                className="form-inline"
                type="text"
                name="name"
                placeholder="Name"
                maxLength="80"
                value={
                  this.state.name === null ? city.city.name : this.state.name
                }
                onChange={this.handleChange}
                required
              />
            </div>
            <div>
              <label className="col-form-label">Population</label>
              <input
                className="form-inline"
                type="number"
                name="population"
                maxLength="9"
                value={
                  this.state.population === null
                    ? city.city.population.replace(" ", "")
                    : this.state.population
                }
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="col-form-label">Country</label>
              <select
                className="form-inline"
                name="countryId"
                value={
                  this.state.countryId === ""
                    ? city.countryId
                    : this.state.countryId
                }
                onChange={this.handleCountryChange}>
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
    city: state.city.oneCity,
    countries: state.city.cities,
    isLoading: state.options.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onEditSubmit: city => dispatch(actionTypes.EditCityAsync(city))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Edit));
