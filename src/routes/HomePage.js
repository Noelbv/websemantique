import React, {useContext} from "react";
import Categorie from "../components/Categorie";
import NavBar from "../components/NavBar";
import AppContext from "../context";

const HomePage = () => {
  const context = useContext(AppContext);
  return (
    <div className="bg-blacked flex flex-col items-stretch h-screen overflow-auto">
      <NavBar />
      <div className="flex flex-col mt-24 h-full">
      <Categorie name="Les meilleures comédies" />
      <Categorie name="Les meilleurs westerns" />
      <Categorie name="Les meilleures drames" />

      <div className="container mx-auto font-sans bg-white rounded-xl shadow p-8 m-10">
      <h1 className="text-red"> 
        {context.recherche}
      </h1>
      </div>

      </div>
    </div>
  );
};

export default HomePage;
