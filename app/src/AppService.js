//fichier utilitaire pour les services
// création des requests options
// fonctions get/save/create/delete

// EXEMPLE OPTIONS REQUETE API (headers)
// const getRequestOptionsGoogleAPI = (method = "GET") => ({
//   method,
//   headers: {
//     "Content-Type": "application/json",
//     "X-Requested-With": "fetch",
//   },
// });



class ApiService {

  static getMovie = async (idMovie) => {
    const response = await fetch(
        `/getmovie?id=${idMovie}`
        );
    return response.json();
    // .then(res => res.text())
    // .then(res => setResponse({ apiResponse: res }));

  }

  static getSearchFilm = async (stringSearch) => {
    const response = await fetch(
        `/search?input=${stringSearch}`
        );
    return response.json();
    // .then(res => res.text())
    // .then(res => setResponse({ apiResponse: res }));

  }
};

export default ApiService;