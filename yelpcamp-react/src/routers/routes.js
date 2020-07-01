import React from "react";
import { Route } from "react-router-dom";
import Detail from "../components/Campgrounds/Details";
import AllCamps from "../components/Campgrounds/AllCamps";

const Routes = () => {
  const routes = [
    { path: "/", name: "Landing", Component: AllCamps },
    { path: "/campgrounds/:id", name: "Detail", Component: Detail },
  ];

  return routes.map(({ path, Component, name }) => (
    <Route key={name} component={Component} path={path} exact></Route>
  ));
};

export default Routes;
