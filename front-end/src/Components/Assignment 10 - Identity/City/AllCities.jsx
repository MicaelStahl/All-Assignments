import React, { Component } from "react";
import { Link } from "react-router-dom";

import Title from "../../UI/Title";

class AllCities extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Title Title="List of all cities" />
        <Link to="/identity/city" className="btn btn-primary btn-sm">
          Return
        </Link>
        <div>Hello world!</div>
      </React.Fragment>
    );
  }
}

export default AllCities;
