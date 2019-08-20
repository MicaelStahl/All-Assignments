import React from "react";
import { connect } from "react-redux";

import Title from "../../../UI/Title";

const Delete = props => {
  return (
    <React.Fragment>
      <Title Title={"Delete " + props.user.userName + "?"} />
    </React.Fragment>
  );
};

export default Delete;
