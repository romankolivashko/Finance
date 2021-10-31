export default class CountryService {
  static async getCountries() {
    try {
      const response = await fetch(
        `http://www.localhost:5000/api/countries`
      );
      if (!response.ok) {
        throw Error(response.status);
      }
      return response.json();
    } catch (error) {
      return error.message;
    }
  }

  static async loadCountries() {
    try {
      const response = await fetch(
        `http://www.localhost:5000/api/countries/load`
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

