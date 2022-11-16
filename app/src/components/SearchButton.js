import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../context";
import ApiService from '../AppService';

const SearchButton = () => {

  const context = useContext(AppContext);
  const navigate = useNavigate();
  const [response, setResponse] = useState({apiResponse: "Rechercher"});

  const handleClick = () => {
  //   // navigate(`/search/key=${context.recherche}`);
  console.log(ApiService.getSearchFilm(context.recherche));
  //       .then(res => res.text())
  //       .then(res => setResponse({ apiResponse: res }));

  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="rounded-tr-lg rounded-br-lg h-12 text-white bg-rose-900 flex place-items-center pl-4 pr-4 font-poppins"
    >
      {response.apiResponse}
    </button>
  );
}

export default SearchButton;
