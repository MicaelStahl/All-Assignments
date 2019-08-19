import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Loading from "../../UI/Loading";
import Title from "../../UI/Title";
import * as actionTypes from "../../Actions/Assignment 10/actions/countryActions";

class AllCountries extends Component {
  state = {};

  componentDidMount() {
    this.props.onSiteLoad();
  }

  onLinkClicked = id => {
    localStorage.setItem("oneCountryId", id);
    this.props.onGetOneCountryLoad(id);
  };

  render() {
    if (!this.props.isLoading) {
      return (
        <React.Fragment>
          <Title Title="List of all countries" />
          <Link
            to={this.props.match.url + "/create-new-country"}
            className="btn btn-primary btn-sm mb-3">
            Create new country
          </Link>

          <table className="table table-active table-striped table-hover rounded">
            <caption>List of all countries</caption>
            <thead>
              <tr className="d-table-row">
                <th className="d-table-cell">Name</th>
                <th className="d-table-cell">Population</th>
                <th className="d-table-cell">Options</th>
              </tr>
            </thead>
            <tbody>
              {this.props.countries.map(country => (
                <tr key={country.id}>
                  <td>{country.name}</td>
                  <td>{country.population.replace(/[.]/g, " ")}</td>
                  <td>
                    <Link
                      onClick={() => this.props.onEditLoad(country)}
                      className="btn btn-warning btn-sm"
                      to={"/identity/country/edit/" + country.id}>
                      Edit
                    </Link>
                    <Link
                      onClick={() => this.onLinkClicked(country.id)}
                      className="btn btn-primary btn-sm ml-1"
                      to={"/identity/country/details/" + country.id}>
                      Details
                    </Link>
                    <Link
                      onClick={() => this.onLinkClicked(country.id)}
                      className="btn btn-danger btn-sm ml-1"
                      to={"/identity/country/delete/" + country.id}>
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </React.Fragment>
      );
    } else {
      return <Loading />;
    }
  }
}

const mapStateToProps = state => {
  return {
    countries: state.country.countries,
    isLoading: state.options.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSiteLoad: () => dispatch(actionTypes.AllCountriesAsync()),
    onGetOneCountryLoad: id => dispatch(actionTypes.FindCountryAsync(id)),
    onEditLoad: country =>
      dispatch(actionTypes.FindCountryForEditAsync(country))
    // onDeleteLoad: id => dispatch(actionTypes.FindCountryAsync(id))
    // ToDo
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllCountries);
