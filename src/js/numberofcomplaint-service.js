export default class NumberOfComplaintService {
  static async getNumberOfComplaints() {
    try {
      const response = await fetch(
        `http://www.localhost:5000/api/NumberOfComplaints`
      );
      if (!response.ok) {
        throw Error(response.status);
      }
      return response.json();
    } catch (error) {
      return error.message;
    }
  }

  static async loadNumberOfComplaints() {
    try {
      const response = await fetch(
        `http://www.localhost:5000/api/NumberOfComplaints/load`
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

