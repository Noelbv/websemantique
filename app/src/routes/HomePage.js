import React, {useContext} from "react";
import Categorie from "../components/Categorie";
import NavBar from "../components/NavBar";
import AppContext from "../context";

const HomePage = () => {
  const context = useContext(AppContext);
  return (
    <div className="bg-blacked flex flex-col items-stretch h-screen overflow-auto">
      <NavBar />
      <div className="flex flex-col mt-24 gap-14">
      <Categorie name="Les meilleures comédies" />
      <Categorie name="Les meilleurs westerns" />
      <Categorie name="Les meilleures drames" />

      <h1 className="text-white"> 
        {context.recherche}
      </h1>

      </div>
    </div>
  );
};

export default HomePage;
