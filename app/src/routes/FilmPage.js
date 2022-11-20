import React, { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import ApiService from "../AppService";
import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";

import NavBar from "../components/NavBar";
//import { response } from "../../../api/app";
// page qui donne les infos d'un film
const FilmPage = () => {

  const [responseFilm, setResponseFilm] = useState("");
  const [isDataFetched, setIsDataFetched] = useState(false);
  const { idFilm } = useParams();

  useEffect(() => {
    ApiService.getMovie(idFilm)
      .then((res) => {
        console.log(res);
        setResponseFilm(res);
        if (!isDataFetched) {
          setIsDataFetched(true);
        }
      });
  }, []);

  const casting = responseFilm.cast_member;
  //const director = responseFilm.director;
  const screenwriter = responseFilm.screenwriter;

  // const [linkImage, setLinkImage] = useState("");
  // setLinkImage("https://static01.nyt.com/images/2013/12/27/multimedia/movies-wolf-12272013/movies-wolf-12272013-superJumbo.jpg")
  return (
    <div className="bg-blacked font-poppins flex-col items-stretch h-screen text-gray-200  overflow-y-auto hide-scroll-bar">
      <NavBar />
      <div className="pt-24">
        {isDataFetched ? (
          <>
            <div
              id="header"
              className="flex flex-row items-center justify-center bg-cover bg-center relative w-100 h-72 bg-white overflow-hidden"
              style={{ backgroundImage: `url(${responseFilm.photo})` }}
            >
              <h1 className="relative z-10 font-bold font-poppins text-6xl">
                {responseFilm.title}
              </h1>
              <div className="absolute bg-black opacity-50 w-full h-full">
              </div>
            </div>
            <div id="contenu" className="pt-12 pl-24 pr-24 pb-24">
              <div className="font-semibold text-xl mt-4 mb-2">Synopsis</div>
              <div className="text-sm max-h-24 overflow-hidden">
                {responseFilm.resume}
              </div>
              <div className="mt-4 flex flex-row text-sm">
                <div className="flex flex-col w-1/3 order-2">
                  <h3 className="font-semibold text-xl mt-4 mb-2">Director</h3>
                  <Link to={`/person/${responseFilm.director[1]}`}>{responseFilm.director[0]}</Link>
                  <h3 className="font-semibold text-xl mt-4 mb-2">Screenwriter</h3>
                  <ul className="text-sm">
                    {screenwriter.map((name,index) => (<li key={index}><Link to={`/person/wd:${name[1]}`}>{name[0]}</Link></li>))}
                  </ul>
                </div>
                <div className="flex flex-col w-1/3 order-3">
                {(responseFilm.part_of_series==="") ? (
                  <h3 className="font-semibold text-xl mt-4 mb-2">Ce film ne fait pas partie d'une série</h3>
                ) : (
                  <>
                    <h3 className="font-semibold text-xl mt-4 mb-2">Ce film fait partie d'une série</h3>
                    <Link className="bg-rose-900 text-center p-2 rounded" to={`/series/wd:${responseFilm.part_of_series[1]}`}>{responseFilm.part_of_series[0]}</Link>
                  </>
                )}
                </div>
                <div className="flex flex-col w-1/3 order-1">
                  <h3 className="font-semibold text-xl mt-4 mb-2 ">Cast members</h3>
                  <ul className="text-sm">
                    {casting.map((name,index) => (<li key={index}><Link to={`/person/wd:${name[1]}`}>{name[0]}</Link></li>))}
                  </ul>
                </div>
              </div>
              <div className="font-semibold text-xl mt-8 mb-2">Avis</div>
              <div className="pt-2 pl-2 pb-1 bg-white rounded">
                <Rating name="read-only" value={parseInt(responseFilm.review.substring(0, 3), 10)} precision={0.25} max={10} readOnly />
              </div>
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

export default FilmPage;
