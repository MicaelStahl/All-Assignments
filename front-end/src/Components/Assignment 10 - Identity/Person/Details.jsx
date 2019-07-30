import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Title from "../../UI/Title";

class Details extends Component {
  state = {};
  render() {
    const person = this.props.person;
    console.log(this.props.person);
    return (
      <React.Fragment>
        <Title Title={"Details of " + person.person.firstName} />
        <table>
          <thead>
            <tr>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Age</th>
              <th>E-mail</th>
              <th>Gender</th>
              <th>Phonenumber</th>
              <th>City</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{person.person.firstName}</td>
              <td>{person.person.lastName}</td>
              <td>{person.person.age}</td>
              <td>{person.person.email}</td>
              <td>{person.person.gender}</td>
              <td>{person.person.phoneNumber}</td>
              <td>{person.person.cityName}</td>
              <td>
                <Link to={"/identity/person/edit/" + person.person.id}>
                  Edit
                </Link>
                <Link to={"/identity/person/delete/" + person.person.id}>
                  Delete
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    person: state.person.onePerson
  };
};

export default connect(mapStateToProps)(Details);
