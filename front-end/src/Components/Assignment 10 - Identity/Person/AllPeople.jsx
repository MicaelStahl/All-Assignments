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
    console.log(this.props.people);
    const rows = this.props.people.map((person, index) => (
      <tr key={index} className="d-table-row">
        <td className="d-table-cell">{person.firstName}</td>
        <td className="d-table-cell">{person.lastName}</td>
        <td className="d-table-cell">{person.age}</td>
        <td className="d-table-cell">{person.email}</td>
        <td className="d-table-cell">{person.gender}</td>
        <td className="d-table-cell">{person.phoneNumber}</td>
        <td className="d-table-cell">
          {person.city === null ? "Homeless" : person.city}
        </td>
        <td className="d-table-cell">
          <Link to={this.props.match.url + "/edit/:" + person.id}>Edit</Link>
          <Link to={this.props.match.url + "/details/:" + person.id}>
            Details
          </Link>
          <Link to={this.props.match.url + "/delete/:" + person.id}>
            Delete
          </Link>
        </td>
      </tr>
    ));
    console.log(rows);
    return (
      <React.Fragment>
        <Title Title="List of all people" />
        <div>Hello world!</div>
        {this.props.error}
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
          <tbody>{rows}</tbody>
        </table>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    people: state.person.allPeople,
    error: state.person.personError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSiteLoad: () => dispatch(actionTypes.AllPeopleAsync())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllPeople);
