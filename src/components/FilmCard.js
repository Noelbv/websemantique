import React from 'react';
const FilmCard = () => {
    return (
        <div className='flex flex-col  relative justify-end w-60 h-36 bg-cover bg-center bg-[url(https://media-mcetv.ouest-france.fr/wp-content/uploads/2022/11/harry-potter-la-saga-perd-un-autre-membre-emblematique-du-tournage-.jpeg)]'>
            <div className='absolute bottom-0 left-0 bg-blacked opacity-50 w-60 h-36'>
                
            </div>
            <h1 className='relative z-10 font-poppins text-white pb-2 pl-2'>
                    Titre du film
            </h1>
            <h1 className='relative z-10 font-poppins text-white pb-2 pl-2 font-bold'>
                    Durée du film
            </h1>
        </div>
    );
}

export default FilmCard;