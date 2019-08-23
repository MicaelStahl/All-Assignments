import React from "react";
import { connect } from "react-redux";

import Title from "../../../UI/Title";
import * as actionAdmin from "../../../Actions/Assignment 10/actions/adminActions";
import * as actionUser from "../../../Actions/Assignment 10/actions/userActions";
import Loading from "../../../UI/Loading";

const Delete = props => {
  if (!props.isLoading) {
    return (
      <React.Fragment>
        <Title Title={"Delete " + props.user.userName + "?"} />
        <div className="col-4 border shadow box-shadow AlignCenter">
          <h3>Delete {props.user.userName}?</h3>
          <hr />
          <div className=" form-group">
            <label className="font-weight-bold">
              <ins>Username:</ins>
            </label>
            <p>{props.user.userName}</p>
          </div>
          <div className="form-group">
            <label className="font-weight-bold">
              <ins>Name:</ins>
            </label>
            <p>{props.user.firstName + " " + props.user.lastName}</p>
          </div>
          <div className="form-group">
            <label className="font-weight-bold">
              <ins>Age:</ins>
            </label>
            <p>{props.user.age}</p>
          </div>
          <div className="form-group">
            <label className="font-weight-bold">
              <ins>Email:</ins>
            </label>
            <p>{props.user.email}</p>
          </div>
          {props.roles.includes("Administrator") ? (
            <div className="form-group">
              <label className="font-weight-bold">
                <ins>Roles:</ins>
              </label>
              <ul className="list-unstyled">
                {props.user.roles.count === 0 ? (
                  <li>
                    <p>No roles available.</p>
                  </li>
                ) : (
                  props.user.roles.map((role, index) => (
                    <li key={index}>{role}</li>
                  ))
                )}
              </ul>
            </div>
          ) : null}
          <div className="form-group">
            <button
              onClick={() => props.onAdminDeleteClick(props.user.userId)}
              className="btn btn-danger btn-sm ">
              Delete
            </button>
            <button
              onClick={() => props.onUserDeleteClick(props.user.userId)}
              className="btn btn-primary btn-sm float-right">
              Return
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  } else {
    return <Loading />;
  }
};

const mapStateToProps = state => {
  return {
    user: state.identity.user,
    isLoading: state.options.isLoading,
    roles: state.identity.roles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAdminDeleteClick: userId =>
      dispatch(actionAdmin.AdminDeleteUserAsync(userId)),
    onUserDeleteClick: userId => dispatch(actionUser.UserDeleteAsync(userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Delete);
