import React, { Component } from "react";

import Title from "../UI/Title";
import "./GuessingGame.css";
import assignmentPicture from "./Assignment 7.png";

class GuessingGame extends Component {
  state = {
    randomNumber: "",
    wrong: "",
    tries: 0,
    correct: ""
  };

  handleSubmit = event => {
    event.preventDefault();

    console.log("Hello");

    const guess = event.target.userGuess.value;

    const random = localStorage.getItem("_random");

    if (guess > random) {
      console.log("Your guess was too big!");
      this.setState({
        wrong: "Your guess was too big, please try again.",
        correct: "",
        tries: this.state.tries + 1
      });
    } else if (guess < random) {
      console.log("Your guess was too small!");
      this.setState({
        wrong: "Your guess was too small, please try again.",
        correct: "",
        tries: this.state.tries + 1
      });
    } else {
      console.log("You were correct!");
      this.setState({
        wrong: "",
        correct: "Your guess was correct! Congratulations!",
        tries: this.state.tries + 1
      });
    }
    localStorage.setItem("tries", this.state.tries);
  };

  handleReset = () => {
    localStorage.clear();
    this.setState({
      randomNumber: "",
      wrong: "",
      correct: "",
      tries: 0
    });
    this.componentWillMount();
  };

  componentWillMount() {
    if (localStorage.getItem("_random") === null) {
      const min = 1;
      const max = 100;
      const random = Math.round(min + Math.random() * (max - min));

      localStorage.setItem("_random", random);
      this.setState({ randomNumber: random });
    } else {
      this.setState({
        randomNumber: localStorage.getItem("_random"),
        tries:
          localStorage.getItem("tries") === null
            ? 0
            : localStorage.getItem("tries")
      });
    }
  }

  componentDidMount() {
    this.setState({ randomNumber: localStorage.getItem("_random") });
  }

  render() {
    const { wrong, correct, tries } = this.state;
    return (
      <React.Fragment>
        <Title Title={"Guessing game"} />
        {correct === "" ? null : (
          <div className=" font-weight-bold text-success col-12 text-center mb-3">
            {correct}
          </div>
        )}
        {wrong === "" ? null : (
          <div className=" font-weight-bold text-danger col-12 text-center mb-3">
            {wrong}
          </div>
        )}
        <div id="GuessingGameContainer" className="container col-2">
          <div className="text-center">
            <button
              className="btn btn-warning btn-sm border-dark mt-2"
              onClick={this.handleReset}>
              Reset
            </button>
            <div className="h5 border-bottom">Guessing Game!</div>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input
                  name="userGuess"
                  className="mt-3"
                  type="number"
                  min="1"
                  max="100"
                  step="1"
                  readOnly={correct !== "" ? true : false}
                  required
                />
              </div>
              <div className="form-group">
                <button
                  disabled={correct !== "" ? true : false}
                  type="submit"
                  className="btn btn-success btn-sm row">
                  Submit
                </button>
              </div>
            </form>
            <div>Amount of guesses: {tries === 0 ? 0 : tries}</div>
          </div>
        </div>
        <div className="col-6 container mt-5">
          This project was constructed using "localStorage" as a main function
          of this assignment.
          <br />
          localStorage in this aspect refers to the asp.net Core version of
          Session which was the main focus of this assignment, to learn to store
          and use data in a session.
        </div>
        <div className="col-7 container mt-4">
          <img
            className="col-12 mb-2"
            alt="Assignment 7"
            src={assignmentPicture}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default GuessingGame;
