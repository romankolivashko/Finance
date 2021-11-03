export default class ComplaintService {
  static async getComplaints() {
    try {
      const response = await fetch(
        `http://www.localhost:5000/api/Complaints`
      );
      if (!response.ok) {
        throw Error(response.status);
      }
      return response.json();
    } catch (error) {
      return error.message;
    }
  }

  static async loadComplaints() {
    try {
      const response = await fetch(
        `http://www.localhost:5000/api/Complaints/load`
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

