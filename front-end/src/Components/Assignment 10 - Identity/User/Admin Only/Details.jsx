import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import * as actionOptions from "../../../Actions/Assignment 10/actions/optionsActions";
import * as actionTypes from "../../../Actions/Assignment 10/actions/userActions";
import Title from "../../../UI/Title";
import Loading from "../../../UI/Loading";

const Details = props => {
  if (!props.isLoading) {
    return (
      <React.Fragment>
        <Title Title={"Details of " + props.user.userName} />
        <div className="col-4 border shadow box-shadow AlignCenter">
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
          <div className="form-group">
            <label className="font-weight-bold">
              <ins>Options:</ins>
            </label>
            <div>
              <Link
                to={"/users/edit/" + props.user.userId}
                className="btn btn-info btn-sm">
                Edit
              </Link>
              <Link
                to={"/users/edit-password/" + props.user.userId}
                className="btn btn-info btn-sm ml-1">
                Edit-password
              </Link>
              <Link
                to={"/users/delete/" + props.user.userId}
                className="btn btn-info btn-sm ml-1">
                Delete
              </Link>
            </div>
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
    isLoading: state.options.isLoading,
    user: state.user.user,
    users: state.user.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAdminDelete: (userId, users) =>
      dispatch(actionTypes.AdminDeleteUserAsync(userId, users))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Details);
