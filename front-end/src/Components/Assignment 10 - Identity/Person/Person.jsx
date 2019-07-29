import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

import * as actionTypes from "../../Actions/Assignment 10/actions/personActions";

class Person extends Component {
  state = {};

  async componentWillMount() {
    this.props.onGetAllPeople();
  }

  render() {
    return (
      <React.Fragment>
        {this.props.error}
        <div>hello world</div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.person.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetAllPeople: () => dispatch({ type: actionTypes.AllPeopleAsync })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Person);
