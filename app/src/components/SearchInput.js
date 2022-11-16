import React,{useContext} from 'react';
import AppContext from '../context';


const SearchInput = () => {
    const context = useContext(AppContext);

    return (
        <> <input onChange={(e) => {context.setRecherche(e.target.value)}} type="text" placeholder="Chercher un film" className="h-12 rounded-tl-lg rounded-bl-lg font-poppins pl-4"/> </>
    );

}
 
export default SearchInput;