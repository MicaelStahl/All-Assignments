import React from "react";
import Title from "./Title";

const Loading = () => {
  return (
    <React.Fragment>
      <Title Title="Loading..." isLoading={true} />
    </React.Fragment>
  );
};

export default Loading;
