import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Title from "../../UI/Title";
import Loading from "../../UI/Loading";
import * as actionTypes from "../../Actions/Assignment 10/actions/personActions";

class Details extends Component {
  state = {};
  render() {
    const person = this.props.person;
    if (person.length === 0) {
      return <div>Hello world</div>;
    }

    if (!this.props.isLoading) {
      return (
        <React.Fragment>
          <Title
            Title={
              "Details of " +
              person.person.firstName +
              " " +
              person.person.lastName
            }
          />

          <button
            className="btn btn-primary btn-sm mb-2"
            onClick={() => this.props.history.push("/identity/person")}>
            Return
          </button>

          <table className="table table-active table-striped table-hover rounded">
            <caption>
              Details of{" "}
              {person.person.firstName + " " + person.person.lastName}
            </caption>
            <thead>
              <tr className="d-table-row">
                <th className="d-table-cell">Firstname</th>
                <th className="d-table-cell">Lastname</th>
                <th className="d-table-cell">Age</th>
                <th className="d-table-cell">E-mail</th>
                <th className="d-table-cell">Gender</th>
                <th className="d-table-cell">Phonenumber</th>
                <th className="d-table-cell">City</th>
                <th className="d-table-cell">Options</th>
              </tr>
            </thead>
            <tbody>
              <tr className="d-table-row">
                <td className="d-table-cell">{person.person.firstName}</td>
                <td className="d-table-cell">{person.person.lastName}</td>
                <td className="d-table-cell">{person.person.age}</td>
                <td className="d-table-cell">{person.person.email}</td>
                <td className="d-table-cell">{person.person.gender}</td>
                <td className="d-table-cell">{person.person.phoneNumber}</td>
                <td className="d-table-cell">{person.cityName}</td>
                <td className="d-table-cell">
                  <Link
                    className="btn btn-warning btn-sm"
                    to={"/identity/person/edit/" + person.person.id}>
                    Edit
                  </Link>
                  <Link
                    onClick={() => this.props.onDeleteLoad(person.person.id)}
                    className="btn btn-danger btn-sm ml-1"
                    to={"/identity/person/delete/" + person.person.id}>
                    Delete
                  </Link>
                </td>
              </tr>
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
    person: state.person.onePerson,
    isLoading: state.person.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDeleteLoad: id => dispatch(actionTypes.FindPersonAsync(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Details);
