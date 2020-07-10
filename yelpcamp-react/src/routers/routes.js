import React from "react";
import { Route } from "react-router-dom";
import SecuredRoute from "./SecuredRoute";
import { routes } from "./routesArray";

const Routes = () => {
  const nonModalRoutes = routes.filter(({ modal }) => !modal);
  console.log(nonModalRoutes);
  const routesArray = nonModalRoutes.map(
    ({ path, Component, name, modal, secured }) =>
      secured ? (
        <SecuredRoute
          path={path}
          Component={Component}
          key={name}
          secured={secured}
          modal={modal}
          exact
        ></SecuredRoute>
      ) : (
        <Route
          key={name}
          component={Component}
          path={path}
          secured={secured}
          modal={modal}
          exact
        />
      )
  );

  return routesArray;
};

export default Routes;
