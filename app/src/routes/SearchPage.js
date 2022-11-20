import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { useParams } from "react-router-dom";
import PreviewFilm from "../components/PreviewFilm";
import HarryPotterImage1 from "../misc/images/HP1.jpg";
import HarryPotterImage5 from "../misc/images/HP5.jpg";
import ApiService from "../AppService";
// page qui présente les résultats d'une recherche
const SearchPage = () => {
  const [responseSearch, setResponseSearch] = useState("");
  const [isDataFetched, setIsDataFetched] = useState(false);
  const { input } = useParams();

  useEffect(() => {
    ApiService.getSearchFilm(input)
    .then((res) => {
      console.log(res);
      setResponseSearch(res);
      if(!isDataFetched) {
        setIsDataFetched(true);
      }

    });
  }, [input]);

  const films = responseSearch.films;

  return (
    <div className="bg-blacked flex flex-col items-stretch h-screen overflow-y-auto">
      <NavBar inputSearch={input} />
      <div className="container mx-auto flex flex-col mt-32 gap-5">
        {isDataFetched ? (
          <>
            <div className="font-poppins text-white font-medium text-xl">
              Meilleurs Résultats 
            </div>
            <div className="container flex flex-col gap-5">
              {films.map((item) => (
                 <PreviewFilm
                 id={item.id}
                 image={item.image}
                 title={item.name}
                 duration="2h30"
               />
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="font-poppins text-white font-medium text-xl">
              Data Processing
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
