import React, { Component } from "react";
import ListPatientsComponentApp from "./ListPatientsComponentApp";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PatientComponent from "./PatientComponent";

class HospitalApp extends Component {
  render() {
    return (
      <Router>
        <>
          <h1>Hospital Application</h1>
          <Switch>
            <Route path="/" exact component={ListPatientsComponentApp} />
            <Route path="/courses" exact component={ListPatientsComponentApp} />
            <Route path="/courses/:id" component={PatientComponent} />
          </Switch>
        </>
      </Router>
    );
  }
}
export default HospitalApp;
