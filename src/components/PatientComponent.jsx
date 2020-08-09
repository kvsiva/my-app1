import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import PatientDataService from "../service/PatientDataService";
const INSTRUCTOR = "svcs";
class PatientComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      name: "",
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  componentDidMount() {
    console.log(this.state.id);
    // eslint-disable-next-line
    if (this.state.id == -1) {
      return;
    }
    PatientDataService.retrievePatient(INSTRUCTOR, this.state.id).then(
      (response) =>
        this.setState({
          name: response.data.name,
        })
    );
  }
  validate(values) {
    let errors = {};
    if (!values.name) {
      errors.name= "Enter a name";
    } else if (values.name.length < 5) {
      errors.name = "Enter atleast 5 Characters in Name";
    }
    return errors;
  }
  onSubmit(values) {
    let username = INSTRUCTOR;
    let patient = {
      id: this.state.id,
      name: values.name,
    };
    if (this.state.id === -1) {
      PatientDataService.createPatient(username, patient).then(() =>
        this.props.history.push("/patients")
      );
    } else {
      PatientDataService.updatePatient(username, this.state.id, patient).then(() =>
        this.props.history.push("/patients")
      );
    }
    console.log(values);
  }
  render() {
    let { name, id } = this.state;
    return (
      <div>
        <h3>New Patient</h3>
        <div className="container">
          <Formik
            initialValues={{ id: "", name: "" }}
            onSubmit={this.onSubmit}
            validateOnChange={false}
            validateOnBlur={false}
            validate={this.validate}
            enableReinitialize={true}
          >
            {(props) => (
              <Form>
                <ErrorMessage
                  name="Name"
                  component="div"
                  className="alert alert-warning"
                />
                <fieldset className="form-group">
                  <label>Id</label>
                  <Field
                    className="form-control"
                    type="text"
                    name="id"
                    disabled
                  />
                </fieldset>
                <fieldset className="form-group">
                  <label>name</label>
                  <Field
                    className="form-control"
                    type="text"
                    name="name"
                  />
                </fieldset>
                <button className="btn btn-success" type="submit">
                  Save
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}
export default PatientComponent;
