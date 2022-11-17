import React from 'react';

const PreviewFilm = (props) => {
    return ( 
        <div className="container flex flex-row gap-5 h-48 font-poppins">
                <img src={props.image} alt="film" className="rounded-md w-1/5"/>
                <div className="flex flex-col">
                <div className="text-white text-xl font-poppins font-semibold">
                    {props.title}
                </div>
                <div className="text-white text-sm font-poppins font-medium">
                    {props.duration}
                </div>
                <div className="text-sm text-white mt-6 font-light">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </div>
                </div>



        </div>
     );
}
 
export default PreviewFilm;