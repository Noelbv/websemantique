import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { useParams } from "react-router-dom";
import PreviewFilm from "../components/PreviewFilm";
import HarryPotterImage1 from "../misc/images/HP1.jpg";
import HarryPotterImage5 from "../misc/images/HP5.jpg";
import ApiService from "../AppService";
// page qui présente les résultats d'une recherche
const SearchPage = () => {
  const [responseFilms, setResponseFilms] = useState("");
  const [isDataFetched, setIsDataFetched] = useState(false);
  const { input } = useParams();

  useEffect(() => {
    ApiService.getSearchFilm(input)
    .then((res) => {
      console.log(res);
      setResponseFilms(res);
      if(!isDataFetched) {
        setIsDataFetched(true);
      }

    });
  }, [input]);

  return (
    <div className="bg-blacked flex flex-col items-stretch h-screen overflow-y-auto">
      <NavBar inputSearch={input} />
      <div className="container mx-auto flex flex-col mt-32 gap-5">
        {isDataFetched ? (
          <>
            <div className="font-poppins text-white font-medium text-xl">
              Meilleurs Résultats - TOP 1 : {responseFilms.films[0].name}
            </div>
            <div className="container flex flex-col gap-5">
              <PreviewFilm
                image={HarryPotterImage1}
                title="Harry Potter"
                duration="2h30"
              />
              <PreviewFilm
                image={HarryPotterImage5}
                title="Star Wars"
                duration="1h58"
              />
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
