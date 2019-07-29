import React, { Component } from "react";
import { connect } from "react-redux";

import Title from "../UI/Title";
import * as actionTypes from "../Actions/Assignment 10/actions/identityActions";

class IdentityIndex extends Component {
  componentWillMount() {
    this.props.onSiteLoad();
  }
  render() {
    return (
      <div>
        <Title Title="Identity" />
        <div>
          Hello User! this is the main index for Assignment 10. A new
          dropdownlist was created in the navigation-bar. Use that to navigate
          through this assignment.
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSiteLoad: () => dispatch({ type: actionTypes.EnableIdentityNavbarAsync })
  };
};

export default connect(
  null,
  mapDispatchToProps
)(IdentityIndex);
