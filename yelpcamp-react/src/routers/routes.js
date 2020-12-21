import React from 'react';
import { Route } from 'react-router-dom';
import SecuredRoute from './SecuredRoute';
import { routes } from './routesArray';

const Routes = () => {
  // const nonModalRoutes = routes.filter(({ modal }) => !modal);

  const routesArray = routes.map(({ path, Component, name, secured }) =>
    secured ? (
      <SecuredRoute
        path={path}
        Component={Component}
        key={name}
        secured={secured}
        exact
      ></SecuredRoute>
    ) : (
      <Route
        key={name}
        component={Component}
        path={path}
        secured={secured}
        exact
      />
    )
  );

  return routesArray;
};

export default Routes;
