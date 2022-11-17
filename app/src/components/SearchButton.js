import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../context";
import ApiService from "../AppService";

const SearchButton = () => {

  const context = useContext(AppContext);
  const navigate = useNavigate();
  
  const [response, setResponse] = useState({ apiResponse: "Rechercher" });

  const handleClick = () => {
    console.log(ApiService.getSearchFilm(context.recherche));
    //       .then(res => res.text())
    //       .then(res => setResponse({ apiResponse: res }));

    // condition à remplir en fonction de la réponse serveur
    if (1) {
      navigate(`/search/${context.recherche}`);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="rounded-tr-lg rounded-br-lg h-12 text-white bg-rose-900 flex place-items-center pl-4 pr-4 font-poppins"
    >
      {response.apiResponse}
    </button>
  );
};

export default SearchButton;
