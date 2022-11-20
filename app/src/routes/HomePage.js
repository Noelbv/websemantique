import React, {useContext} from "react";
import Categorie from "../components/Categorie";
import NavBar from "../components/NavBar";
import AppContext from "../context";
import "../components/Categories.css"

const HomePage = () => {
  const context = useContext(AppContext);
  const ListMeilleursFilms = [
    {
      title: "Harry Potter",
      duration: "2h30"
    },
    {
      title: "Harry Pot-de-Fleur",
      duration: "8h00"
    },
    {
      title: "Harry mange son caca",
      duration: "5min"
    }
  ];
  const ListMeilleuresComedies = [
    {
      title: "Harry Pot-de-Fleur",
      duration: "8h00"
    },
    {
      title: "Harry Pot-de-Fleur",
      duration: "8h00"
    },
    {
      title: "Harry Pot-de-Fleur",
      duration: "8h00"
    },
    {
      title: "Harry Potter",
      duration: "2h30"
    },
    {
      title: "Harry Pot-de-Fleur",
      duration: "8h00"
    },
    {
      title: "Harry mange son caca",
      duration: "5min"
    }
  ];
  const ListMeilleursMatchs = [
    {
      title: "Harry McGuire",
      duration: "8h00"
    }
  ];
  const ListCategories = [
    {
      title: "Les meilleures comédies",
      listFilms: ListMeilleursFilms
    },
    {
      title: "Les meilleurs films",
      listFilms: ListMeilleuresComedies
    },
    {
      title: "Les meilleurs Matchs",
      listFilms: ListMeilleursMatchs
    }
  ];
  return (
    
    <div className="bg-blacked flex flex-col items-stretch h-screen overflow-y-auto hide-scroll-bar ">
      <NavBar />
      <div className="flex flex-col pt-8 mt-24 gap-2">
      {ListCategories.map((item,index) => {
        return <Categorie key={index} name = {item.title} listFilms = {item.listFilms}/>
      })
      }
      <h1 className="text-white"> 
        {context.recherche}
      </h1>

      </div>
    </div>
  );
};

export default HomePage;
