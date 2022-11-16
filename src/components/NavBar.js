import React from 'react';
import SearchInput from './SearchInput';
import Searchbutton from './Searchbutton';
const NavBar = () => {
    return (
        <div className="bg-blacked fixed flex h-24 flex-row items-center w-full ">
                <h1 className="text-3xl text-gray-200 font-bold mb-5 mr-16 font-poppins">
                    Netfl'IF
                </h1>
                <SearchInput/>   
                <Searchbutton />    
        </div>
    );
}

export default NavBar;