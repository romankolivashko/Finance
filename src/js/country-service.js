export default class CountryService {

  //region
  static async getCountries(region, sortParam, minGdp, maxGdp) {
    let apiParams = "";
    
    if(region) {
      apiParams += `?region=${region}`;
    }
    
    if(sortParam) {
      apiParams += region ? "&" : "?";
      apiParams += `sortedBy=${sortParam}`;
    }
    if(minGdp) {
      apiParams += region || sortParam ? "&" : "?";
      apiParams += `minGDP=${minGdp}`;
    }
    if(maxGdp) {
      apiParams += region || sortParam || minGdp ? "&" : "?";
      apiParams += `maxGDP=${maxGdp}`;
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

