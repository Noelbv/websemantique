import React from "react";
import HarryPotterImage from "../misc/images/HP5.jpg";
import { useNavigate } from "react-router-dom";

const FilmBox = (props) => {
  
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/film/${props.title}`);
  }
  
  return (
    <div onClick={handleClick}  className="inline-block px-3">
      <div className="group/edit relative w-64 h-64 max-w-xs overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <img
        src={HarryPotterImage}
        alt="film"
        className="absolute rounded-lg "
      />
      <div className="group-hover/edit:h-full transition-h duration-100 ease-in-out absolute opacity-80 bottom-0 bg-black w-full h-16"></div>
      <div className="flex flex-col h-full justify-end px-2">
        <p id="title" className="group-hover/edit:text-2xl transition-text duration-100 ease-in-out font-poppins font-semibold text-md text-white z-30 pl-4 pb-1 ">
          {props.title}
        </p>
        <p id="duration" className="group-hover/edit:text-xl transition-text duration-100 ease-in-out group-hover/edit:pb-16 transition-pb duration-100 ease-in-out font-poppins text-sm text-white z-20 pl-4 pb-1">
          {props.duration}
        </p>
      </div>
    </div>
    </div>
  );
};

export default FilmBox;
