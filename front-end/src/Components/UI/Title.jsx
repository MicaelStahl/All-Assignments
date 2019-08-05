import React from "react";

// This "dumb" functions only purpose is to create the title shown on every page
// In my project. This function makes the website look more "alive" however,
// So it's more than worth implementing.
const Title = props => {
  const { Title, isLoading = false } = props;

  return (
    <React.Fragment>
      <h1>
        {Title}
        {isLoading === true ? <i className="fa fa-cog fa-spin" /> : null}
      </h1>

      <hr />
    </React.Fragment>
  );
};

export default Title;
