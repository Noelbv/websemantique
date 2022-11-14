import React from "react";

const Searchbutton = () => (
  <button
    type="button"
    onClick={() => console.log("test réussi (button)")}
    className="rounded-tr-lg rounded-br-lg h-12 text-white bg-rose-900 flex place-items-center pl-4 pr-4 font-poppins"
  >
    Rechercher
  </button>
);

export default Searchbutton;
