import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import * as actionTypes from "../../Actions/Assignment 10/actions/countryActions";
import Title from "../../UI/Title";
import Loading from "../../UI/Loading";

const Delete = props => {
  if (props.isLoading) {
    return <Loading />;
  } else {
    return (
      <React.Fragment>
        <Title Title={"Delete " + props.country.country.name + "?"} />
        <button
          onClick={() => props.history.goBack()}
          className="btn btn-primary btn-sm mb-3 float-left">
          Return
        </button>

        <div className=" text-danger font-weight-bold text-center">
          <Link
            to="/identity/countries"
            onClick={() => props.onDeleteSubmit(props.country.country.id)}
            className="btn btn-danger btn-sm float-right ml-3">
            Delete
          </Link>
          <span className="float-right">
            Are you sure you want to delete {props.country.country.name}?
          </span>
        </div>

        <div className="container row resetRow mt-3">
          <div className="col-5 border shadow h-50">
            <React.Fragment>
              <h3>Details of {props.country.country.name}</h3>
              <hr />
              <table className="table table-active table-striped table-hover rounded shadow border">
                <caption>Details of {props.country.country.name}</caption>
                <thead>
                  <tr className="d-table-row">
                    <th className="d-table-cell">Name</th>
                    <th className="d-table-cell">Population</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="d-table-row">
                    <td className="d-table-cell">
                      {props.country.country.name}
                    </td>
                    <td className="d-table-cell">
                      {props.country.country.population}
                    </td>
                  </tr>
                </tbody>
              </table>
            </React.Fragment>
          </div>
          <div className="float-right offset-1 col-5 shadow border">
            <h3>Cities in {props.country.country.name}</h3>
            <hr />
            {props.country.cities === null ||
            props.country.cities.length === 0 ? (
              <div className="font-weight-bold">
                No registered cities for {props.country.country.name} exists.
              </div>
            ) : (
              <React.Fragment>
                <table className="table table-active table-striped table-hover rounded shadow border">
                  <caption>
                    Existing cities in {props.country.country.name}
                  </caption>
                  <thead>
                    <tr className="d-table-row">
                      <th className="d-table-cell">Name</th>
                      <th className="d-table-cell">Population</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.country.cities.map(city => (
                      <tr className="d-table-row" key={city.id}>
                        <td className="d-table-cell">{city.name}</td>
                        <td className="d-table-cell">{city.population}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </React.Fragment>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
};

const mapStateToProps = state => {
  return {
    country: state.country.oneCountry,
    isLoading: state.options.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDeleteSubmit: id => dispatch(actionTypes.DeleteCountryAsync(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Delete));
