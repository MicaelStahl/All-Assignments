import React from "react";
import { Link } from "react-router-dom";

import Title from "./Components/UI/Title";

const Home = () => {
  return (
    <React.Fragment>
      <Title Title="Home" />
      <div className=" border-warning container col-8">
        <p className="text-justify">
          Hello user. This project is mainly something I wanted to work on
          during my summer-holiday <br />
          and is all my previous assignments in this course gathered into one
          place.
        </p>
        <ul className="list-unstyled col-12">
          <li className="row mt-1">
            <Link to="/calculator" className="border-bottom float-left">
              Assignment 1: Calculator
            </Link>
          </li>
          <li className="row mt-1">Assignment 2: Golf-game (Not started)</li>
          <li className="row mt-1">
            Assignment 3: Arena fighter (Not started)
          </li>
          <li className="row mt-1">
            Assignment 4: Vending Machine (Not started)
          </li>
          <li className="row mt-1">
            Assignment 5: Front-End 1 - Webpage (Not started)
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
