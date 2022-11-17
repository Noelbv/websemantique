import React from 'react';
import SearchInput from './SearchInput';
import SearchButton from './SearchButton';
const NavBar = (props) => {
    return (
        <div className="bg-blacked fixed flex h-24 flex-row items-center w-full z-40">
                <h1 className="text-3xl text-gray-200 font-bold mb-5 mr-16 font-poppins">
                    Netfl'IF
                </h1>
                <SearchInput inputSearch={props.inputSearch}/>   
                <SearchButton />    
        </div>
    );
}

export default NavBar;