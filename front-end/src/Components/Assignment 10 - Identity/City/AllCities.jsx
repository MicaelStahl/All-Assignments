import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Title from "../../UI/Title";
import * as actionTypes from "../../Actions/Assignment 10/actions/cityActions";
import Loading from "../../UI/Loading";

class AllCities extends Component {
  state = {};

  componentDidMount() {
    this.props.onSiteLoad();
  }

  render() {
    if (!this.props.isLoading) {
      return (
        <React.Fragment>
          <Title Title="List of all cities" />
          <Link to="/identity/city" className="btn btn-primary btn-sm">
            Return
          </Link>
          <table className="table table-active table-striped table-hover rounded">
            <caption>List of all cities</caption>
            <thead>
              <tr className="d-table-row">
                <th className="d-table-cell">Name</th>
                <th className="d-table-cell">Population</th>
                <th className="d-table-cell">Country</th>
                <th className="d-table-cell">Options</th>
              </tr>
            </thead>
            <tbody>
              {this.props.cities.map((city, index) => (
                <tr key={index} className="d-table-row">
                  <td className="d-table-cell">{city.name}</td>
                  <td className="d-table-cell">{city.population}</td>
                  <td className="d-table-cell">{city.countryName}</td>
                  <td className="d-table-cell">
                    <Link
                      className="btn btn-warning btn-sm"
                      to={this.props.match.url + "/edit" + city.id}>
                      Edit
                    </Link>
                    <Link
                      className="btn btn-primary btn-sm ml-1"
                      to={this.props.match.url + "/details" + city.id}>
                      Details
                    </Link>
                    <Link
                      className="btn btn-danger btn-sm ml-1"
                      to={this.props.match.url + "/delete" + city.id}>
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
    cities: state.city.cities,
    isLoading: state.city.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSiteLoad: () => dispatch(actionTypes.AllCitiesAsync())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllCities);
