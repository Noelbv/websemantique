import React from 'react';
import FilmBox from './FilmBox';
const Categorie = (props) => {

    return (
        <div className="container font-sans bg-white rounded-xl shadow h-1/2 p-8 m-10">
        {props.name}
        <FilmBox />
      </div>
    );
}
 
export default Categorie;