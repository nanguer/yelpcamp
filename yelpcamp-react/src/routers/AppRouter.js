import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
import Navigation from "../components/Navigation";

const AppRouter = () => {
  return (
    <Router>
      <Navigation />
      <Routes />
    </Router>
  );
};

export default AppRouter;
