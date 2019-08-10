import React, { Component } from "react";
import Title from "../../UI/Title";

class LoginScreen extends Component {
  state = {
    redirect: false
  };

  render() {
    return (
      <React.Fragment>
        <Title Title="Loginscreen" />
        <div className="text-center mt-5">
          <form className="col-3 border table-bordered">
            <label>Username</label>
            <input type="text" name="userName" className="form-inline" />
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default LoginScreen;
