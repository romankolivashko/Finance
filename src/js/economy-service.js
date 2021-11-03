export default class EconomyService {
  static async getEconomy() {
    try {
      const response = await fetch(
        `http://www.localhost:5000/api/economy`
      );
      if (!response.ok) {
        throw Error(response.status);
      }
      return response.json();
    } catch (error) {
      return error.message;
    }
  }

  static async loadEconomy() {
    try {
      const response = await fetch(
        `http://www.localhost:5000/api/economy/load`
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

