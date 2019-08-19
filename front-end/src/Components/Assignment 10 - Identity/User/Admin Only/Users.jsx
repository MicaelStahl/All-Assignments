import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Title from "../../../UI/Title";
import Loading from "../../../UI/Loading";
import * as actionTypes from "../../../Actions/Assignment 10/actions/identityActions";

class Users extends Component {
  state = {};

  componentDidMount() {
    this.props.onSideLoad();
  }

  render() {
    if (!this.props.isLoading) {
      return (
        <React.Fragment>
          <Title Title="List of all users" />
          <button
            onClick={() => this.props.history.goBack()}
            className="btn btn-primary btn-sm mb-3">
            Return
          </button>
          <table className="table table-active table-striped table-hover rounded">
            <caption>List of all users</caption>
            <thead>
              <tr className="d-table-row">
                <th className="d-table-cell">Username</th>
                <th className="d-table-cell">Name</th>
                <th className="d-table-cell">Age</th>
                <th className="d-table-cell">Email</th>
                <th className="d-table-cell">Options</th>
              </tr>
            </thead>
            <tbody>
              {this.props.users.map(user => (
                <tr key={user.userId} className="d-table-row">
                  <td className="d-table-cell">{user.userName}</td>
                  <td className="d-table-cell">
                    {user.firstName + " " + user.lastName}
                  </td>
                  <td className="d-table-cell">{user.age}</td>
                  <td className="d-table-cell">{user.email}</td>
                  <td className="d-table-cell">
                    <Link
                      to={"/users/edit/" + user.userId}
                      className="btn btn-warning btn-sm">
                      Edit
                    </Link>
                    <Link
                      to={"/users/details/" + user.userId}
                      className="btn btn-primary btn-sm ml-1">
                      Details
                    </Link>
                    <Link
                      to={"/users/change-password/" + user.userId}
                      className="btn btn-primary btn-sm ml-1">
                      Change password
                    </Link>
                    <Link
                      to={"/users/delete/" + user.userId}
                      className="btn btn-danger btn-sm ml-1">
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
    users: state.identity.users,
    isLoading: state.options.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSideLoad: () => dispatch(actionTypes.GetUsersAsync()),
    onAdminEditLoad: (userId, users) => dispatch()
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
