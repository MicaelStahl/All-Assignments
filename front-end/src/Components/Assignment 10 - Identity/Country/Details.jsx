import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import * as actionTypes from "../../Actions/Assignment 10/actions/countryActions";
import Title from "../../UI/Title";
import Loading from "../../UI/Loading";

class Details extends Component {
  state = {
    redirect: false
  };

  // A test I wanted to do to see what the effects would be.
  componentDidMount() {
    let id = localStorage.getItem("oneCountryId");
    console.log(id);
    if (id === undefined || id === null) {
      this.setState({ redirect: true });
    } else {
      this.props.onFindCountryLoad(id);
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/identity/country" />;
    }
    if (!this.props.isLoading) {
      return (
        <React.Fragment>
          <Title Title={"Details of " + this.props.country.country.name} />
          <button
            onClick={() => this.props.history.push("/identity/country")}
            className="btn btn-primary btn-sm mb-3 float-left">
            Return
          </button>

          <div className="container row resetRow mt-3">
            <div className="col-5">
              <React.Fragment>
                <h3 className="border-bottom">
                  Details of {this.props.country.country.name}
                </h3>
                <table className="table table-active table-striped table-hover rounded">
                  <caption>
                    Details of {this.props.country.country.name}
                  </caption>
                  <thead>
                    <tr className="d-table-row">
                      <th className="d-table-cell">Name</th>
                      <th className="d-table-cell">Population</th>
                      <th className="d-table-cell">Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="d-table-row">
                      <td className="d-table-cell">
                        {this.props.country.country.name}
                      </td>
                      <td className="d-table-cell">
                        {this.props.country.country.population}
                      </td>
                      <td className="d-table-cell">
                        <Link
                          className="btn btn-warning btn-sm"
                          to={
                            "/identity/country/edit/" +
                            this.props.country.country.id
                          }>
                          Edit
                        </Link>
                        <Link
                          className="btn btn-danger btn-sm ml-1"
                          to={
                            "/identity/country/delete/" +
                            this.props.country.country.id
                          }>
                          Delete
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </React.Fragment>
            </div>
            <div className="float-right offset-1 col-5">
              <h3 className="border-bottom">
                Cities in {this.props.country.country.name}
              </h3>
              {this.props.country.cities === null ||
              this.props.country.cities.length === 0 ? (
                <div className="font-weight-bold">
                  No registered cities for country exists.
                </div>
              ) : (
                <React.Fragment>
                  <table className="table table-active table-striped table-hover rounded">
                    <caption>
                      Existing cities in {this.props.country.country.name}
                    </caption>
                    <thead>
                      <tr className="d-table-row">
                        <th className="d-table-cell">Name</th>
                        <th className="d-table-cell">Population</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.country.cities.map(city => (
                        <tr className="d-table-row" key={city.id}>
                          <td className="d-table-cell">{city.name}</td>
                          <td className="d-table-cell">{city.population}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </React.Fragment>
              )}
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      return <Loading />;
    }
  }
}

const mapStateToProps = state => {
  return {
    country: state.country.oneCountry,
    isLoading: state.country.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onEditLoad: id => dispatch(actionTypes.FindCountryAsync(id)),
    onDeleteLoad: id => dispatch(actionTypes.FindCountryAsync(id)),
    onFindCountryLoad: id => dispatch(actionTypes.FindCountryAsync(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Details);
