import React, { Component } from "react";

import Title from "../UI/Title";
import "./Calculator.css";

class Calculator extends Component {
  state = {
    value: "",
    firstNumber: 0,
    operator: "",
    secondNumber: 0,
    error: null,
    disabled: false
  };

  handleChange = event => {
    console.log("handleChanged called", event.target.value);
    const { name, value } = event.target;

    if (this.state.operator === "" && name === "value") {
      this.setState({
        firstNumber:
          this.state.firstNumber === 0 ? value : this.state.firstNumber + value
      });
    } else if (this.state.operator !== "" && name === "value") {
      this.setState({
        secondNumber:
          this.state.secondNumber === 0
            ? value
            : this.state.secondNumber + value
      });
    } else if (name === "operator") {
      this.setState({ operator: value });
    }
  };

  handleReset = () => {
    console.log("handleReset called");
    this.setState({
      value: "",
      firstNumber: 0,
      operator: "",
      secondNumber: 0,
      error: null,
      disabled: false
    });
  };

  handleSubmit = () => {
    const { firstNumber, operator, secondNumber } = this.state;

    console.log(typeof firstNumber, operator, typeof secondNumber);

    const first = parseFloat(firstNumber);
    const second = parseFloat(secondNumber);

    console.log(typeof first, operator, typeof second);

    let answer = 0;

    if (operator === "+") {
      answer = first + second;
    } else if (operator === "-") {
      answer = first - second;
    } else if (operator === "*") {
      if (first === 0 || second === 0) {
        this.setState({
          error: "Error: Cannot multiply with 0, please try something else.",
          disabled: !this.state.disabled
        });
        return;
      } else {
        answer = first * second;
      }
    } else if (operator === "/") {
      if (first === 0 || second === 0) {
        this.setState({
          error: "Error: Cannot divide by 0. Please try something else.",
          disabled: !this.state.disabled
        });
        return;
      } else {
        answer = first / second;
      }
    }

    console.log(answer);

    this.setState({
      value: 0,
      firstNumber: answer,
      operator: "",
      secondNumber: 0,
      error: null,
      disabled: false
    });
  };

  render() {
    const { value, firstNumber, secondNumber, operator, error } = this.state;
    return (
      <React.Fragment>
        <Title Title={"Calculator"} />
        {error === null ? null : (
          <div className="text-danger text-center font-weight-bold col-12">
            {error}
          </div>
        )}
        <div id="calculatorContainer" className="container col-3 mt-5">
          <h4 className="text-center">Calculator X2000</h4>
          {value === "" ? (
            <input
              id="calculator-value"
              type="text"
              className="mt-2 mr-n1 col-12"
              value={
                firstNumber === 0
                  ? 0
                  : firstNumber +
                    operator +
                    (secondNumber === 0 ? "" : secondNumber)
              }
              readOnly
            />
          ) : (
            <input
              id="calculator-value"
              type="text"
              className="mt-2 mr-n1 col-12"
              value={
                secondNumber === 0 && operator === ""
                  ? firstNumber
                  : firstNumber +
                    operator +
                    (secondNumber === 0 ? "" : secondNumber)
              }
              readOnly
            />
          )}
          <hr />
          <div className="btn-group">
            <button
              onClick={this.handleReset}
              className="btn btn-danger btn-sm">
              Reset
            </button>
          </div>
          <div className="btn-group-vertical mt-4 float-right">
            <button
              onClick={this.handleChange}
              disabled={this.state.disabled}
              value="/"
              name="operator"
              className="rounded btn btn-sm btn-primary col-6 mr-4">
              /
            </button>
            <button
              onClick={this.handleChange}
              disabled={this.state.disabled}
              value="*"
              name="operator"
              className="rounded btn btn-sm btn-primary col-6 mr-4 mt-2">
              *
            </button>
            <button
              onClick={this.handleChange}
              disabled={this.state.disabled}
              value="-"
              name="operator"
              className="rounded btn btn-sm btn-primary col-6 mr-4 mt-2">
              -
            </button>
            <button
              onClick={this.handleChange}
              disabled={this.state.disabled}
              value="+"
              name="operator"
              className="rounded btn btn-sm btn-primary col-6 mr-4 mt-2">
              +
            </button>
            <div className="">
              <button
                onClick={this.handleSubmit}
                disabled={this.state.disabled}
                className="rounded btn btn-sm btn-primary mr-4 mb-5 mt-2">
                Submit
              </button>
            </div>
          </div>
          <div className="btn-group">
            <button
              onClick={this.handleChange}
              disabled={this.state.disabled}
              value="7"
              name="value"
              className="rounded btn btn-primary mt-2">
              7
            </button>
            <button
              onClick={this.handleChange}
              disabled={this.state.disabled}
              value="8"
              name="value"
              className="rounded ml-3 btn btn-primary mt-2">
              8
            </button>
            <button
              onClick={this.handleChange}
              disabled={this.state.disabled}
              value="9"
              name="value"
              className="rounded ml-3 btn btn-primary mt-2">
              9
            </button>
          </div>
          <div className="btn-group">
            <button
              onClick={this.handleChange}
              disabled={this.state.disabled}
              value="4"
              name="value"
              className="rounded btn btn-primary mt-2">
              4
            </button>
            <button
              onClick={this.handleChange}
              disabled={this.state.disabled}
              value="5"
              name="value"
              className="rounded ml-3 btn btn-primary mt-2">
              5
            </button>
            <button
              onClick={this.handleChange}
              disabled={this.state.disabled}
              value="6"
              name="value"
              className="rounded ml-3 btn btn-primary mt-2">
              6
            </button>
          </div>
          <div className="btn-group">
            <button
              onClick={this.handleChange}
              disabled={this.state.disabled}
              value="1"
              name="value"
              className="rounded btn btn-primary mt-2">
              1
            </button>
            <button
              onClick={this.handleChange}
              disabled={this.state.disabled}
              value="2"
              name="value"
              className="rounded ml-3 btn btn-primary mt-2">
              2
            </button>
            <button
              onClick={this.handleChange}
              disabled={this.state.disabled}
              value="3"
              name="value"
              className="rounded ml-3 btn btn-primary mt-2">
              3
            </button>
          </div>
          <div className="btn-group">
            <button
              onClick={this.handleChange}
              disabled={this.state.disabled}
              value="0"
              name="value"
              className="rounded btn btn-primary mb-3 mt-2">
              0
            </button>
            <button
              onClick={this.handleChange}
              disabled={this.state.disabled}
              value="00"
              name="value"
              className="rounded ml-3 btn btn-primary mb-3 btn-sm mt-2">
              00
            </button>
            <button
              onClick={this.handleChange}
              disabled={this.state.disabled}
              value="."
              name="value"
              className="rounded ml-3 btn btn-primary mb-3 mt-2">
              .
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Calculator;
