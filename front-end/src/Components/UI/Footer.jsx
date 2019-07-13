import React from "react";

var date = new Date();

var year = date.getFullYear();

const Footer = () => {
  return (
    <div className="container">
      <footer
        id="footer"
        className="border-top footer container position-absolute fixed-bottom">
        &copy; - {year} - Micael Ståhl
      </footer>
    </div>
  );
};

export default Footer;
