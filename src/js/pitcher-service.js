export default class PitcherService {
  static async getPitchers() {
    try {
      const response = await fetch(
        `http://www.localhost:5000/api/pitchers`
      );
      if (!response.ok) {
        throw Error(response.status);
      }
      return response.json();
    } catch (error) {
      return error.message;
    }
  }

  static async loadPitcherss() {
    try {
      const response = await fetch(
        `http://www.localhost:5000/api/pitchers/load`
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