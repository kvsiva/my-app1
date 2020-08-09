import React, { Component } from "react";
import "./App.css";

import HospitalApp from "./components/HospitalApp";

import { BrowserRouter as Router, Switch } from "react-router-dom";


function App() {
  return (
    <Router>
        <HospitalApp />
    </Router>
  );
}

export default App;
