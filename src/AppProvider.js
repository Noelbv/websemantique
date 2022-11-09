import React, { useState, useMemo } from "react";
import AppContext from "./context";

const AppProvider = (props) => {
  const [test, setTest] = useState(null);

  const appContext = useMemo(
    () => ({
      test,
      setTest,
    }),
    [test, setTest]
  );

  return (
    <AppContext.Provider value={appContext}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
