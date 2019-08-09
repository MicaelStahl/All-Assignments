import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Title from "../../UI/Title";
import Loading from "../../UI/Loading";
import * as actionTypes from "../../Actions/Assignment 10/actions/cityActions";

class Delete extends Component {
  state = {
    redirect: false
  };

  onDeleteAccept = id => {
    // ToDo
    this.props.onDeleteAccept(id);

    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/identity/city" />;
    }
    if (!this.props.isLoading) {
      return (
        <React.Fragment>
          <Title Title={"Delete " + this.props.city.city.name + "?"} />
          <div className="btn-group-sm">
            <button
              onClick={() => this.props.history.push("/identity/city")}
              className="btn btn-primary btn-sm mb-3 float-left">
              Return
            </button>
            <button
              onClick={() => this.onDeleteAccept(this.props.city.city.id)}
              className="btn btn-danger btn-sm mb-3 float-right">
              Delete
            </button>
          </div>
          <table className="table table-hover table-active table-striped rounded">
            <caption>Details of {this.props.city.city.name}</caption>
            <thead>
              <tr className="d-table-row">
                <th className="d-table-cell">Name</th>
                <th className="d-table-cell">Population</th>
                <th className="d-table-cell">Country</th>
              </tr>
            </thead>
            <tbody>
              <tr className="d-table-row">
                <td className="d-table-cell">{this.props.city.city.name}</td>
                <td className="d-table-cell">
                  {this.props.city.city.population}
                </td>
                <td className="d-table-cell">
                  {this.props.city.countryName === null
                    ? "Stateless"
                    : this.props.city.countryName}
                </td>
              </tr>
            </tbody>
          </table>

          <hr />

          <div className="active container text-center col-8">
            {this.props.city.people.length > 0 ? (
              <React.Fragment>
                <p>
                  <ins>
                    Current citizens living in {this.props.city.city.name}
                  </ins>
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
                    {this.props.city.people.map(person => (
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
  }
}

const mapStateToProps = state => {
  return {
    city: state.city.oneCity,
    isLoading: state.city.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDeleteAccept: id => dispatch(actionTypes.DeleteCityAsync(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Delete);
