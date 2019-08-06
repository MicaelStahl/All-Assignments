import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Title from "../../UI/Title";
import * as actionTypes from "../../Actions/Assignment 10/actions/cityActions";
import Loading from "../../UI/Loading";

class AllCities extends Component {
  state = {};

  componentWillMount() {
    this.props.onSiteLoad();
  }

  render() {
    if (!this.props.isLoading) {
      return (
        <React.Fragment>
          <Title Title="List of all cities" />
          <Link
            onClick={() => this.props.onCreateLoad()}
            to="/identity/city/create"
            className="btn btn-primary btn-sm mb-3">
            Create new city
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
                  <td className="d-table-cell">{city.city.name}</td>
                  <td className="d-table-cell">{city.city.population}</td>
                  <td className="d-table-cell">{city.countryName}</td>
                  <td className="d-table-cell">
                    <Link
                      onClick={() => this.props.onEditLoad(city.city.id)}
                      className="btn btn-warning btn-sm"
                      to={this.props.match.url + "/edit/" + city.city.id}>
                      Edit
                    </Link>
                    <Link
                      onClick={() => this.props.onDetailsLoad(city.city.id)}
                      className="btn btn-primary btn-sm ml-1"
                      to={this.props.match.url + "/details/" + city.city.id}>
                      Details
                    </Link>
                    <Link
                      onClick={() => this.props.onDeleteLoad(city.city.id)}
                      className="btn btn-danger btn-sm ml-1"
                      to={this.props.match.url + "/delete/" + city.city.id}>
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
    onSiteLoad: () => dispatch(actionTypes.AllCitiesAsync()),
    onCreateLoad: () => dispatch(actionTypes.GetCountriesAsync()),
    onDetailsLoad: id => dispatch(actionTypes.FindCityWithStuffAsync(id)),
    onEditLoad: id => dispatch(actionTypes.EditCityPrepAsync(id)),
    onDeleteLoad: id => dispatch(actionTypes.FindCityWithStuffAsync(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllCities);
