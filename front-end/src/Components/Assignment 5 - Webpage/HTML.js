import React, { Component } from "react";
import { Link } from "react-router-dom";

import cssClasses from "./HTML.css";
import smart from "./smart.jpg";

class HTML extends Component {
  state = {
    cssDisabled: false
  };

  handleToggle = () => {
    this.setState = { cssDisabled: !this.state.cssDisabled };
  };

  render() {
    return (
      <html>
        <head>
          <title>Webpage</title>
          {/* This doesn't work since it gets outclassed by the main layout I use.
        This would however work if I didn't use a already designed layout for this project. */}
        </head>
        <body id="assignment5-main-body">
          <header id="assignment5-header">
            <h1 id="assignment5-nav-heading">Webpage</h1>
            <nav>
              <ul className="assignment5-nav-ul">
                <li className="assignment5-nav-li">
                  <Link className="assignment5-nav-links" to="/">
                    Home
                  </Link>
                </li>
                <li className="assignment5-nav-li">
                  <Link className="assignment5-nav-links" to="/calculator">
                    Calculator
                  </Link>
                </li>
                <li className="assignment5-nav-li">
                  <Link className="assignment5-nav-links" to="/guessing-game">
                    Guessing Game
                  </Link>
                </li>
              </ul>
            </nav>
          </header>
          <div>
            <div id="assignment5-content-body">
              <h2 id="assignment5-body-header">This is a h2 heading</h2>
              <p>
                The main point of this assignment was just to learn how to
                correctly use html and css together. You'll notice that there's
                an error in the developer tools whereas it says something
                similar to " html cannot appear as a child of div." That's
                simply because this page is part of the main React layout, which
                is configured using Routing. so the Route for this page is
                inside of a div element. <br />
                Also using borders around everything so it's easier to see that
                all the requirements were met.
              </p>
              <article id="assignment5-first-article">
                <h5>First article</h5>
                <p>
                  This is the first article element of the two and also the
                  first "paragraph". I'm writing this line right here to fill
                  out the webpage with more text because I'm too lazy to find
                  sample text to copy paste here instead.
                </p>
                <p>
                  This is the second "paragraph" of the first article element.
                  I'm writing this line right here to fill out the webpage with
                  more text because I'm too lazy to find sample text to copy
                  paste here instead.
                </p>
              </article>
              <aside id="assignment5-Aside">
                <h2>Nations</h2>
                <ul>
                  <li>
                    Sweden
                    <ol>
                      <li>Stockholm</li>
                      <li>Gothenburg</li>
                      <li>Malmö</li>
                    </ol>
                  </li>
                  <li>
                    Denmark
                    <ol>
                      <li>Copenhagen</li>
                      <li>Aarhus</li>
                      <li>Odense</li>
                    </ol>
                  </li>
                  <li>
                    Norway
                    <ol>
                      <li>Oslo</li>
                      <li>Bergen</li>
                      <li>Trondheim</li>
                    </ol>
                  </li>
                </ul>
              </aside>
              <article id="assignment5-second-article">
                <h5>Second article</h5>
                <p>
                  This is the second article element of the two and also the
                  first "paragraph". I'm writing this line right here to fill
                  out the webpage with more text because I'm too lazy to find
                  sample text to copy paste here instead.
                </p>
                <p>
                  This is the second "paragraph" of the second article element.
                  I'm writing this line right here to fill out the webpage with
                  more text because I'm too lazy to find sample text to copy
                  paste here instead.
                </p>
                <img id="assignment5-picture" ref="smart.jpg" src={smart} />
              </article>
            </div>
          </div>
          <footer id="assignment5-main-footer">&copy; - Micael Ståhl</footer>
        </body>
      </html>
    );
  }
}

export default HTML;
