export default class PatientService {
  static async getPatients() {
    try {
      const response = await fetch(
        `http://www.localhost:5000/api/patients`
      );
      if (!response.ok) {
        throw Error(response.status);
      }
      return response.json();
    } catch (error) {
      return error.message;
    }
  }

  static async loadPatients() {
    try {
      const response = await fetch(
        `http://www.localhost:5000/api/patients/load`
      );
      if (!response.ok) {
        throw Error(response.status);
      }
      return response.status;
    } catch (error) {
      return error.message;
    }
  }
}