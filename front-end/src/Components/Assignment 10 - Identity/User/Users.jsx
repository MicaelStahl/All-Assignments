import React, { Component } from "react";
import { connect } from "react-redux";

import Title from "../../UI/Title";
import * as actionTypes from "../../Actions/Assignment 10/actions/identityActions";

class Users extends Component {
  state = {};

  componentDidMount() {
    // ToDo
  }

  render() {
    return (
      <React.Fragment>
        <Title Title="List of all users" />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.identity.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSideLoad: () => dispatch(actionTypes)
  };
};

export default Users;
