import React, { Component } from "react";
import { Link } from "react-router-dom";

import Title from "../UI/Title";

class IdentityIndex extends Component {
  render() {
    return (
      <div>
        <Title Title="Identity" />
        <div>
          <p>
            Hello User! this is the main index for Assignment 10. A new
            dropdownlist was created in the navigation-bar. Use that to navigate
            through this assignment.
          </p>
          <p>
            Observe that you <ins className="font-weight-bold">can't</ins>
            {"  "}
            actually see the new dropdownlist that should have been created.
            This is intended, and means that you don't have high enough
            authority to view the rest of the data.
          </p>
          <p className="text-center">
            To view the "Person" data, you need the authority level of a normal
            user. <br />
            You can simply Press the "Signin" button and through that create an
            account to see the "Person" data.
          </p>
          <p className="text-center">
            To be able to properly view everything, then sign in as
            administrator. If you however wish to only see some data, then sign
            in as NormalUser.
          </p>
          <div className="col-3 AlignCenter shadow box-shadow border">
            <div className="float-left">
              <h5>Administrator</h5>
              <div className="form-group ">
                <label className="font-weight-bold">Username:</label>
                <p>Administrator</p>
              </div>
              <div className="form-group">
                <label className="font-weight-bold">Password:</label>
                <p>Password!23</p>
              </div>
            </div>
            <div className="float-right">
              <h5>Normal user</h5>
              <div className="form-group">
                <label className="font-weight-bold">Username:</label>
                <p>NormalUser</p>
              </div>
              <div className="form-group">
                <label className="font-weight-bold">Password:</label>
                <p>Password!23</p>
              </div>
            </div>
            <p className="text-center">
              Or <Link to="/register">register</Link> here.
            </p>
          </div>
        </div>
        <p className="mt-3 text-center">
          <b>NOTE:</b> Goes without saying, but all existing data in this
          project is imaginary.
        </p>
      </div>
    );
  }
}

export default IdentityIndex;
