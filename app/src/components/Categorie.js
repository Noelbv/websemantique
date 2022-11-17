import React from 'react';
import FilmBox from './FilmBox';
const Categorie = (props) => {

    return (
        <div className="container mx-auto font-poppins rounded-xl text-white h-60 px-8 pt-2">
        <div className="text-lg font-medium pb-2">
          {props.name}
        </div>
        <FilmBox title="Harry Potter" duration="2h30"/>
      </div>
    );
}
 
export default Categorie;