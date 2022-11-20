import React, { useState, useEffect } from "react";
import ApiService from "../AppService";

import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
// page qui donne les infos d'un film
const SeriesPage = () => {

  const [responseSeries, setResponseSeries] = useState("");
  const [isDataFetched, setIsDataFetched] = useState(false);
  const { idSeries } = useParams();

  useEffect(() => {
    ApiService.getSeries(idSeries)
      .then((res) => {
        console.log(res);
        setResponseSeries(res);
        if(!isDataFetched) {
          setIsDataFetched(true);
        }
      });
  }, []);

  const casting = responseSeries.cast;
  const producers = responseSeries.producer;

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
          style={{ backgroundImage: `url(${responseSeries.img})` }}
        >
          <h1 className="relative z-10 font-bold font-poppins text-6xl">
            {responseSeries.title}
          </h1>
          <div className="absolute bg-black opacity-50 w-full h-full">
          </div>
        </div>
        <div id="contenu" className="pt-12 pl-24 pr-24 pb-24">
          <div className="font-semibold text-xl mt-4 mb-2">Synopsis</div>
          <div className="text-sm max-h-24 overflow-hidden">
            {responseSeries.resume}
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col w-1/3 order-3">
              <h3 className="font-semibold text-xl mt-4 mb-2">Producers</h3>
              <ul className="text-sm">
                {producers.map((name,index) => (<li key={index}>{name}</li>))}
              </ul>
            </div>
            <div className="flex flex-col w-1/3 order-1">
              <h3 className="font-semibold text-xl mt-4 mb-2 ">Cast members</h3>
              <ul className="text-sm">
                {casting.map((name,index) => (<li key={index}>{name}</li>))}
              </ul>
            </div>
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

export default SeriesPage;
