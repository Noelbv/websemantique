import React from "react";
import HarryPotterImage from "../misc/images/HP5.jpg";

const FilmBox = (props) => {
  return (
    <div className="relative h-full w-52">
      <img
        src={HarryPotterImage}
        alt="film"
        className="absolute rounded-xl h-full w-full"
      />
      <div className="flex flex-col h-full justify-end px-2">
        <p id="title" className="font-poppins text-white z-20">
          {props.title}
        </p>
        <p id="duration" className="font-poppins text-white z-20">
          {props.duration}
        </p>
      </div>
    </div>
  );
};

export default FilmBox;
