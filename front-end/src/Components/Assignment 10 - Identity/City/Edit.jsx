import React, { Component } from "react";
import { connect } from "react-redux";
import Loading from "../../UI/Loading";
import Title from "../../UI/Title";

class Edit extends Component {
  state = {
    name: "",
    population: "",
    country: "",
    countryId: "",
    error: ""
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleCountryChange = event => {
    const { value } = event.target;

    this.setState({ countryId: value });
  };

  render() {
    if (!this.props.isLoading) {
      const { city } = this.props;
      console.log(city);
      const userChoice =
        city.countryId !== null ? (
          <option value={city.countryName}>{city.countryName}</option>
        ) : null;

      const options = city.countries.map(country =>
        country.name === city.countryName ? null : (
          <option key={country.id} value={country.id}>
            {country.name}
          </option>
        )
      );

      return (
        <React.Fragment>
          <Title Title={"Editing " + city.city.name} />
          <form>
            <div className="form-group">
              <label className="col-form-label">Name</label>
              <input
                className="form-inline"
                type="text"
                name="firstName"
                placeholder="Name"
                maxLength="80"
                value={
                  this.state.name === "" ? city.city.name : this.state.name
                }
                onChange={this.handleChange}
                required
              />
            </div>
            <div>
              <label className="col-form-label">Population</label>
              <input
                className="form-inline"
                type="number"
                name="population"
                min="1"
                maxLength="9"
                value={
                  this.state.population === ""
                    ? city.city.population
                    : this.state.population
                }
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Country</label>
              <select
                className="form-inline"
                name="countryId"
                value={
                  this.state.countryId === ""
                    ? city.countryId
                    : this.state.countryId
                }
                onChange={this.handleCountryChange}>
                {userChoice}
                <option value={null}>None</option>
                {options}
              </select>
            </div>
          </form>
        </React.Fragment>
      );
    } else {
      return <Loading />;
    }
  }
}

const mapStateToProps = state => {
  return {
    city: state.city.oneCity,
    countries: state.city.cities,
    isLoading: state.city.isLoading
  };
};

export default connect(mapStateToProps)(Edit);
