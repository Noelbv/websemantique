import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "react-router-dom";
import history from './misc/history';
import "./index.css";
import App from "./App";
import AppProvider from "./AppProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AppProvider>
      <Router history={history}>
        <App />
      </Router>
    </AppProvider>
  </React.StrictMode>
);
