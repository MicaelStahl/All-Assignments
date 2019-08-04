import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import * as actionTypes from "../../Actions/Assignment 10/actions/personActions";
import Title from "../../UI/Title";

class AllPeople extends Component {
  state = {};

  componentWillMount() {
    this.props.onSiteLoad();
  }

  render() {
    if (!this.props.isLoading) {
      return (
        <React.Fragment>
          <Title Title="List of all people" />
          {this.props.error}
          <Link
            onClick={() => this.props.onCreateLoad()}
            to={this.props.match.url + "/create-person"}
            className="btn btn-primary btn-sm mb-2">
            Create person
          </Link>
          <table className="table table-active table-striped table-hover rounded">
            <caption>List of all people</caption>
            <thead>
              <tr className="d-table-row">
                <th className="d-table-cell">Firstname</th>
                <th className="d-table-cell">Lastname</th>
                <th className="d-table-cell">Age</th>
                <th className="d-table-cell">Email</th>
                <th className="d-table-cell">Gender</th>
                <th className="d-table-cell">Phonenumber</th>
                <th className="d-table-cell">City</th>
                <th className="d-table-cell">Options</th>
              </tr>
            </thead>
            <tbody>
              {this.props.people.map((person, index) => (
                <tr key={index} className="d-table-row">
                  <td className="d-table-cell">{person.person.firstName}</td>
                  <td className="d-table-cell">{person.person.lastName}</td>
                  <td className="d-table-cell">{person.person.age}</td>
                  <td className="d-table-cell">{person.person.email}</td>
                  <td className="d-table-cell">{person.person.gender}</td>
                  <td className="d-table-cell">{person.person.phoneNumber}</td>
                  <td className="d-table-cell">{person.cityName}</td>
                  <td className="d-table-cell">
                    <Link
                      onClick={() => this.props.onEditLoad(person.person.id)}
                      className="btn btn-warning btn-sm"
                      to={this.props.match.url + "/edit/" + person.person.id}>
                      Edit
                    </Link>
                    <Link
                      onClick={() => this.props.onDetailsLoad(person.person.id)}
                      className="btn btn-primary btn-sm ml-1"
                      to={
                        this.props.match.url + "/details/" + person.person.id
                      }>
                      Details
                    </Link>
                    <Link
                      onClick={() => this.props.onDeleteLoad(person.person.id)}
                      className="btn btn-danger btn-sm ml-1"
                      to={this.props.match.url + "/delete/" + person.person.id}>
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
      return <p>Loading...</p>;
    }
  }
}

const mapStateToProps = state => {
  return {
    people: state.person.allPeople,
    error: state.person.personError,
    isLoading: state.person.isLoading,
    status: state.person.status
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSiteLoad: () => dispatch(actionTypes.AllPeopleAsync()),
    onCreateLoad: () => dispatch(actionTypes.AllCitiesAsync()),
    onDetailsLoad: id => dispatch(actionTypes.FindPersonAsync(id)),
    onEditLoad: id => dispatch(actionTypes.FindPersonToEditAsync(id)),
    onDeleteLoad: id => dispatch(actionTypes.FindPersonAsync(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllPeople);
