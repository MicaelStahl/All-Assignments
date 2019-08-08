import React from "react";
import { connect } from "react-redux";

import * as actionTypes from "../../Actions/Assignment 10/actions/countryActions";
import Title from "../../UI/Title";
import Loading from "../../UI/Loading";

const Delete = props => {
  if (!props.isLoading) {
    return (
      <React.Fragment>
        <Title Title={"Delete " + props.country.country.name + "?"} />
        <div className="btn-group-sm offset-3 col-6">
          <button
            onClick={() => props.history.push("/identity/country")}
            className="btn btn-primary btn-sm mb-3 float-left">
            Return
          </button>
          <button className="btn btn-danger btn-sm mb-3 float-right">
            Delete {props.country.country.name}
          </button>
        </div>
        <table className="table table-active table-striped table-hover rounded">
          <caption>Details of {props.country.country.name}</caption>
          <thead>
            <tr className="d-table-row">
              <th className="d-table-cell">Name</th>
              <th className="d-table-cell">Population</th>
            </tr>
          </thead>
          <tbody>
            <tr className="d-table-row">
              <td className="d-table-cell">{props.country.country.name}</td>
              <td className="d-table-cell">
                {props.country.country.population}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Add potentially existing cities inside the country here later. */}
      </React.Fragment>
    );
  } else {
    return <Loading />;
  }
};

const mapStateToProps = state => {
  return {
    country: state.country.oneCountry,
    isLoading: state.country.isLoading
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
)(Delete);
