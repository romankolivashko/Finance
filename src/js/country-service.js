export default class CountryService {
  static async getCountries(sortParam) {
    let params = "";
    if(sortParam) {
      params += `?sortedBy=${sortParam}`;
    }
    console.log(params);
    try {
      const response = await fetch(
        `http://www.localhost:5000/api/countries${params}`
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
  static async loadPitchers() {
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

