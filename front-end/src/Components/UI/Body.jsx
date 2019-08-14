import React from "react";

const Body = props => {
  return (
    <React.Fragment>
      <div className="innerContainer container border-radius5">
        {props.children}
      </div>
    </React.Fragment>
  );
};

export default Body;
