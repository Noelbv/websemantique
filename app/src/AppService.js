class ApiService {

  static getMovie = async (idMovie) => {
    const response = await fetch(
        `/movie?id=${idMovie}`
        );
    return response.json();
  }

  static getSerie = async (idSerie) => {
    const response = await fetch(
        `/serie?id=${idSerie}`
        );
    return response.json();
  }

  static getActor = async (idActor) => {
    const response = await fetch(
        `/actor?id=${idActor}`
        );
    return response.json();
  }

  static getSearchFilm = async (stringSearch) => {
    const response = await fetch(
        `/search?input=${stringSearch}`
        );
    return response.json();
  }
};

export default ApiService;