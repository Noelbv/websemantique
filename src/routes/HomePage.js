import React from "react";
import TestButton from "../components/TestButton";

const HomePage = () => {
  return (
    <div className="bg-blacked flex items-stretch h-screen">
      <div className="container mx-auto font-sans rounded-xl shadow p-8 m-10">
        
        <h1 className="text-3xl text-gray-200 font-bold mb-5">
          Netfl'IF
        </h1>
        <h3 className="text-gray-200 font-medium text-lg">
          Les meilleurs comédies
        </h3>
        <TestButton />
      </div>
    </div>
  );
};

export default HomePage;
