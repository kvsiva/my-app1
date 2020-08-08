import axios from "axios";
const INSTRUCTOR = "svcs";
const COURSE_API_URL = "http://localhost:8090";
const INSTRUCTOR_API_URL = `${COURSE_API_URL}/hospital/${INSTRUCTOR}`;
class PatientDataService {
  retrieveAllPatients(name) {
    console.log("Inside retrieve all patients");
    return axios.get(`${INSTRUCTOR_API_URL}/patients`);
  }

  deletePatient(id) {
    //console.log('executed service')
    return axios.delete(`${INSTRUCTOR_API_URL}/patients/${id}`);
  }

  retrievePatient(name, id) {
    return axios.get(`${INSTRUCTOR_API_URL}/patients/${id}`);
  }
  updatePatient(name, id, patient) {
    return axios.put(`${INSTRUCTOR_API_URL}/patients/${id}`, patient);
  }
  createPatient(name, patient) {
    return axios.post(`${INSTRUCTOR_API_URL}/patients/`, patient);
  }
}
export default new PatientDataService();
