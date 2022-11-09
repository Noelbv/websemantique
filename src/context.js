import React from "react";

const AppContext = React.createContext({
  test: null,
  setTest: () => null,
});

export default AppContext;
