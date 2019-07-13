import React from "react";

import Navbar from "./Components/UI/Navbar";
import Main from "./Components/UI/Main";
import Footer from "./Components/UI/Footer";

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <div className="innerContainer container border-radius5">
        <Main />
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default App;
