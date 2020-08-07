import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MainRouter from "./MainRouter";

function App() {
  return (
    <Router>
      <MainRouter></MainRouter>
    </Router>
  );
}

export default App;
