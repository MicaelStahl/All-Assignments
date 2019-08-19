import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import * as actionTypes from "../../Actions/Assignment 10/actions/cityActions";
import Loading from "../../UI/Loading";
import Title from "../../UI/Title";

const Details = props => {
  if (!props.isLoading) {
    return (
      <React.Fragment>
        <Title Title={"Details of " + props.city.city.name} />

        <button
          onClick={() => props.history.push("/identity/city")}
          className="btn btn-primary btn-sm mb-3">
          Return
        </button>

        <table className="table table-hover table-active table-striped rounded">
          <caption>Details of {props.city.city.name}</caption>
          <thead>
            <tr className="d-table-row">
              <th className="d-table-cell">Name</th>
              <th className="d-table-cell">Population</th>
              <th className="d-table-cell">Country</th>
              <th className="d-table-cell">Options</th>
            </tr>
          </thead>
          <tbody>
            <tr className="d-table-row">
              <td className="d-table-cell">{props.city.city.name}</td>
              <td className="d-table-cell">{props.city.city.population}</td>
              <td className="d-table-cell">
                {props.city.countryName === null
                  ? "Stateless"
                  : props.city.countryName}
              </td>
              <td className="d-table-cell">
                <Link
                  onClick={() => props.onEditLoad(props.city.city.id)}
                  className="btn btn-warning btn-sm"
                  to={"/identity/city/edit/" + props.city.city.id}>
                  Edit
                </Link>
                <Link
                  onClick={() => props.onDeleteLoad(props.city.city.id)}
                  className="btn btn-danger btn-sm"
                  to={"/identity/city/delete/" + props.city.city.id}>
                  Delete
                </Link>
              </td>
            </tr>
          </tbody>
        </table>

        <hr />

        <div className="active container text-center col-8">
          {props.city.people.length > 0 ? (
            <React.Fragment>
              <p>
                <ins>Current citizens living in {props.city.city.name}</ins>
              </p>
              <table className="table table-active table-striped table-hover rounded align-items-center">
                <caption>List of people</caption>
                <thead>
                  <tr className="d-table-row">
                    <th className="d-table-cell">Name</th>
                    <th className="d-table-cell">Age</th>
                    <th className="d-table-cell">Email</th>
                    <th className="d-table-cell">Gender</th>
                    <th className="d-table-cell">Phonenumber</th>
                  </tr>
                </thead>
                <tbody>
                  {props.city.people.map(person => (
                    <tr
                      key={person.id}
                      className=" list-group-horizontal list-unstyled">
                      <td className="d-table-cell">
                        {person.firstName} {person.lastName}
                      </td>
                      <td className="d-table-cell">{person.age}</td>
                      <td className="d-table-cell">{person.email}</td>
                      <td className="d-table-cell">{person.gender}</td>
                      <td className="d-table-cell">{person.phoneNumber}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </React.Fragment>
          ) : (
            <div>No people live here.</div>
          )}
        </div>
      </React.Fragment>
    );
  } else {
    return <Loading />;
  }
};

const mapStateToProps = state => {
  return {
    city: state.city.oneCity,
    isLoading: state.options.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onEditLoad: id => dispatch(actionTypes.EditCityPrepAsync(id)),
    onDeleteLoad: id => dispatch(actionTypes.FindCityAsync(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Details);
