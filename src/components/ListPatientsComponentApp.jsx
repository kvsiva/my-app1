import React, { Component } from "react";
import PatientDataService from "../service/PatientDataService";
class ListPatientsComponentApp extends Component {
  //state = { ...courses };
  constructor(props) {
    super(props);
    this.state = {
      patients: [],
      message: null,
    };
    this.refreshPatients = this.refreshPatients.bind(this);
    this.deletePatientClicked = this.deletePatientClicked.bind(this);
    this.updatePatientClicked = this.updatePatientClicked.bind(this);
    this.addPatientClicked = this.addPatientClicked.bind(this);
  }
  componentDidMount() {
    this.refreshPatients();
  }
  refreshPatients() {
    PatientDataService.retrieveAllPatients("svcs") //HARDCODED
      .then((response) => {
        //console.log(response);
        //this.state.courses = response;
        this.setState({ patients: response.data });
      });
  }

  deletePatientClicked(id) {
    PatientDataService.deletePatient(id).then((response) => {
      this.setState({ message: `Delete of patient ${id} Successful` });
      this.refreshPatients();
    });
  }

  updatePatientClicked(id) {
    console.log("update " + id);
    this.props.history.push(`/patients/${id}`);
  }
  addPatientClicked() {
    this.props.history.push(`/patients/-1`);
  }
  render() {
    return (
      <div className="container">
        <h3>All Patients</h3>
        {this.state.message && (
          <div class="alert alert-success">{this.state.message}</div>
        )}
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.patients.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.id}</td>
                  <td>{patient.name}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => this.updatePatientClicked(patient.id)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => this.deletePatientClicked(patient.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="row">
          <button className="btn btn-success" onClick={this.addPatientClicked}>
            Add
          </button>
        </div>
      </div>
    );
  }
}
export default ListPatientsComponentApp;
