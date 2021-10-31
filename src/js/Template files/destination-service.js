export default class DestinationService {
  static async getDestinations() {
    try {
      const response = await fetch(
        `http://www.localhost:5000/api/destinations`
      );
      if (!response.ok) {
        throw Error(response.status);
      }
      return response.json();
    } catch (error) {
      return error.message;
    }
  }

  static async postDestination(destinationToPost) {
    // console.log(destinationToPost);
    const jsonDestination = JSON.stringify(destinationToPost);
    // console.log(jsonDestination);
    // JSON.parse(); json > js
    // JSON.stringify(); js > json
    try {
      const response = await fetch(
        `http://www.localhost:5003/api/destinations`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: jsonDestination
        });
      if (!response.ok) {
        throw Error(response.status);
      }
      return response.json();
    } catch (error) {
      return error.message;
    }
  }


}

