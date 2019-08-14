import React from "react";
import Title from "./Title";

const NoMatch = props => {
  return (
    <React.Fragment>
      <Title Title="404 Error" />
      <div>
        The requested page could not be found. please check your URL or contact
        administration if this problem persists.
      </div>
    </React.Fragment>
  );
};

export default NoMatch;
