import React, { useState } from "react";
import Rating from "@mui/material/Rating";
// page qui donne les infos d'un film
const FilmPage = () => {
  // const [linkImage, setLinkImage] = useState("");
  // setLinkImage("https://static01.nyt.com/images/2013/12/27/multimedia/movies-wolf-12272013/movies-wolf-12272013-superJumbo.jpg")
  return (
    <div className="bg-blacked font-poppins flex-col items-stretch h-screen text-gray-200">
      <h1
        id="banner"
        className={
          "text-movie-title bg-[url('https://static01.nyt.com/images/2013/12/27/multimedia/movies-wolf-12272013/movies-wolf-12272013-superJumbo.jpg')] w-full justify-center p-28 bg-cover bg-center font-bold"
        }
      >
        Le loup de Wall Street
      </h1>
      <div id="plot">Plot</div>
      <div id="actors" className="flex-row"></div>
      <Rating name="read-only" value={4.4} precision={0.25} readOnly />
    </div>
  );
};

export default FilmPage;
