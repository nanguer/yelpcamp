import React from "react";
import { Route } from "react-router-dom";
import { routes } from "./routesArray";
import PropTypes from "prop-types";
import SecuredRoute from "./SecuredRoute";

const ModalRoutes = () => {
  const filteredModalRoutes = routes.filter(({ modal }) => modal);

  const modalRoutesArray = filteredModalRoutes.map(
    ({ Component, path, modal, secured, name, ...props }) =>
      secured ? (
        <SecuredRoute key={name} Component={Component} path={path} {...props} />
      ) : (
        <Route key={name} Component={Component} path={path} {...props}></Route>
      )
  );

  return modalRoutesArray;
};

ModalRoutes.propTypes = {
  Component: PropTypes.symbol,
  path: PropTypes.string,
};

export default ModalRoutes;
