import React from "react";
import { Link } from "react-router-dom";

import Title from "./Components/UI/Title";

const Home = () => {
  return (
    <React.Fragment>
      <Title Title="Home" />
      <div className="container col-8 mb-5">
        <p className="text-justify">
          Hello user. This project is mainly something I wanted to work on
          during my summer-holiday <br />
          and is all my previous assignments in this course gathered into one
          place, but this time mostly created with React instead of C#. <br />
          The main reason I wanted to work on this project was mostly to become
          better at React. To learn the limits of React, and one perfect way of
          doing so is to do assignments I've done in the past to learn the React
          way of solving certain issues, like storing data in sessions for
          example.
        </p>
        <hr />
        <ul className="list-unstyled container">
          <li className="row mt-1">
            <Link to="/calculator">Assignment 1: Calculator</Link>
          </li>
          <li className="row mt-1">Assignment 2: Golf-game (Not started)</li>
          <li className="row mt-1">
            Assignment 3: Arena fighter (Not started)
          </li>
          <li className="row mt-1">
            Assignment 4: Vending Machine (Not started)
          </li>
          <li className="row mt-1">
            <Link to="/webpage">
              Assignment 5: Front-End 1 - Webpage (ONLY HTML & CSS)
            </Link>
          </li>
          <li className="row mt-1">
            Assignment 6: Front-End 2 - Sokoban (Not started)
          </li>
          <li className="row mt-1">
            <Link to="/guessing-game">Assignment 7: Guessing-Game</Link>
          </li>
          <li className="row mt-1">
            Assignment 8: ViewModels/PartialViews/AJAX (Not started)
          </li>
          <li className="row mt-1">
            Assignment 9: Entity Framework (Not started)
          </li>
          <li className="row mt-1">Assignment 10: Identity (Not started)</li>
          <li className="row mt-1">Assignment 11: React - SPA (Not started)</li>
          <li className="row mt-1">
            Assignment 12: Final Project (Not started)
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default Home;
