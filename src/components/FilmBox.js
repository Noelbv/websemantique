import React from 'react'
import HarryPotterImage from '../misc/images/HP5.jpg'
const FilmBox = () => {
    return ( 
        <div className ="relative h-32 w-24">
            <img src={HarryPotterImage} alt="film" className="absolute rounded-xl h-32 w-24"/>
            oui
        </div>
     );
}
 
export default FilmBox;