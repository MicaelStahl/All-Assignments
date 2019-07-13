import React from "react";

// This "dumb" functions only purpose is to create the title shown on every page
// In my project. This function makes the website look more "alive" however,
// So it's more than worth implementing.
const Title = props => {
  const { Title } = props;

  return (
    <React.Fragment>
      <h1>{Title}</h1>
      <hr />
    </React.Fragment>
  );
};

export default Title;
