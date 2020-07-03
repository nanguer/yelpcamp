import React from "react";
import { Route } from "react-router-dom";
import Detail from "../components/Campgrounds/Details";
import AllCamps from "../components/Campgrounds/AllCamps";
import UserLogin from "../components/login/UserLogin";
import UserRegister from "../components/login/UserRegister";

const Routes = () => {
  const routes = [
    { path: "/", name: "Landing", Component: AllCamps },
    { path: "/campgrounds/:id", name: "Detail", Component: Detail },
    { path: "/register", name: "register", Component: UserRegister },
    { path: "/login", name: "login", Component: UserLogin },
  ];

  return routes.map(({ path, Component, name }) => (
    <Route key={name} component={Component} path={path} exact></Route>
  ));
};

export default Routes;
