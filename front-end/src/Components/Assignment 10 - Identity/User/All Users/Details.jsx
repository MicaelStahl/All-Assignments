import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import * as actionUser from "../../../Actions/Assignment 10/actions/userActions";
import * as actionAdmin from "../../../Actions/Assignment 10/actions/adminActions";
import Title from "../../../UI/Title";
import Loading from "../../../UI/Loading";

const Details = props => {
  if (!props.isLoading && props.user !== "") {
    return (
      <React.Fragment>
        <Title Title={"Details of " + props.user.userName} />
        <div className="col-4 border shadow box-shadow AlignCenter">
          <h3>Details</h3>
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
            <label className="font-weight-bold">
              <ins>Options:</ins>
            </label>
            <div>
              {props.roles.includes("Administrator") ? (
                <React.Fragment>
                  <Link
                    onClick={() =>
                      props.onAdminChoice(props.user.userId, props.users)
                    }
                    to={"/users/edit/" + props.user.userId}
                    className="btn btn-info btn-sm">
                    Edit
                  </Link>
                  <Link
                    onClick={() =>
                      props.onAdminChoice(props.user.userId, props.users)
                    }
                    to={"/users/edit-password/" + props.user.userId}
                    className="btn btn-info btn-sm ml-1">
                    Edit-password
                  </Link>
                  <Link
                    onClick={() =>
                      props.onAdminChoice(props.user.userId, props.users)
                    }
                    to={"/users/delete/" + props.user.userId}
                    className="btn btn-info btn-sm ml-1">
                    Delete
                  </Link>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Link
                    onClick={() =>
                      props.onUserChoice(props.user.userId, props.users)
                    }
                    to={"/users/edit/" + props.user.userId}
                    className="btn btn-info btn-sm">
                    Edit
                  </Link>
                  <Link
                    onClick={() =>
                      props.onUserChoice(props.user.userId, props.users)
                    }
                    to={"/users/edit-password/" + props.user.userId}
                    className="btn btn-info btn-sm ml-1">
                    Edit-password
                  </Link>
                  <Link
                    onClick={() =>
                      props.onUserChoice(props.user.userId, props.users)
                    }
                    to={"/users/delete/" + props.user.userId}
                    className="btn btn-info btn-sm ml-1">
                    Delete
                  </Link>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
        <hr />
      </React.Fragment>
    );
  } else {
    return <Loading />;
  }
};

const mapStateToProps = state => {
  return {
    isLoading: state.options.isLoading,
    user: state.identity.user,
    users: state.identity.users,
    roles: state.identity.roles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // Should be the only one needed for users.
    onUserChoice: (userId, users) =>
      dispatch(actionUser.UserDetailsAsync(userId, users)),
    // onEditLoad: (userId, users) => dispatch(),
    // onEditPasswordLoad: (userId, users) => dispatch(),
    // onDeleteLoad: (userId, users) => dispatch(),

    // Should be the only one needed for admin.
    onAdminChoice: (userId, users) =>
      dispatch(actionAdmin.AdminGetUserAsync(userId, users))
    // onAdminEdit: (userId, users) => dispatch(actionAdmin.ADMIN_GET_USER(userId, users)),
    // onAdminDelete: (userId, users) =>
    //   dispatch(actionAdmin.AdminDeleteUserAsync(userId, users))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Details);
