import React, {useContext} from "react";
import Searchbutton from "../components/Searchbutton";
import NavBar from "../components/NavBar";
import AppContext from "../context";

const HomePage = () => {
  const context = useContext(AppContext);
  return (
    <div className="bg-blacked flex flex-col items-stretch h-screen">
      <NavBar />
      <div className="container mx-auto font-sans rounded-xl shadow p-8 m-10">
        
        <h1 className="text-3xl text-gray-200 font-bold mb-5">
          Netfl'IF
        </h1>
        <h3 className="text-gray-200 font-medium text-lg">
          Les meilleurs comédies
        </h3>
        <Searchbutton />
      </div>
      <h1 className="text-white"> 
        {context.recherche}
      </h1>
    </div>
  );
};

export default HomePage;
