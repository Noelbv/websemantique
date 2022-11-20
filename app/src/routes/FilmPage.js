import React, { useState } from "react";
import Rating from "@mui/material/Rating";

import HarryPotterImage from "../misc/images/HP5.jpg";

import NavBar from "../components/NavBar";
// page qui donne les infos d'un film
const FilmPage = () => {
  // const [linkImage, setLinkImage] = useState("");
  // setLinkImage("https://static01.nyt.com/images/2013/12/27/multimedia/movies-wolf-12272013/movies-wolf-12272013-superJumbo.jpg")
  return (
    <div className="bg-blacked font-poppins flex-col items-stretch h-screen text-gray-200  overflow-y-auto hide-scroll-bar">
      <NavBar />
      <div className="pt-24">
        <div id="header" className="flex flex-row items-center justify-center bg-cover bg-center relative w-100 h-72 bg-white overflow-hidden bg-[url('https://static01.nyt.com/images/2013/12/27/multimedia/movies-wolf-12272013/movies-wolf-12272013-superJumbo.jpg')]">
          <h1 className="relative z-10 font-bold font-poppins text-6xl">
            Le loup de Wall Street
          </h1>
          <div className="absolute bg-black opacity-50 w-full h-full">
          </div>
        </div>
        <div id="contenu" className="pt-12 pl-24 pr-24 pb-24">
          <div className="font-semibold text-xl mt-4 mb-2">Synopsis</div>
          <div className="text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
          </div>
          <div className="font-semibold text-xl mt-4 mb-2">Acteurs</div>
          <h2 className="text-sm mb-2">Emma Watson</h2>
          <h2 className="text-sm mb-2">Daniel Radcliffe</h2>
          <h2 className="text-sm mb-2">Yanice Baody</h2>
          <div className="font-semibold text-xl mt-4 mb-2">Avis</div>
          <Rating name="read-only" value={4.4} precision={0.25} readOnly />
        </div>
      </div>
    </div>
  );
};

export default FilmPage;
