import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import * as actionTypes from "../../Actions/Assignment 10/actions/personActions";
import Title from "../../UI/Title";
import Loading from "../../UI/Loading";

class Delete extends Component {
  state = {
    redirect: false
  };
  onDeleteSubmit = id => {
    this.props.onDeleteAccept(id);

    this.setState({ redirect: true });
  };
  render() {
    if (this.state.redirect) {
      return <Redirect push="/identity/person" />;
    }
    if (!this.props.isLoading) {
      return (
        <React.Fragment>
          <Title
            Title={
              "Delete " +
              this.props.person.person.firstName +
              " " +
              this.props.person.person.lastName +
              "?"
            }
          />

          <button
            onClick={() => this.props.history.push("/identity/person")}
            className="btn btn-primary btn-sm mb-5">
            Return
          </button>

          <div className=" text-danger font-weight-bold col-12 text-center">
            <p className="float-left">
              Are you sure you want to delete{" "}
              {this.props.person.person.firstName +
                " " +
                this.props.person.person.lastName}{" "}
              ?
            </p>
            <Link
              to="/identity/person"
              onClick={() => this.onDeleteSubmit(this.props.person.person.id)}
              className="btn btn-danger btn-sm float-right">
              Delete
            </Link>
          </div>
          <table className="table table-active table-striped table-hover rounded">
            <caption>
              {this.props.person.person.firstName +
                " " +
                this.props.person.person.lastName}
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
              </tr>
            </thead>
            <tbody>
              <tr className="d-table-row">
                <td className="d-table-cell">
                  {this.props.person.person.firstName}
                </td>
                <td className="d-table-cell">
                  {this.props.person.person.lastName}
                </td>
                <td className="d-table-cell">{this.props.person.person.age}</td>
                <td className="d-table-cell">
                  {this.props.person.person.email}
                </td>
                <td className="d-table-cell">
                  {this.props.person.person.gender}
                </td>
                <td className="d-table-cell">
                  {this.props.person.person.phoneNumber}
                </td>
                <td className="d-table-cell">{this.props.person.cityName}</td>
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
    onDeleteAccept: id => dispatch(actionTypes.DeletePersonAsync(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Delete);
