export default class CountryService {

  //region
  static async getCountries(sortParam) {
    let apiParams = "";
    if(sortParam) {
      apiParams += `?sortedBy=${sortParam}`;
    }
    console.log(apiParams);
    try {
      const response = await fetch(
        `http://www.localhost:5000/api/countries${apiParams}`
      );
      if (!response.ok) {
        throw Error(response.status);
      }
      return response.json();
    } catch (error) {
      return error.message;
    }
  }
  static async getCountriesByRegion(regionInput) {
    let apiParams = "";
    
    apiParams += `?region=${regionInput}`;
    
    console.log(apiParams);
    try {
      const response = await fetch(
        `http://www.localhost:5000/api/countries${apiParams}`
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

