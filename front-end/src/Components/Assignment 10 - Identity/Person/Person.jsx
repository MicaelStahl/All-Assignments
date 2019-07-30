import React, { Component } from "react";
// import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

// import * as actionTypes from "../../Actions/Assignment 10/actions/personActions";
import AllPeople from "./AllPeople";

class Person extends Component {
  state = {};

  // async componentWillMount() {
  //   this.props.onGetAllPeople();
  // }

  render() {
    console.log("Do I happen?");
    return (
      <React.Fragment>
        <Switch>
          <Route exact path={this.props.match.url} component={AllPeople} />
        </Switch>
      </React.Fragment>
    );
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     onGetAllPeople: () => dispatch({ type: actionTypes.AllPeopleAsync })
//   };
// };

// connect(  null,  mapDispatchToProps)
export default Person;
