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

  render() {
    if (!this.props.isLoading) {
      return (
        <React.Fragment>
          <Title Title="List of all countries" />
          <Link
            to={"/identity/country/create-new-country"}
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
                <tr key={country.country.id}>
                  <td>{country.country.name}</td>
                  <td>{country.country.population}</td>
                  <td>
                    <Link
                      onClick={() =>
                        this.props.onGetOneCountryLoad(
                          country.country.id,
                          this.props.countries
                        )
                      }
                      className="btn btn-warning btn-sm"
                      to={"/identity/country/edit/" + country.country.id}>
                      Edit
                    </Link>
                    <Link
                      onClick={() =>
                        this.props.onGetOneCountryLoad(
                          country.country.id,
                          this.props.countries
                        )
                      }
                      className="btn btn-primary btn-sm ml-1"
                      to={"/identity/country/details/" + country.country.id}>
                      Details
                    </Link>
                    <Link
                      onClick={() =>
                        this.props.onGetOneCountryLoad(
                          country.country.id,
                          this.props.countries
                        )
                      }
                      className="btn btn-danger btn-sm ml-1"
                      to={"/identity/country/delete/" + country.country.id}>
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
    onGetOneCountryLoad: (id, countries) =>
      dispatch(actionTypes.FindCountryAsync(id, countries)),
    onEditLoad: (id, countries) =>
      dispatch(actionTypes.FindCountryAsync(id, countries))
    // onDeleteLoad: id => dispatch(actionTypes.FindCountryAsync(id))
    // ToDo
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllCountries);
