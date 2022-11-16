import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../context";
const Searchbutton = () => {

  const context = useContext(AppContext);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/search/key=${context.recherche}`);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="rounded-tr-lg rounded-br-lg h-12 text-white bg-rose-900 flex place-items-center pl-4 pr-4 font-poppins"
    >
      Rechercher
    </button>
  );
}

export default Searchbutton;
